import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function CTA() {
  return (
    <section className="py-24 bg-[#1F2937] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EC4899] via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Ready to turn your <span className="text-[#EC4899]">waste</span> into <span className="text-[#8B5CF6]">wallet</span>?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
        >
          Join KachraCash today and be part of the change.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/citizen/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EC4899] text-white font-bold text-lg btn-hover-effect flex items-center justify-center gap-2">
            Get Started as Citizen <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/kabadiwala/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2">
            Join as Kabadiwala
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
