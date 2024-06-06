import { Suspense } from 'react';
import { list } from '@vercel/blob';

export default function VideoBG() {
  return (
    <div className="absolute left-0 top-0 w-lvw l-dvh object-cover -z-10">
      <Suspense fallback={<p>Loading video...</p>}>
        <Video fileName={randomBackground()} />
      </Suspense>
    </div>
  );
}

const backgroundVideoNames = process.env.BG_VIDEO_ARRAY?.split(',') || [];
const randomBackground = () =>
  backgroundVideoNames[
    (Math.random() * backgroundVideoNames.length) | 0
  ].trim();

interface VideoProps {
  fileName: string;
}

const Video = async ({ fileName }: VideoProps) => {
  const { blobs } = await list({
    prefix: fileName,
  });
  return (
    <div className=" absolute left-0 top-0 w-lvw h-dvh object-cover">
      <video
        className="absolute left-0 top-0 w-lvw l-dvh object-cover -z-10"
        playsInline
        autoPlay
        loop
        muted
      >
        {blobs.map(({ url }) => (
          <source src={url} key={url} type={`video/${url.split('.').pop()}`} />
        ))}
        {/* <source src="/videos/christmas-lights.webm" type="video/webm" /> */}
      </video>
    </div>
  );
};
