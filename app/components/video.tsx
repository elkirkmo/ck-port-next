'use client';

import React, { useSyncExternalStore } from 'react';

const videoNames = (process.env.NEXT_PUBLIC_BG_VIDEO_ARRAY ?? '')
  .split(',')
  .map((name) => name.trim())
  .filter(Boolean);

/**
 * The background clip is picked at random, so the server and the browser would
 * disagree if it were chosen during render — a hydration mismatch. Instead the
 * server snapshot is always null and the choice is made lazily, client-side,
 * on first read. It is cached so repeated renders keep returning the same clip.
 */
let chosen: string | null | undefined;

const subscribe = () => () => {};

const getClientSnapshot = (): string | null => {
  if (chosen === undefined) {
    chosen =
      videoNames.length > 0
        ? videoNames[Math.floor(Math.random() * videoNames.length)]
        : null;
  }
  return chosen;
};

const getServerSnapshot = (): string | null => null;

export default function VideoBG() {
  const fileName = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!fileName) return null;

  return (
    <div className="absolute left-0 top-0 w-lvw h-dvh object-cover -z-10">
      <Video fileName={fileName} />
    </div>
  );
}

interface VideoProps {
  fileName: string;
}

function Video({ fileName }: VideoProps) {
  const url = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${fileName}`;

  return (
    <div className="absolute left-0 top-0 w-lvw h-dvh object-cover">
      <video
        className="absolute left-0 top-0 w-lvw h-dvh object-cover -z-10"
        playsInline
        autoPlay
        loop
        muted
      >
        <source src={`${url}.mp4`} type="video/mp4" />
        <source src={`${url}.webm`} type="video/webm" />
      </video>
    </div>
  );
}
