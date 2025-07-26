import ContactForm from "@/components/website/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-violet-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Contact Us</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We'd love to hear from you. Get in touch with us to learn more about our programs, schedule a visit, or
              ask any questions you may have.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information & Form */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our admissions team is here to help you through every step of the enrollment process.
            </p>

            <dl className="mt-10 space-y-6">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPin className="h-6 w-6 text-violet-600" />
                </dt>
                <dd className="text-gray-600">
                  123 Education Street
                  <br />
                  Learning City, State 12345
                  <br />
                  United States
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone className="h-6 w-6 text-violet-600" />
                </dt>
                <dd>
                  <a className="hover:text-violet-600" href="tel:+1234567890">
                    (123) 456-7890
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-6 w-6 text-violet-600" />
                </dt>
                <dd>
                  <a className="hover:text-violet-600" href="mailto:info@brightfuture.edu">
                    info@brightfuture.edu
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Office Hours</span>
                  <Clock className="h-6 w-6 text-violet-600" />
                </dt>
                <dd className="text-gray-600">
                  Monday - Friday: 8:00 AM - 5:00 PM
                  <br />
                  Saturday: 9:00 AM - 2:00 PM
                  <br />
                  Sunday: Closed
                </dd>
              </div>
            </dl>

            {/* Map placeholder */}
            <div className="mt-10">
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 overflow-hidden">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-violet-500 to-purple-600">
                  <div className="text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Interactive Map</p>
                    <p className="text-sm opacity-90">Click to view directions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-violet-600">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="space-y-8">
              <div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">What are your admission requirements?</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Our admission process includes an application form, academic records, teacher recommendations, and an
                  interview. We welcome students of all backgrounds who are eager to learn and grow.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  Do you offer financial aid or scholarships?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Yes, we offer need-based financial aid and merit scholarships. Our financial aid team works with
                  families to make quality education accessible to all qualified students.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  What is your student-to-teacher ratio?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We maintain small class sizes with an average student-to-teacher ratio of 15:1, ensuring personalized
                  attention and support for each student.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">Can I schedule a campus tour?</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We encourage prospective families to visit our campus. You can schedule a tour by calling our
                  admissions office or using our online contact form.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
