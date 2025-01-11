import Markdown from 'react-markdown';

import { Notes } from '@/types/database/notes';

import { handleCopy } from '@/lib/utils';

type MarkdownRendererProps = {
  note: Notes;
};

export default function MarkdownRenderer({ note }: MarkdownRendererProps) {
  return (
    <Markdown
      className="prose prose-xl w-full max-w-none text-secondary-foreground dark:prose-invert [&_code]:bg-zinc-900 [&_code]:text-white"
      components={{
        code: ({ children, className }) => {
          const isInline = !className;
          // Remove surrounding backticks from inline code
          const content = isInline ? String(children).replace(/^`|`$/g, '') : children;

          return (
            <code
              onClick={() => {
                handleCopy(String(content), 'code snippet');
              }}
              className={`${
                isInline ? 'inline px-1.5 py-0.5' : 'block p-2'
              } group relative cursor-pointer rounded-md transition-colors hover:bg-zinc-800`}
            >
              {content}
            </code>
          );
        },
      }}
    >
      {note.description}
    </Markdown>
  );
}
