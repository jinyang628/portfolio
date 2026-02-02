'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

import { ChatAttachment, ChatMessage, roleEnum } from '@/types/chat';

import { CHAT_ACCEPT_ATTR, CHAT_ACCEPTED_FILE_TYPES, formatBytes } from '@/lib/utils';

import ChatDialog from './dialog';




interface ChatContainerProps {
  showChat: boolean;
}



export default function ChatContainer({ showChat }: ChatContainerProps) {
  const fileInputId = useId();
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const overlayInputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const attachmentMeta = useMemo<ChatAttachment | null>(() => {
    if (!attachment) return null;
    return { name: attachment.name, type: attachment.type, size: attachment.size };
  }, [attachment]);

  const canSubmit = useMemo(() => {
    return draft.trim().length > 0 || Boolean(attachmentMeta);
  }, [draft, attachmentMeta]);

  const handlePickFile = (file: File | null) => {
    if (!file) {
      setAttachment(null);
      return;
    }
    if (!CHAT_ACCEPTED_FILE_TYPES.includes(file.type as (typeof CHAT_ACCEPTED_FILE_TYPES)[number])) {
      setAttachment(null);
      return;
    }
    setAttachment(file);
  };

  const submit = () => {
    if (!canSubmit) return;

    const userText = draft.trim();
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: roleEnum.Values.user,
      content: userText,
      attachment: attachmentMeta ?? null,
    };

    setDraft('');
    setAttachment(null);

    if (!isOverlayOpen) setIsOverlayOpen(true);

    // Placeholder assistant message slot (intentionally empty until you wire an LLM).
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: roleEnum.Values.assistant,
      content: '',
      attachment: null,
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  useEffect(() => {
    if (!isOverlayOpen) return;
    overlayInputRef.current?.focus();
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!isOverlayOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOverlayOpen]);

  return (
    <>
      <div
        className={`fade ${showChat ? 'opacity-100' : 'opacity-0'} mx-auto mt-8 w-full max-w-[720px]`}
      >
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="Ask a question…"
                className="h-10"
              />
            </div>

            <Input
              id={fileInputId}
              type="file"
              accept={CHAT_ACCEPT_ATTR}
              className="hidden"
              onChange={(e) => {
                handlePickFile(e.currentTarget.files?.[0] ?? null);
                e.currentTarget.value = '';
              }}
            />
            <Button asChild variant="outline" type="button" title="Attach PDF/PNG/JPG">
              <label htmlFor={fileInputId} className="cursor-pointer">
                Upload
              </label>
            </Button>

            <Button type="button" onClick={submit} disabled={!canSubmit}>
              Enter
            </Button>
          </div>

          {attachmentMeta && (
            <div className="mt-3 flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 text-xs">
              <div className="min-w-0 text-muted-foreground">
                <span className="font-medium text-foreground">Attached:</span>{' '}
                <span className="truncate">
                  {attachmentMeta.name} ({formatBytes(attachmentMeta.size)})
                </span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => setAttachment(null)}>
                Remove
              </Button>
            </div>
          )}
        </Card>
      </div>
      <ChatDialog
        attachmentMeta={attachmentMeta}
        messages={messages}
        messagesEndRef={messagesEndRef}
        overlayInputRef={overlayInputRef}
        isOverlayOpen={isOverlayOpen}
        draft={draft}
        canSubmit={canSubmit}
        onInputChange={setDraft}
        onSubmit={submit}
        onFileUpload={handlePickFile}
        onOpenChange={setIsOverlayOpen}
      />
    </>
  );
}
