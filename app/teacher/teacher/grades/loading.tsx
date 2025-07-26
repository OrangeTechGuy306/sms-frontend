import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TeacherGradesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[150px]" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="col-span-4 md:col-span-1">
          <CardHeader>
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-4 w-[180px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
            <div className="mt-6 space-y-4">
              <Skeleton className="h-4 w-[100px]" />
              <div className="space-y-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
              </div>
              <Skeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-3 space-y-6">
          <div className="flex gap-2 border-b">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[150px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[150px]" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-[60px]" />
                        <Skeleton className="h-4 w-[60px]" />
                        <Skeleton className="h-4 w-[60px]" />
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
