import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-xl sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <Image
                className="absolute inset-0 h-full w-full object-cover"
                src="/placeholder.svg?height=600&width=800"
                alt="Students learning in a modern classroom"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
              <div className="relative">
                <figure>
                  <blockquote className="mt-6 text-lg font-semibold leading-8 text-white">
                    <p>"Education is not the filling of a pail, but the lighting of a fire."</p>
                  </blockquote>
                  <figcaption className="mt-6 text-base text-white">
                    <div className="font-semibold">William Butler Yeats</div>
                    <div className="text-gray-300">Poet & Educator</div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700">
              <p className="text-base font-semibold leading-7 text-violet-600">Our Story</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                About Brightfuture Academy
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Brightfuture Academy was founded in 1995 with a vision to provide holistic education that nurtures
                  both academic excellence and personal growth. Over the decades, we have grown into a vibrant community
                  dedicated to fostering a love for learning and preparing students for a successful future.
                </p>
                <p className="mt-8">
                  Our commitment to innovation in teaching, a supportive learning environment, and a rich
                  extracurricular program sets us apart. We believe in empowering every student to discover their
                  potential, develop critical thinking skills, and become responsible global citizens.
                </p>
                <p className="mt-8">
                  We pride ourselves on our dedicated faculty, state-of-the-art facilities, and a curriculum designed to
                  meet the challenges of the 21st century. Our alumni have gone on to achieve great success in various
                  fields, a testament to the strong foundation they received at Brightfuture Academy.
                </p>
              </div>
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-gray-900">Our Mission</dt>
                <dd className="mt-2">
                  To inspire and empower students to achieve their full potential through a challenging curriculum and a
                  supportive community.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Our Vision</dt>
                <dd className="mt-2">
                  To be a leading educational institution recognized for academic excellence, innovation, and character
                  development.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Core Values</dt>
                <dd className="mt-2">Integrity, Respect, Excellence, Collaboration, and Lifelong Learning.</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Our Approach</dt>
                <dd className="mt-2">
                  Student-centered learning, inquiry-based education, and a focus on critical thinking and
                  problem-solving.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
