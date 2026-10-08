'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * The address is stored in base64-encoded pieces and only joined in the
 * browser after a click, so it never appears in server-rendered HTML, the RSC
 * payload or content.ts. This stops ordinary scrapers; it is not secrecy.
 *
 * The pieces are encoded, not plain strings, because the minifier constant-
 * folds plain pieces back into the full address in the client JS bundle.
 * It can't evaluate atob(), so the address only exists at runtime.
 */
const encodedParts = ['bWU=', 'Y2hyaXNraXJraGFt', 'Y29t'];

const decodeParts = () => encodedParts.map((part) => atob(part));

const assemble = () => {
  const [user, domain, tld] = decodeParts();
  return `${user}@${domain}.${tld}`;
};

/**
 * Same pattern as video.tsx: the server snapshot is false, so the server (and
 * visitors without JavaScript) get the split-text fallback, and the button
 * only appears once the page has hydrated and can actually do something.
 */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ObfuscatedEmailProps = {
  label?: string;
  className?: string;
};

export default function ObfuscatedEmail({
  label = 'Show email address',
  className = '',
}: ObfuscatedEmailProps) {
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const [address, setAddress] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Move focus to the revealed link so keyboard users land on it.
  useEffect(() => {
    if (address) linkRef.current?.focus();
  }, [address]);

  if (!hydrated) {
    const [user, domain, tld] = decodeParts();
    return (
      <span className={className}>
        {user} [at] {domain} [dot] {tld}
      </span>
    );
  }

  if (address) {
    return (
      <a ref={linkRef} href={`mailto:${address}`} className={className}>
        {address}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const next = assemble();
        setAddress(next);
        window.open(`mailto:${next}`, '_self');
      }}
    >
      {label}
    </button>
  );
}
