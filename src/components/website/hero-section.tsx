import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-violet-100/20">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <div className="inline-flex space-x-6">
                  <span className="rounded-full bg-violet-600/10 px-3 py-1 text-sm font-semibold leading-6 text-violet-600 ring-1 ring-inset ring-violet-600/10">
                    Enrolling Now
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                    <span>For 2023-2024</span>
                  </span>
                </div>
              </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Building <span className="text-violet-600">Bright Futures</span> Through Education
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                At Brightfuture Academy, we nurture young minds with quality education, innovative teaching methods, and
                a supportive environment to help students reach their full potential.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild className="bg-violet-600 hover:bg-violet-700">
                  <Link href="/apply">Apply Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-violet-600/10 ring-1 ring-violet-50 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div className="shadow-lg md:rounded-3xl">
            <div className="bg-violet-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div
                className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-violet-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Group of happy school students"
                    className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  )
}
