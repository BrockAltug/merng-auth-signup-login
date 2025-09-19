"use client"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Analytics />
    </div>
  )
}
