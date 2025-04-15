import { Suspense, useEffect, useState } from 'react';
const bgVideoArray = [
  'christmas-lights',
  ' egyptian-sunrise',
  ' golden-gate',
  ' jellyfish',
  ' lake-hike',
  ' laundry-spin',
];
const backgroundVideoNames = bgVideoArray;
const randomBackground = () =>
  backgroundVideoNames[
    (Math.random() * backgroundVideoNames.length) | 0
  ].trim();

export default function VideoBG() {
  console.log('heree');
  const [bg, setBg] = useState('');
  useEffect(() => {
    setBg(randomBackground());
  }, []);

  console.log('======================', bg);
  return (
    <div className="absolute left-0 top-0 w-lvw l-dvh object-cover -z-10">
      <Suspense fallback={<p>Loading video...</p>}>
        <Video fileName={bg} />
      </Suspense>
    </div>
  );
}

interface VideoProps {
  fileName: string;
}

const Video = async ({ fileName }: VideoProps) => {
  console.log(fileName);
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
