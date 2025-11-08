import HeroSection from "./_components/hero";
import About from "./_components/about";
import MyServices from "./_components/services";
import TechStack from "./_components/tech-stack";
import DevOps from "./_components/devops";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <MyServices />
      <TechStack />
      <DevOps />
    </main>
  );
}
