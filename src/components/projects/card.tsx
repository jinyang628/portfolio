import Link from 'next/link';

import { FaGithub } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

import { Separator } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Projects } from '@/types/database/notes';
import { githubInfoSchema } from '@/types/projects';

type ProjectCardProps = {
  project: Projects;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const githubBtnList = project.githubUrls.map((obj, idx) => {
    const githubInfo = githubInfoSchema.parse(obj);
    return (
      <Link
        key={`${project.title}-github-link-${idx}`}
        href={githubInfo.url || ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm">
          <FaGithub className="mr-2 h-4 w-4" />
          {githubInfo.description}
        </Button>
      </Link>
    );
  });

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="w-full flex flex-col p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
          <ReactMarkdown className="prose dark:prose-invert max-w-none">
            {project.description}
          </ReactMarkdown>
        </div>
        <div className="space-y-4">
          <Separator className="h-[2px] bg-border" />
          <div className="flex justify-center space-x-4">{githubBtnList}</div>

          {project.youtubeUrl && (
            <div className="space-y-4">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYoutubeEmbedUrl(project.youtubeUrl)}
                  title={`${project.title} Demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
