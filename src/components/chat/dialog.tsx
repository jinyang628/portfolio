'use client';

import { useId } from 'react';

import { Button } from '@/components/ui/button';
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

import { ChatAttachment, ChatMessage } from '@/types/chat';

import { CHAT_ACCEPT_ATTR, formatBytes } from '@/lib/utils';

interface ChatDialogProps {
  attachmentMeta: ChatAttachment | null;
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  overlayInputRef: React.RefObject<HTMLTextAreaElement>;
  isOverlayOpen: boolean;
  draft: string;
  canSubmit: boolean;
  onInputChange: (input: string) => void;
  onSubmit: () => void;
  onFileUpload: (file: File | null) => void;
  onOpenChange: (open: boolean) => void;
}

export default function ChatDialog({
  attachmentMeta,
  messages,
  messagesEndRef,
  overlayInputRef,
  isOverlayOpen,
  draft,
  canSubmit,
  onInputChange,
  onSubmit,
  onFileUpload,
  onOpenChange,
}: ChatDialogProps) {
  return (
    <Dialog open={isOverlayOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px]">
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
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit();
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
                id={useId()}
                type="file"
                accept={CHAT_ACCEPT_ATTR}
                className="hidden"
                onChange={(e) => {
                  onFileUpload(e.currentTarget.files?.[0] ?? null);
                  e.currentTarget.value = '';
                }}
              />
              <Button asChild variant="outline" type="button" title="Attach PDF/PNG/JPG">
                <label htmlFor={useId()} className="cursor-pointer">
                  Upload
                </label>
              </Button>
              <Button type="button" onClick={onSubmit} disabled={!canSubmit}>
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
              <Button type="button" variant="ghost" size="sm" onClick={() => onFileUpload(null)}>
                Remove
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
