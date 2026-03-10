import { Leaf, Truck, Map, IndianRupee, Home } from 'lucide-react';

export default function KabadiwalaMapPage() {
  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3 leading-relaxed">
          <Map className="w-8 h-8 text-[#EC4899]" />
          Find Scrap Nearby
        </h1>
        <p className="text-white/80 leading-relaxed">Browse active listings in your area and place bids.</p>
      </div>

      {/* Accessible List View for Screen Readers */}
      <div className="sr-only">
        <h2>Available Scrap Pickups</h2>
        <ul>
          <li>
            <p>Mixed Scrap (~5kg), 1.2 km away.</p>
            <button>View and Bid on Mixed Scrap</button>
          </li>
          <li>
            <p>Broken Microwave, 3.5 km away.</p>
            <button>View and Bid on Broken Microwave</button>
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden relative" aria-hidden="true">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-blue-50/50" style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        {/* Map Controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
          <div className="bg-white p-4 rounded-2xl shadow-md pointer-events-auto w-72">
            <h3 className="font-bold text-[#1F2937] mb-3">Filter Listings</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm py-2">
                <input type="checkbox" defaultChecked className="rounded text-[#8B5CF6] focus:ring-[#8B5CF6] w-5 h-5" />
                Plastic & Paper
              </label>
              <label className="flex items-center gap-2 text-sm py-2">
                <input type="checkbox" defaultChecked className="rounded text-[#8B5CF6] focus:ring-[#8B5CF6] w-5 h-5" />
                Metal & E-Waste
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Search Radius: 5km</p>
              <input type="range" min="1" max="20" defaultValue="5" className="w-full accent-[#8B5CF6]" />
            </div>
          </div>
        </div>

        {/* Mock Map Pins */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 bg-[#EC4899] rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              <IndianRupee className="w-6 h-6" />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-xl p-3 hidden group-hover:block z-10 transition-opacity">
              <p className="font-bold text-sm text-[#1F2937]">Mixed Scrap (~5kg)</p>
              <p className="text-xs text-gray-500 mb-2">1.2 km away</p>
              <button className="w-full min-h-[44px] bg-[#7c3aed] text-white text-xs font-bold rounded-lg hover:bg-[#6d28d9] focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed]">
                View & Bid
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <IndianRupee className="w-5 h-5" />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-xl p-3 hidden group-hover:block z-10 transition-opacity">
              <p className="font-bold text-sm text-[#1F2937]">Broken Microwave</p>
              <p className="text-xs text-gray-500 mb-2">3.5 km away</p>
              <button className="w-full min-h-[44px] bg-[#7c3aed] text-white text-xs font-bold rounded-lg hover:bg-[#6d28d9] focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed]">
                View & Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
