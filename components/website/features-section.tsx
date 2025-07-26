import { BookOpen, Users, Award, Lightbulb, Heart, Globe } from "lucide-react"

const features = [
  {
    name: "Quality Education",
    description:
      "Our curriculum is designed to provide a comprehensive education that prepares students for future success.",
    icon: BookOpen,
  },
  {
    name: "Expert Faculty",
    description: "Our teachers are highly qualified professionals dedicated to bringing out the best in every student.",
    icon: Users,
  },
  {
    name: "Academic Excellence",
    description:
      "We maintain high academic standards and consistently achieve outstanding results in national examinations.",
    icon: Award,
  },
  {
    name: "Innovation",
    description: "We embrace modern teaching methods and technology to enhance the learning experience.",
    icon: Lightbulb,
  },
  {
    name: "Holistic Development",
    description:
      "We focus on developing not just academic skills, but also character, creativity, and social responsibility.",
    icon: Heart,
  },
  {
    name: "Global Perspective",
    description:
      "Our programs prepare students to be global citizens with an understanding of diverse cultures and perspectives.",
    icon: Globe,
  },
]

export default function FeaturesSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-violet-600">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for your child's education
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Brightfuture Academy, we provide a nurturing environment where students can thrive academically,
            socially, and emotionally.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
