import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/api/",
  ];

  const isPublicPath = publicPaths.some((path) =>
    pathname === path || pathname.startsWith(path)
  );

  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  if (user && isPublicPath && pathname !== '/' && !pathname.startsWith('/api/')) {
    // Redirect logged in users away from auth pages to their dashboard
    // We assume they're a citizen for now, or you could route based on a database role.
    const url = request.nextUrl.clone()
    url.pathname = '/citizen/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
