import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { FacultyCard } from "@/components/website/faculty-card"

export default function FacultyPage() {
  const facultyMembers = [
    {
      id: "F001",
      name: "Dr. Emily White",
      title: "Head of Science Department",
      description:
        "Dr. White is passionate about fostering scientific curiosity and has published numerous papers in quantum physics.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      email: "emily.white@example.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "F002",
      name: "Mr. David Green",
      title: "Mathematics Teacher",
      description:
        "Mr. Green specializes in making complex mathematical concepts accessible and engaging for all students.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      email: "david.green@example.com",
      phone: "+1 (555) 987-6543",
    },
    {
      id: "F003",
      name: "Ms. Sarah Brown",
      title: "English Literature Teacher",
      description:
        "Ms. Brown inspires a love for reading and writing, guiding students through classic and contemporary literature.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      email: "sarah.brown@example.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "F004",
      name: "Coach Mark Johnson",
      title: "Physical Education & Sports Coach",
      description:
        "Coach Johnson promotes physical fitness and teamwork, leading our school's successful sports programs.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      email: "mark.johnson@example.com",
      phone: "+1 (555) 345-6789",
    },
    {
      id: "F005",
      name: "Ms. Olivia Davis",
      title: "Art & Design Teacher",
      description:
        "Ms. Davis encourages creativity and self-expression through various artistic mediums, nurturing young talents.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      email: "olivia.davis@example.com",
      phone: "+1 (555) 456-7890",
    },
    {
      id: "F006",
      name: "Mr. Robert Lee",
      title: "History & Social Studies Teacher",
      description:
        "Mr. Lee brings history to life with engaging lessons and encourages critical thinking about global events.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      email: "robert.lee@example.com",
      phone: "+1 (555) 567-8901",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 text-center">
        <Heading
          title="Our Esteemed Faculty"
          description="Meet the dedicated educators who inspire and guide our students every day."
          className="mb-8"
        />
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Our faculty members are not just teachers; they are mentors, innovators, and lifelong learners committed to
          providing a nurturing and challenging educational experience.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {facultyMembers.map((member) => (
          <FacultyCard
            key={member.id}
            name={member.name}
            title={member.title}
            description={member.description}
            imageUrl={member.imageUrl}
            email={member.email}
            phone={member.phone}
          />
        ))}
      </section>

      <section className="mt-16 text-center">
        <Heading
          title="Join Our Team"
          description="Passionate about education? Explore career opportunities with us."
          className="mb-8"
        />
        <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
          We are always looking for talented and dedicated individuals to join our growing faculty. If you are committed
          to academic excellence and student success, we encourage you to apply.
        </p>
        <Button size="lg">View Career Opportunities</Button>
      </section>
    </main>
  )
}
