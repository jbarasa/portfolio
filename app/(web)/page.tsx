import HeroSection from "./_components/hero";
import About from "./_components/about";
import MyServices from "./_components/services";
import TechStack from "./_components/tech-stack";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <MyServices />
      <TechStack />
    </main>
  );
}
