import { LayoutDashboard, Users, FileText, Settings, Factory } from 'lucide-react';
import Link from 'next/link';

export default function RecyclerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-surface-50 min-h-screen font-sans">
      {/* Mobile Hidden Sidebar, Desktop Visible */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-surface-900 border-r border-surface-800 z-50">
        <div className="p-6">
          <Link href="/recycler/dashboard" className="flex items-center gap-2">
            <Factory className="w-8 h-8 text-primary-400" />
            <span className="text-xl font-bold text-white tracking-tight">Recycle<span className="text-primary-400">Hub</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 text-surface-300">
          <Link href="/recycler/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-800 text-white font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/recycler/vendors" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            Kabadiwala Network
          </Link>
          <Link href="/recycler/contracts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-800 hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
            Active Contracts
          </Link>
        </nav>

        <div className="p-4 border-t border-surface-800">
          <Link href="/recycler/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-800 text-surface-300 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content (pushed right on desktop) */}
      <main className="flex-1 md:ml-64 relative min-w-0">
        {/* Mobile Navbar Alternative */}
        <div className="md:hidden p-4 bg-surface-900 flex items-center gap-2">
          <Factory className="w-6 h-6 text-primary-400" />
          <span className="text-lg font-bold text-white tracking-tight">Recycle<span className="text-primary-400">Hub</span></span>
        </div>

        <div className="p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
