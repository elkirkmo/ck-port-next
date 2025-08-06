"use client";

import React, { useEffect, useState, Suspense } from 'react';

export default function VideoBG() {
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const videoNames =
      process.env.NEXT_PUBLIC_BG_VIDEO_ARRAY?.split(',').map((v) => v.trim()) ||
      [];
    if (videoNames.length > 0) {
      const idx = Math.floor(Math.random() * videoNames.length);
      setFileName(videoNames[idx].trim());
    }
  }, []);

  if (!fileName) return null;

  return (
    <div className="absolute left-0 top-0 w-lvw l-dvh object-cover -z-10">
         <Suspense fallback={<div>Loading video...</div>}>
        <Video fileName={fileName} />
      </Suspense>
    </div>
  );
}

interface VideoProps {
  fileName: string;
}

function Video({ fileName }: VideoProps) {
  const buildUrl = () =>
    `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${fileName}`;
  return (
    <div className="absolute left-0 top-0 w-lvw h-dvh object-cover">
      <video
        className="absolute left-0 top-0 w-lvw l-dvh object-cover -z-10"
        playsInline
        autoPlay
        loop
        muted
      >
        <source src={`${buildUrl()}.mp4`} key={buildUrl()} type="video/mp4" />
        <source src={`${buildUrl()}.webm`} key={buildUrl()} type="video/webm" />
      </video>
    </div>
  );
}