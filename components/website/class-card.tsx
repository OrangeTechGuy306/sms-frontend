import { Clock, Users, BookOpen } from "lucide-react"

interface ClassCardProps {
  title: string
  description: string
  grade: string
  duration: string
  students: number
  subjects: string[]
  image?: string
}

export default function ClassCard({ title, description, grade, duration, students, subjects }: ClassCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <BookOpen className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="inline-block bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full font-semibold">
            {grade}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{students} students per class</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Subjects:</h4>
          <div className="flex flex-wrap gap-1">
            {subjects.map((subject, index) => (
              <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
