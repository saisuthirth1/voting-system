import type React from "react"
import { SupportButton } from "@/components/support-button"
import { SOSButton } from "@/components/sos-button"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SupportButton />
        <SOSButton />
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
