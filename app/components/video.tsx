import { Suspense } from 'react';

export default function VideoBG() {
  console.log('heree');
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
  let buildUrl = () => `${process.env.S3_BUCKET_URL}${fileName}`;
  console.log(`============================${buildUrl()}`);
  return (
    <div className=" absolute left-0 top-0 w-lvw h-dvh object-cover">
      <video
        className="absolute left-0 top-0 w-lvw l-dvh object-cover -z-10"
        playsInline
        autoPlay
        loop
        muted
      >
        <source
          src={`${buildUrl()}.mp4`}
          key={`${buildUrl()}videomp4`}
          type="video/mp4"
        />
        <source
          src={`${buildUrl()}.webm`}
          key={`${buildUrl()}videowebm`}
          type="video/webm"
        />
      </video>
    </div>
  );
};
