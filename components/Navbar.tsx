import Link from 'next/link';
import { Leaf, User, Truck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#EC4899]">
        <Leaf className="w-8 h-8" />
        KachraCash
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/citizen/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors font-semibold text-[#1F2937]">
          <User className="w-4 h-4" />
          Citizen
        </Link>
        <Link href="/kabadiwala/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6] text-white btn-hover-effect font-semibold">
          <Truck className="w-4 h-4" />
          Kabadiwala
        </Link>
      </div>
    </nav>
  );
}
