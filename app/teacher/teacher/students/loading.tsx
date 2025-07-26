import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TeacherStudentsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="mt-2 h-4 w-[250px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex gap-2 border-b">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[130px]" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="mt-1 h-4 w-[250px]" />
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
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="mt-1 h-3 w-[180px]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
