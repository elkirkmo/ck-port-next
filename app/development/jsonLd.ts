import { siteUrl } from '../siteConfig';
import type { Profile } from '../data/development';

/** schema.org Person. No email: that would undo ObfuscatedEmail. */
export const personJsonLd = (profile: Profile) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  sameAs: [profile.linkedin, profile.github],
});

/** JSON.stringify doesn't escape `<`, so a `</script>` in the data could break out. */
export const serializeJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
