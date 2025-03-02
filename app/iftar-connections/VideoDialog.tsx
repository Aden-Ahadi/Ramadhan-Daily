import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export function VideoDialog() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="/videos/iftar.mp4"
        thumbnailSrc="/iftar-image.jpg"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="/videos/iftar.mp4"
        thumbnailSrc="/iftar-image.jpg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
