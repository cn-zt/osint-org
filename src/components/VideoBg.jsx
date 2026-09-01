export default function VideoBg({ src, className = "video-bg" }) {
  return (
    <div className={className} aria-hidden="true" data-bg-src={src}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={src}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          console.log("[VideoBg] loaded:", src, v.videoWidth, "x", v.videoHeight);
          v.play().catch((err) => console.warn("[VideoBg] play() 失败:", err));
        }}
        onError={() => console.error("[VideoBg] 视频加载失败:", src)}
      />
    </div>
  );
}
