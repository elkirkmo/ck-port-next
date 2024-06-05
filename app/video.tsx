export default function Video() {
  return (
    <div>
      <video
        className="absolute left-0 top-0 w-dvw h-dvh"
        playsInline
        autoPlay
        loop
        muted
      >
        <source src="/videos/christmas-lights.mp4" type="video/mp4" />
        <source src="/videos/christmas-lights.webm" type="video/webm" />
      </video>
    </div>
  );
}
