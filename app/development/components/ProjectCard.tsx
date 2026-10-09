import Image from 'next/image';
import type { Project } from '../../data/development';
import ExternalLink from './ExternalLink';
import { secondaryButton } from './buttonStyles';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { name, url, summary, role, details, tags, image } = project;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white/80 shadow-sm">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={1280}
          height={720}
          sizes="(min-width: 896px) 412px, (min-width: 768px) 50vw, 100vw"
          className="aspect-video w-full border-b border-gray-300 object-cover object-top"
        />
      ) : (
        // Placeholder until a real screenshot is added to the data file.
        <div
          aria-hidden="true"
          className="diagonal-gradient-bg flex aspect-video w-full items-center justify-center opacity-60"
        >
          <span className="px-4 text-center text-2xl font-bold text-gray-900">
            {name}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-800">{summary}</p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">My role: </span>
          {role}
        </p>
        {details.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}
        <ul aria-label={`${name} tech stack`} className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
            >
              {tag}
            </li>
          ))}
        </ul>
        {url && (
          <div className="mt-auto pt-2">
            <ExternalLink href={url} className={secondaryButton}>
              Visit {name}
            </ExternalLink>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
