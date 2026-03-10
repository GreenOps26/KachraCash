import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import {Particles} from '@/components/ui/particles';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Particles
        className="fixed inset-0 -z-10"
        quantity={140}
        staticity={60}
        ease={80}
        size={0.7}
        color="#EC4899"
        vx={0.02}
        vy={0.01}
      />
      <Navbar />
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
