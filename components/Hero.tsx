import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient pt-24">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 text-[#8B5CF6] font-semibold mb-8 glass-panel"
        >
          <Sparkles className="w-4 h-4" />
          <span>Turn Waste into Wallet</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-[#1F2937] leading-tight mb-6"
        >
          Your Trash is <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] to-[#8B5CF6]">
            Someone&apos;s Treasure
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-[#1F2937]/80 max-w-2xl mx-auto mb-10 font-medium"
        >
          A marketplace connecting citizens with local scrap collectors. Get paid for your scrap, instantly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/citizen/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EC4899] text-white font-bold text-lg btn-hover-effect flex items-center justify-center gap-2">
            Sell Scrap Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/kabadiwala/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#1F2937] font-bold text-lg btn-hover-effect flex items-center justify-center gap-2 border-2 border-transparent hover:border-[#8B5CF6]/20">
            I&apos;m a Kabadiwala
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
