import NewsCard from "@/components/website/news-card"

const newsArticles = [
  {
    id: 1,
    title: "Science Fair Winners Announced",
    excerpt:
      "Our students showcased incredible innovation and creativity at this year's annual science fair, with projects ranging from renewable energy solutions to biotechnology research.",
    date: "2024-01-15",
    category: "Academic",
  },
  {
    id: 2,
    title: "New STEM Lab Opens",
    excerpt:
      "State-of-the-art STEM laboratory now available for hands-on learning experiences, featuring the latest equipment and technology for student research and experimentation.",
    date: "2024-01-10",
    category: "Facilities",
  },
  {
    id: 3,
    title: "Basketball Team Wins Championship",
    excerpt:
      "Our varsity basketball team brings home the regional championship trophy after an outstanding season of teamwork, dedication, and athletic excellence.",
    date: "2024-01-05",
    category: "Sports",
  },
  {
    id: 4,
    title: "Student Art Exhibition Opens",
    excerpt:
      "The annual student art exhibition showcases the creative talents of our students across various mediums including painting, sculpture, and digital art.",
    date: "2023-12-20",
    category: "Arts",
  },
  {
    id: 5,
    title: "Model UN Team Places Second",
    excerpt:
      "Our Model United Nations team demonstrated exceptional diplomatic skills and global awareness at the state competition, earning second place overall.",
    date: "2023-12-15",
    category: "Academic",
  },
  {
    id: 6,
    title: "New Library Wing Dedication",
    excerpt:
      "The newly renovated library wing was officially dedicated, featuring expanded study spaces, modern technology, and a comprehensive digital resource center.",
    date: "2023-12-10",
    category: "Facilities",
  },
]

export default function NewsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-violet-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">News & Events</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stay up to date with the latest happenings at Brightfuture Academy. From academic achievements to
              community events, discover what makes our school community special.
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-violet-600">What's Coming Up</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Spring Open House</h3>
                    <p className="text-gray-600 mt-1">
                      Join us for our annual spring open house where prospective families can tour our campus, meet our
                      faculty, and learn about our academic programs.
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="font-semibold">March 15, 2024</div>
                    <div>10:00 AM - 2:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Spring Musical Performance</h3>
                    <p className="text-gray-600 mt-1">
                      Our talented students will perform "Into the Woods" in our newly renovated auditorium. Tickets are
                      available at the main office.
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="font-semibold">March 22-24, 2024</div>
                    <div>7:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Parent-Teacher Conferences</h3>
                    <p className="text-gray-600 mt-1">
                      Schedule your individual conference with your child's teachers to discuss academic progress and
                      development goals.
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="font-semibold">April 5-6, 2024</div>
                    <div>By Appointment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
