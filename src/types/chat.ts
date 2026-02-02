import { z } from 'zod';

export const roleEnum = z.enum(['user', 'assistant', 'system']);

export type Role = z.infer<typeof roleEnum>;

export const chatMessageSchema = z.object({
  id: z.string(),
  role: roleEnum,
  content: z.string(),
  attachment: z
    .object({
      name: z.string(),
      type: z.string(),
      size: z.number(),
    })
    .nullable(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatAttachmentSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
});

export type ChatAttachment = z.infer<typeof chatAttachmentSchema>;
