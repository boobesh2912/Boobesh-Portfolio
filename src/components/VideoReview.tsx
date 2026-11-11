/*
  A client's video review. Native controls and no autoplay: it is 7MB, so it
  loads nothing until someone presses play, and sound is the whole point. The
  captions are burned into the video itself.
*/
export default function VideoReview({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        className="mx-auto aspect-[9/16] max-h-[70vh] w-full rounded-2xl border border-line bg-ink object-cover shadow-[0_18px_44px_rgba(23,20,15,0.18)]"
      >
        <source src={src} type="video/mp4" />
        Your browser cannot play this video.
      </video>
      <figcaption className="mt-3 text-center font-hand text-lg text-ink-soft">
        {label}
      </figcaption>
    </figure>
  );
}
