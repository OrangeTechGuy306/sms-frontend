import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const news = [
  {
    id: 1,
    title: "Science Fair Winners Announced",
    excerpt: "Our students showcased incredible innovation and creativity at this year's annual science fair.",
    date: "2024-01-15",
    category: "Academic",
  },
  {
    id: 2,
    title: "New STEM Lab Opens",
    excerpt: "State-of-the-art STEM laboratory now available for hands-on learning experiences.",
    date: "2024-01-10",
    category: "Facilities",
  },
  {
    id: 3,
    title: "Basketball Team Wins Championship",
    excerpt: "Our varsity basketball team brings home the regional championship trophy.",
    date: "2024-01-05",
    category: "Sports",
  },
]

export default function NewsSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest News & Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stay updated with the latest happenings at Brightfuture Academy.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {news.map((article) => (
            <article
              key={article.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="flex items-center gap-x-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <span className="bg-violet-600 text-white px-2 py-1 rounded-full text-xs">{article.category}</span>
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link href={`/news/${article.id}`}>
                  <span className="absolute inset-0" />
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">{article.excerpt}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/news" className="inline-flex items-center gap-2">
              View All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
