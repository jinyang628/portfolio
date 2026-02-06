'use server';

import { LLM_TIMEOUT, MAX_FILE_SIZE } from '@/constants/llm';
import { SYSTEM_PROMPT } from '@/llm/prompts';
import { promises as fs } from 'fs';
import mammoth from 'mammoth';
import OpenAI from 'openai';
import PDFParser from 'pdf2json';
import { v4 as uuidv4 } from 'uuid';

import { ChatMessage, roleEnum } from '@/types/chat';

import { CHAT_ACCEPTED_FILE_TYPES, formatBytes } from '@/lib/utils';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

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
    const fileName = uuidv4();
    const tempFilePath = `/tmp/${fileName}.pdf`;
    await fs.writeFile(tempFilePath, new Uint8Array(buffer));

    const pdfParser = new (PDFParser as any)(null, 1);

    const parsedText = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: any) => console.log(errData.parserError));
      pdfParser.on('pdfParser_dataReady', () => {
        resolve(pdfParser.getRawTextContent());
      });
      pdfParser.loadPDF(tempFilePath);
    });

    await fs.unlink(tempFilePath).catch(() => {});

    return parsedText;
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
      throw new Error(`File size exceeds ${formatBytes(MAX_FILE_SIZE)} limit`);
    }
    if (!CHAT_ACCEPTED_FILE_TYPES.includes(attachment.type)) {
      throw new Error('Only PDF and Word documents (.pdf, .docx, .doc) are supported');
    }
  }

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
  console.log(newMessages);
  try {
    const llmResponse = await client.chat.completions.create(
      {
        model: 'openrouter/free',
        messages: newMessages,
      },
      {
        timeout: LLM_TIMEOUT,
      },
    );

    return llmResponse.choices[0].message.content || '';
  } catch (error) {
    console.error('LLM invocation error:', error);
    throw new Error('Failed to get response from AI model');
  }
}
