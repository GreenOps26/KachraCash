"use client"

import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { useState, useRef } from "react"
import { Loader2, Upload, Camera, Leaf } from "lucide-react"
import Image from "next/image"

export default function Dashboard() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState<{ class: string, confidence: number, weight: number } | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setAiResult(null) // Reset AI result
    }
  }

  const analyzeImage = async () => {
    if (!image) return
    setAnalyzing(true)

    // Simulate Roboflow API call
    setTimeout(() => {
        setAiResult({
            class: "Plastic Bottles (PET)",
            confidence: 0.98,
            weight: 2.5 // Estimated weight
        })
        setAnalyzing(false)
    }, 2000)
  }

  const handlePost = async () => {
      setUploading(true)
      // Simulate Database Insert
      // In real app: Upload to Supabase Storage -> Insert into 'listings' table

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
          alert("You must be logged in to post.")
          setUploading(false)
          return
      }

      // Mocking successful post for now
      setTimeout(() => {
          setUploading(false)
          alert("Listing Posted Successfully! (Mock)")
          // Reset form
          setImage(null)
          setPreview(null)
          setAiResult(null)
      }, 1000)
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Post Waste Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-primary" /> Post New Waste
                    </CardTitle>
                    <CardDescription>
                        Take a photo of your dry waste.
                        Our AI will verify it and estimate the value.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div
                        className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors h-64 relative overflow-hidden"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {preview ? (
                            <Image src={preview} alt="Preview" fill className="object-contain" />
                        ) : (
                            <>
                                <Upload className="h-10 w-10 mb-2" />
                                <p>Click to upload or take photo</p>
                            </>
                        )}
                        <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                        />
                    </div>

                    {image && !aiResult && (
                        <Button className="w-full" onClick={analyzeImage} disabled={analyzing}>
                            {analyzing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing with Roboflow...
                                </>
                            ) : (
                                "Analyze Waste"
                            )}
                        </Button>
                    )}

                    {aiResult && (
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-900 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Detected Type</span>
                                <span className="font-bold text-primary flex items-center gap-1">
                                    <Leaf className="h-4 w-4" /> {aiResult.class}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Confidence</span>
                                <span className="font-mono text-sm">{(aiResult.confidence * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Est. Weight</span>
                                <span className="font-bold">{aiResult.weight} kg</span>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        size="lg"
                        disabled={!aiResult || uploading}
                        onClick={handlePost}
                    >
                        {uploading ? <Loader2 className="animate-spin" /> : "Post Listing"}
                    </Button>
                </CardFooter>
            </Card>

            {/* Recent Listings (Placeholder) */}
            <Card>
                <CardHeader>
                    <CardTitle>My Active Listings</CardTitle>
                    <CardDescription>Track your waste status and bids.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        No active listings found.
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
