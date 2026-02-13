"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const modeParam = searchParams.get("mode")
    if (modeParam === "signup") setMode("signup")
    else setMode("login")
  }, [searchParams])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
            data: {
                full_name: email.split("@")[0], // Default name
                role: 'user' // Default role
            }
          },
        })
        if (error) throw error
        setMessage({ type: "success", text: "Check your email to confirm your account." })
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/dashboard") // Redirect to dashboard on success
        router.refresh()
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
                 <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
            </div>
          <CardTitle className="text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Enter your email to start turning waste into cash"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            {message && (
              <div className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-destructive/15 text-destructive"}`}>
                {message.text}
              </div>
            )}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </div>
             <Link href="/" className="text-xs text-muted-foreground hover:underline">
                 Back to Home
             </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
