import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { ExperienceSection } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { profile } from "@/lib/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
    alumniOf: "D.Y. Patil College of Engineering, Akurdi",
    sameAs: profile.socials.map((s) => s.href),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <ExperienceSection />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
