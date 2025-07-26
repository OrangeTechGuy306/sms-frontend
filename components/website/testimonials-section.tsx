export default function TestimonialsSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-violet-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Community Says</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear from our students, parents, and alumni about their experiences at Brightfuture Academy.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="flex flex-col justify-between bg-white p-6 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
            <div>
              <div className="flex items-center gap-x-2">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <span className="text-xl font-semibold text-violet-600">P</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Parent</h3>
                  <p className="text-sm leading-6 text-gray-600">Sarah Johnson, Parent of 8th Grader</p>
                </div>
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                "Brightfuture Academy has been transformative for my child. The teachers are incredibly dedicated and
                the curriculum is challenging yet engaging. I've seen tremendous growth in my child's confidence and
                academic abilities."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-x-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="flex flex-col justify-between bg-white p-6 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
            <div>
              <div className="flex items-center gap-x-2">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <span className="text-xl font-semibold text-violet-600">S</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Student</h3>
                  <p className="text-sm leading-6 text-gray-600">Michael Chen, 11th Grade</p>
                </div>
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                "I've been at Brightfuture for 5 years now, and it's been an amazing journey. The teachers really care
                about our success, and there are so many opportunities to explore different interests through clubs and
                activities."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-x-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="flex flex-col justify-between bg-white p-6 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
            <div>
              <div className="flex items-center gap-x-2">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <span className="text-xl font-semibold text-violet-600">A</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Alumni</h3>
                  <p className="text-sm leading-6 text-gray-600">Jessica Rodriguez, Class of 2018</p>
                </div>
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                "My education at Brightfuture Academy prepared me exceptionally well for college. The critical thinking
                skills, study habits, and confidence I developed there have been invaluable in my university studies and
                beyond."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-x-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
