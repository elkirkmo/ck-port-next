import ObfuscatedEmail from '../../components/ObfuscatedEmail';
import type { Profile } from '../../data/development';
import ExternalLink from './ExternalLink';
import { primaryButton, secondaryButton } from './buttonStyles';

type ContactCTAProps = {
  profile: Profile;
};

const ContactCTA = ({ profile }: ContactCTAProps) => (
  <div className="rounded-lg border border-gray-300 bg-white/80 p-6 shadow-sm">
    <p className="text-lg text-gray-900">{profile.availability}</p>
    <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <li>
        <ObfuscatedEmail label="Email me" className={`${primaryButton} w-full sm:w-auto`} />
      </li>
      <li>
        <ExternalLink href={profile.linkedin} className={`${secondaryButton} w-full sm:w-auto`}>
          {profile.name} on LinkedIn
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={profile.github} className={`${secondaryButton} w-full sm:w-auto`}>
          {profile.name} on GitHub
        </ExternalLink>
      </li>
    </ul>
  </div>
);

export default ContactCTA;
