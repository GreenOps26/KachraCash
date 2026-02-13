"use client"

import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { MapPin, Filter, Navigation, DollarSign, Weight } from "lucide-react"

// Mock Data for Listings
const MOCK_LISTINGS = [
    {
        id: 1,
        type: "Plastic Bottles",
        weight: "2.5 kg",
        distance: "0.8 km",
        price: "₹45",
        status: "OPEN",
        location: { top: "40%", left: "30%" } // CSS positioning for mock map
    },
    {
        id: 2,
        type: "Cardboard Cartons",
        weight: "15.0 kg",
        distance: "2.1 km",
        price: "₹150",
        status: "OPEN",
        location: { top: "60%", left: "70%" }
    },
    {
        id: 3,
        type: "E-Waste (Old PC)",
        weight: "5.0 kg",
        distance: "3.5 km",
        price: "₹500",
        status: "OPEN",
        location: { top: "20%", left: "60%" }
    }
]

export default function RecyclerJobBoard() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      {/* Main Content: Map Layout */}
      <div className="flex-1 pt-16 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">

        {/* Sidebar: Job List */}
        <aside className="w-full md:w-96 bg-background border-r overflow-y-auto p-4 space-y-4 z-10 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Available Pickups</h1>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>

            {MOCK_LISTINGS.map((job) => (
                <Card key={job.id} className="hover:border-primary transition-colors cursor-pointer group">
                    <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{job.type}</CardTitle>
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-100">
                                {job.price}
                            </span>
                        </div>
                        <CardDescription className="flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3" /> {job.distance} away
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm grid grid-cols-2 gap-2 text-muted-foreground">
                        <div className="flex items-center gap-1"><Weight className="h-3 w-3" /> {job.weight}</div>
                        <div className="flex items-center gap-1 justify-end text-primary group-hover:underline">
                            View Details
                        </div>
                    </CardContent>
                </Card>
            ))}
        </aside>

        {/* Map Area (Mock) */}
        <main className="flex-1 relative bg-slate-100 dark:bg-slate-900 group">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.5946,12.9716,12,0/1200x800?access_token=MOCK_TOKEN')] bg-cover bg-center grayscale opacity-50">
                <div className="bg-background/80 p-4 rounded-lg backdrop-blur-sm shadow-md border text-center">
                    <p className="font-bold">Mapbox Integration Pending</p>
                    <p className="text-xs">API Key required to load live interactive map.</p>
                </div>
            </div>

            {/* Mock Pins */}
            {MOCK_LISTINGS.map((job) => (
                <div
                    key={job.id}
                    className="absolute w-8 h-8 -ml-4 -mt-8 cursor-pointer hover:scale-110 transition-transform"
                    style={{ top: job.location.top, left: job.location.left }}
                >
                    <div className="relative flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-primary drop-shadow-lg fill-current" />
                        <div className="absolute -top-8 bg-background px-2 py-1 rounded text-xs font-bold border shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {job.type}
                        </div>
                    </div>
                </div>
            ))}

            {/* Overlay Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <Button size="icon" className="rounded-full shadow-xl">
                    <Navigation className="h-5 w-5" />
                </Button>
            </div>
        </main>

      </div>
    </div>
  )
}
