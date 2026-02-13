"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="KachraCash Logo" width={32} height={32} className="object-contain" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Kachra<span className="text-primary">Cash</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth?mode=login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/auth?mode=signup">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
