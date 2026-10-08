import type { Credential } from '../../data/development';

type EducationAwardsProps = {
  education: Credential[];
  awards: Credential[];
};

const CredentialList = ({ title, items }: { title: string; items: Credential[] }) => (
  <div>
    <h2 className="font-semibold text-gray-900">{title}</h2>
    <ul className="mt-2 space-y-1 text-sm text-gray-700">
      {items.map(({ title: name, detail, year }) => (
        <li key={name}>
          {name}, {detail} ({year})
        </li>
      ))}
    </ul>
  </div>
);

const EducationAwards = ({ education, awards }: EducationAwardsProps) => (
  <div className="grid gap-6 sm:grid-cols-2">
    <CredentialList title="Education" items={education} />
    <CredentialList title="Awards" items={awards} />
  </div>
);

export default EducationAwards;
