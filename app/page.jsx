import FloatingMenu from "@/components/FloatingMenu";
import Hero from "@/components/sections/Hero";
import Descent from "@/components/sections/Descent";
import Becoming from "@/components/sections/Becoming";
import End from "@/components/sections/End";

export default function Home() {
  
  return (
    <div className="relative">
      <FloatingMenu />
      
      <Hero />
      <Descent />
      <Becoming />
      <End />
    </div >
  );
}
