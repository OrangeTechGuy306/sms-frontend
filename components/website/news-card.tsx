import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

interface NewsCardProps {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
}

export default function NewsCard({ id, title, excerpt, date, category, image }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
        {image ? (
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-white">
            <Calendar className="h-12 w-12 mx-auto mb-2" />
            <span className="text-sm font-semibold">{category}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full font-semibold">
            {category}
          </span>
          <time className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>

        <Link
          href={`/news/${id}`}
          className="inline-flex items-center text-violet-600 hover:text-violet-700 text-sm font-semibold"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </article>
  )
}
