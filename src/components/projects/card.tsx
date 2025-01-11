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
      <CardContent className="flex w-full flex-col space-y-4 p-6">
        <div>
          <h3 className="mb-4 text-2xl font-semibold">{project.title}</h3>
          <ReactMarkdown className="prose max-w-none dark:prose-invert">
            {project.description}
          </ReactMarkdown>
        </div>
        <div className="space-y-4">
          <Separator className="h-[2px] bg-border" />
          <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            {githubBtnList}
          </div>
          {project.youtubeUrl && (
            <div className="space-y-4">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
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
