import ClassCard from "@/components/website/class-card"
import Image from "next/image"

const classes = [
  {
    id: 1,
    title: "Early Childhood Program",
    description:
      "A nurturing environment for our youngest learners, focusing on foundational skills and social development.",
    grade: "Pre-K to Kindergarten",
    duration: "Full-day",
    students: 15,
    subjects: ["Literacy", "Numeracy", "Art", "Music", "Play-based Learning"],
  },
  {
    id: 2,
    title: "Elementary School",
    description: "Building strong academic foundations with a focus on critical thinking and creative expression.",
    grade: "Grades 1-5",
    duration: "Full-day",
    students: 20,
    subjects: ["Mathematics", "Science", "English Language Arts", "Social Studies", "Physical Education"],
  },
  {
    id: 3,
    title: "Middle School",
    description: "Transitioning to more complex subjects and fostering independent learning and responsibility.",
    grade: "Grades 6-8",
    duration: "Full-day",
    students: 25,
    subjects: ["Algebra", "Biology", "Literature", "History", "Foreign Languages", "Computer Science"],
  },
  {
    id: 4,
    title: "High School",
    description:
      "Preparing students for higher education and future careers with advanced courses and specialized programs.",
    grade: "Grades 9-12",
    duration: "Full-day",
    students: 25,
    subjects: ["Calculus", "Physics", "Chemistry", "Advanced Placement (AP) Courses", "Electives"],
  },
]

export default function ClassesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-violet-600">Our Programs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Our Academic Classes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Brightfuture Academy offers a comprehensive curriculum designed to challenge and inspire students at every
            stage of their academic journey.
          </p>
        </div>

        <div className="relative mt-16">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Students in a vibrant classroom setting"
            width={1200}
            height={400}
            className="w-full rounded-lg object-cover shadow-lg"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">A Dynamic Learning Environment</h3>
            <p className="mt-2 text-lg">
              Our classrooms are designed to foster collaboration, creativity, and critical thinking.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              title={cls.title}
              description={cls.description}
              grade={cls.grade}
              duration={cls.duration}
              students={cls.students}
              subjects={cls.subjects}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
