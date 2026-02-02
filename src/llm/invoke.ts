'use server';

import { SYSTEM_PROMPT } from '@/llm/prompts';
import mammoth from 'mammoth';
import OpenAI from 'openai';
import { PDFParse } from 'pdf-parse';

import { ChatMessage, roleEnum } from '@/types/chat';

import { CHAT_ACCEPTED_FILE_TYPES } from '@/lib/utils';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (file.type === 'application/pdf') {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  throw new Error('Unsupported file type');
}

export async function invokeLlm(
  text: string,
  attachment: File | null,
  messages: ChatMessage[],
): Promise<string> {
  if (attachment) {
    if (attachment.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }
    if (!CHAT_ACCEPTED_FILE_TYPES.includes(attachment.type)) {
      throw new Error('Only PDF and Word documents (.pdf, .docx, .doc) are supported');
    }
  }

  // Extract text from attachment if present
  let finalText = text;
  if (attachment) {
    try {
      const extractedText = await extractTextFromFile(attachment);

      if (!extractedText.trim()) {
        throw new Error('No text could be extracted from the document');
      }

      finalText = text
        ? `${text}\n\n--- Content from ${attachment.name} ---\n${extractedText}`
        : extractedText;
    } catch (error) {
      console.error('File extraction error:', error);
      throw new Error(
        `Failed to process ${attachment.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  const newMessages = [
    { role: roleEnum.Values.system, content: SYSTEM_PROMPT },
    ...messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: roleEnum.Values.user, content: finalText },
  ];

  try {
    const llmResponse = await client.chat.completions.create({
      model: 'openrouter/free',
      messages: newMessages,
    });

    return llmResponse.choices[0].message.content || '';
  } catch (error) {
    console.error('LLM invocation error:', error);
    throw new Error('Failed to get response from AI model');
  }
}
