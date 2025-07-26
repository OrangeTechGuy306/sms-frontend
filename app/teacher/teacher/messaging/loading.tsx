import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TeacherMessagingLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="mt-2 h-4 w-[250px]" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-5 w-[30px]" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4">
              <div className="flex gap-2 border-b">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="divide-y">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-3 w-[60px]" />
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <Skeleton className="h-3 w-[180px]" />
                        <Skeleton className="h-5 w-[30px]" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="mt-1 h-4 w-[180px]" />
                </div>
              </div>
              <Skeleton className="h-9 w-[120px]" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 py-4 space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <Skeleton className={`h-[80px] w-[80%] rounded-lg ${i % 2 === 0 ? "" : "ml-auto"}`} />
                  </div>
                ))}
            </div>
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Skeleton className="h-[80px] w-full" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
