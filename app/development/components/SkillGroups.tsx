import type { SkillGroup } from '../../data/development';

type SkillGroupsProps = {
  groups: SkillGroup[];
};

const SkillGroups = ({ groups }: SkillGroupsProps) => (
  <dl className="grid gap-6 sm:grid-cols-2">
    {groups.map(({ label, items }) => (
      <div key={label}>
        <dt className="font-semibold text-gray-900">{label}</dt>
        <dd className="mt-2">
          <ul aria-label={`${label} skills`} className="flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-gray-300 bg-white/80 px-3 py-1 text-sm text-gray-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </dd>
      </div>
    ))}
  </dl>
);

export default SkillGroups;
