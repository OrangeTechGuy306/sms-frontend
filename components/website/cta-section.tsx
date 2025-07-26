import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Join Our Community?
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Take the first step towards your child's bright future. Our admissions team is here to guide you through
              the enrollment process and answer any questions you may have.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Schedule a Visit</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
