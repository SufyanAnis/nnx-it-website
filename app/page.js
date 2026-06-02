import VideoIntro from "@/components/VideoIntro/VideoIntro";
import About from "@/components/About";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full" style={{ overflowX: "clip", background: "#0C0C0C" }}>
      {/* Sticky cinematic hero */}
      <VideoIntro />

      {/* Content scrolls up over the pinned hero */}
      <div className="relative z-10" style={{ background: "#0C0C0C" }}>
        <About />
        <Services />
        <Approach />
        <Contact />
      </div>
    </main>
  );
}
