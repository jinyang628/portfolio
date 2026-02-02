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

import { formatBytes } from '@/lib/utils';

type ChatAttachment = {
  name: string;
  type: string;
  size: number;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachment?: ChatAttachment;
  createdAt: number;
};

const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/png', 'image/jpeg'] as const;
const ACCEPT_ATTR = '.pdf,image/png,image/jpeg';

interface ChatContainerProps {
  showChat: boolean;
}

export default function ChatContainer({ showChat }: ChatContainerProps) {
  const fileInputId = useId();
  const overlayFileInputId = useId();

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
    if (!ACCEPTED_FILE_TYPES.includes(file.type as (typeof ACCEPTED_FILE_TYPES)[number])) {
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
      role: 'user',
      content: userText,
      attachment: attachmentMeta ?? undefined,
      createdAt: Date.now(),
    };

    setDraft('');
    setAttachment(null);

    if (!isOverlayOpen) setIsOverlayOpen(true);

    // Placeholder assistant message slot (intentionally empty until you wire an LLM).
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
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
              accept={ACCEPT_ATTR}
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

      <Dialog open={isOverlayOpen} onOpenChange={setIsOverlayOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat</DialogTitle>
            <DialogDescription>Ask follow-ups here, or click outside to close.</DialogDescription>
          </DialogHeader>

          <div className="px-5 py-4">
            {messages.length === 0 ? (
              <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-sm text-muted-foreground">
                Ask your first question to start the chat.
              </div>
            ) : (
              <ScrollArea className="h-[60vh] pr-3">
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl border px-4 py-3 text-sm ${
                          m.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {m.role === 'assistant' && m.content.trim().length === 0 ? (
                          <div className="text-muted-foreground">Response will appear here.</div>
                        ) : m.content.trim().length === 0 ? (
                          <div className="text-muted-foreground">Attachment sent.</div>
                        ) : (
                          <div className="whitespace-pre-wrap">{m.content}</div>
                        )}

                        {m.attachment && (
                          <div className="mt-2 rounded-lg border bg-background/40 px-3 py-2 text-xs">
                            <span className="font-medium">Attachment:</span>{' '}
                            <span className="break-all">
                              {m.attachment.name} ({formatBytes(m.attachment.size)})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            )}
          </div>

          <DialogFooter className="flex-col items-stretch gap-2 border-t px-5 py-4 sm:flex-col">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <Textarea
                  ref={overlayInputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder="Ask a follow-up…"
                  className="min-h-[44px]"
                />
                <div className="mt-1 text-xs text-muted-foreground">
                  Press <span className="font-medium text-foreground">Enter</span> to send,{' '}
                  <span className="font-medium text-foreground">Shift+Enter</span> for a new line.
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Input
                  id={overlayFileInputId}
                  type="file"
                  accept={ACCEPT_ATTR}
                  className="hidden"
                  onChange={(e) => {
                    handlePickFile(e.currentTarget.files?.[0] ?? null);
                    e.currentTarget.value = '';
                  }}
                />
                <Button asChild variant="outline" type="button" title="Attach PDF/PNG/JPG">
                  <label htmlFor={overlayFileInputId} className="cursor-pointer">
                    Upload
                  </label>
                </Button>
                <Button type="button" onClick={submit} disabled={!canSubmit}>
                  Enter
                </Button>
              </div>
            </div>

            {attachmentMeta && (
              <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 text-xs">
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
