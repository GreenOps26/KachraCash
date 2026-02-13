import { Navbar } from "@/components/Navbar"
import { Hero3D } from "@/components/Hero3D"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Leaf, DollarSign, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10 relative">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Turn Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Waste into Wealth
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              The premium marketplace connecting households with verified recyclers.
              Get paid instantly for your dry waste with AI-powered verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth?mode=post">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Sell Waste <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth?mode=recycle">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  I'm a Recycler
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" /> Verified Recyclers
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" /> Instant Payment
                </div>
            </div>
          </div>

          <div className="relative h-full min-h-[400px] w-full rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-slate-900 dark:to-slate-800 border border-border/50 backdrop-blur-sm -z-0">
             <div className="absolute inset-0 flex items-center justify-center">
                <Hero3D />
             </div>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-primary/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] bg-secondary/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">How KachraCash Works</h2>
                <p className="text-muted-foreground">A seamless, deterministic workflow powered by the B.L.A.S.T. protocol.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Leaf className="h-10 w-10 text-primary" />,
                        title: "1. Post & AI Verify",
                        desc: "Snap a photo. Our Roboflow integration instantly classifies your waste and estimates value."
                    },
                    {
                        icon: <DollarSign className="h-10 w-10 text-accent" />,
                        title: "2. Recyclers Bid",
                        desc: "Verified collectors compete for your listing on our Geospatial Job Board."
                    },
                    {
                        icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
                        title: "3. Secure Handshake",
                        desc: "Zero-Inference verification ensures matched weight and instant wallet credit."
                    }
                ].map((feature, i) => (
                    <div key={i} className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-4 bg-muted w-16 h-16 rounded-lg flex items-center justify-center">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  )
}
