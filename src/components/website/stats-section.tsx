export default function StatsSection() {
  const stats = [
    { id: 1, name: "Students Enrolled", value: "1,200+" },
    { id: 2, name: "Qualified Teachers", value: "85" },
    { id: 3, name: "Years of Excellence", value: "25" },
    { id: 4, name: "College Acceptance Rate", value: "98%" },
  ]

  return (
    <div className="bg-violet-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Impact in Numbers</h2>
            <p className="mt-4 text-lg leading-8 text-violet-200">
              These numbers reflect our commitment to educational excellence and student success.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-violet-200">{stat.name}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
