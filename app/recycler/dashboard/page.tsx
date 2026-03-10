import { TrendingUp, Package, IndianRupee, FileSpreadsheet } from 'lucide-react';

export default function RecyclerDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-surface-900 tracking-tight">Facility Overview</h1>
          <p className="text-surface-600 mt-1">Real-time metrics for your processing center.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm btn-hover-effect">
          <FileSpreadsheet className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards (Row on Desktop, Stack on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Procurement Volume", value: "14.2 Tons", icon: Package, color: "text-primary-600", bg: "bg-primary-50", trend: "+12%" },
          { title: "Network Kabadiwalas", value: "84 active", icon: TrendingUp, color: "text-accent-600", bg: "bg-accent-50", trend: "+4 this week" },
          { title: "Average Buying Price", value: "₹24/kg", icon: IndianRupee, color: "text-surface-700", bg: "bg-surface-100", trend: "-2% vs last mo" },
          { title: "Pending Contracts", value: "5 Orders", icon: FileSpreadsheet, color: "text-warning-600", bg: "bg-warning-50", trend: "Needs Approval" },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-surface-200 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-surface-500 font-medium text-sm w-3/4 leading-snug">{kpi.title}</h3>
              <div className={`p-2 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-surface-900 font-mono tracking-tight">{kpi.value}</p>
              <p className="text-xs font-medium text-surface-500 mt-2">{kpi.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-2xl shadow-card border border-surface-200 overflow-hidden">
        <div className="p-6 border-b border-surface-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-surface-900">Recent Inbound Shipments</h2>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50 text-surface-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Batch ID</th>
                <th className="px-6 py-4 font-medium">Vendor</th>
                <th className="px-6 py-4 font-medium">Material</th>
                <th className="px-6 py-4 font-medium">Weight</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {[
                { id: "SHP-1049", vendor: "Raju Scrap Co.", material: "Mixed Plastics (PET/HDPE)", weight: "450 kg", status: "Arrived", badge: "bg-primary-50 text-primary-700 border-primary-100" },
                { id: "SHP-1048", vendor: "Metro Waste", material: "Cardboard / Paper", weight: "1.2 Tons", status: "Processing", badge: "bg-accent-50 text-accent-700 border-accent-100" },
                { id: "SHP-1047", vendor: "Local Sweepers", material: "Aluminum Tins", weight: "85 kg", status: "Completed", badge: "bg-surface-100 text-surface-600 border-surface-200" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-medium text-surface-900">{row.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-surface-700">{row.vendor}</td>
                  <td className="px-6 py-4 text-sm text-surface-600">{row.material}</td>
                  <td className="px-6 py-4 text-sm font-medium text-surface-900">{row.weight}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${row.badge}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary-600 hover:underline">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
