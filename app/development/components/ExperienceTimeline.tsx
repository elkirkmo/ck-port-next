import Link from 'next/link';
import type { EarlierRole, Role, Sabbatical } from '../../data/development';

type ExperienceTimelineProps = {
  roles: Role[];
  earlier: EarlierRole[];
  sabbatical: Sabbatical;
};

const ExperienceTimeline = ({ roles, earlier, sabbatical }: ExperienceTimelineProps) => {
  const work = <cite className="italic">{sabbatical.work}</cite>;

  return (
    <>
      <p className="mb-8 text-gray-800">
        {sabbatical.before}
        {sabbatical.href ? (
          <Link href={sabbatical.href} className="underline underline-offset-2">
            {work}
          </Link>
        ) : (
          work
        )}
        {sabbatical.after}
      </p>
      <ol className="space-y-8 border-l-2 border-gray-300 pl-6">
        {roles.map(({ title, company, location, dates, note, bullets }) => (
          <li key={`${company}-${title}-${dates}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-2 border-white bg-gray-900"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {title}, {company}
            </h3>
            <p className="text-sm text-gray-700">
              {dates}
              {location && <> · {location}</>}
            </p>
            {note && <p className="mt-1 text-sm text-gray-700">{note}</p>}
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-800">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {earlier.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Earlier</h3>
          <ul className="mt-2 space-y-1 text-gray-800">
            {earlier.map(({ title, company, dates, detail }) => (
              <li key={`${company}-${title}`}>
                {title}, {company} ({dates})
                {detail && <>: {detail}</>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ExperienceTimeline;
