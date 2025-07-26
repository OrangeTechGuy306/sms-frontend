import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function TeacherLessonNotesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <Skeleton className="h-9 w-[150px]" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex gap-2 border-b">
          <Skeleton className="h-10 w-[100px]" />
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[80px]" />
                </div>
                <Skeleton className="mt-2 h-4 w-[180px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-[80px] mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-[80px] mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
