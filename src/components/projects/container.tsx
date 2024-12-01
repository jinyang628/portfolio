import { useEffect, useState } from 'react';

import { get } from '@/actions/database/get';

import ProjectCard from '@/components/projects/card';

import { getRequestSchema } from '@/types/actions/database/get';
import { tableNameEnum } from '@/types/database/base';
import { Projects } from '@/types/database/notes';

type ProjectsContainerProps = {
  showCards: boolean;
};

export default function ProjectsContainer({ showCards }: ProjectsContainerProps) {
  const [projects, setProjects] = useState<Projects[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const getRequest = getRequestSchema.parse({
        tableName: tableNameEnum.Values.projects,
        filterConditions: {},
      });
      const projects = (await get(getRequest)) as Projects[];
      setProjects(projects);
    };

    loadProjects();
  }, []);

  return (
    <div className={`fade ${showCards ? 'opacity-100' : 'opacity-0'} mt-4 text-center`}>
      <div className="border-2 border-gray-200 rounded-lg p-6">
        <p className="text-lg mb-8">Check out some of my projects!</p>
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={`${project.title}-card`} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
