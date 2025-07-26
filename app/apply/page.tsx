import ApplicationForm from "@/components/website/application-form"
import { CheckCircle, Clock, FileText, Users } from "lucide-react"

export default function ApplyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-violet-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Apply to Brightfuture Academy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Take the first step towards your child's bright future. Our admissions process is designed to be
              straightforward and supportive, helping you every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-violet-600">Simple Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How to Apply</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our admission process is designed to get to know your child and family while ensuring the best fit for
            everyone involved.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                1. Submit Application
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Complete our online application form with your child's information, academic history, and family
                details.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                  <Users className="h-6 w-6 text-white" />
                </div>
                2. Interview & Assessment
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Meet with our admissions team and participate in age-appropriate assessments to understand your child's
                needs.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                3. Review Process
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Our admissions committee carefully reviews all applications and makes decisions within 2-3 weeks.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                4. Enrollment
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Upon acceptance, complete enrollment paperwork and prepare for an exciting educational journey.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-violet-600">Start Your Journey</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Application Form</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Please fill out all sections of the application form. Our admissions team will contact you within 2-3
              business days to discuss next steps.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <ApplicationForm />
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-violet-600">Important Information</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Application Deadlines & Dates
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-violet-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fall 2024 Admission</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Application Deadline:</strong> March 15, 2024
                </li>
                <li>
                  <strong>Interviews:</strong> March 20 - April 5, 2024
                </li>
                <li>
                  <strong>Decision Letters:</strong> April 15, 2024
                </li>
                <li>
                  <strong>Enrollment Deadline:</strong> May 1, 2024
                </li>
              </ul>
            </div>
            <div className="bg-violet-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spring 2025 Admission</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Application Deadline:</strong> November 15, 2024
                </li>
                <li>
                  <strong>Interviews:</strong> November 20 - December 5, 2024
                </li>
                <li>
                  <strong>Decision Letters:</strong> December 15, 2024
                </li>
                <li>
                  <strong>Enrollment Deadline:</strong> January 5, 2025
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
