import type React from "react"
import type { Metadata } from "next"
import SiteHeader from "@/components/website/site-header"
import SiteFooter from "@/components/website/site-footer"

export const metadata: Metadata = {
  title: "Brightfuture Academy",
  description: "A leading educational institution dedicated to excellence",
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
