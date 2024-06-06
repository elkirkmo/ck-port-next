import { Suspense } from 'react';
import { list } from '@vercel/blob';

export default function VideoBG() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <Video fileName={randomBackground()} />
    </Suspense>
  );
}

const backgroundVideoNames = process.env.BG_VIDEO_ARRA?.split(',') || [];
console.log(backgroundVideoNames);
const randomBackground = () =>
  backgroundVideoNames[(Math.random() * backgroundVideoNames.length) | 0];
interface VideoProps {
  fileName: string;
}

const Video = async ({ fileName }: VideoProps) => {
  const { blobs } = await list({
    prefix: fileName,
  });
  console.log(blobs);
  return (
    <div className="bg-sky-500/35 absolute left-0 top-0 w-lvw h-dvh object-cover">
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
