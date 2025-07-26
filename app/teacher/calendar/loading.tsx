import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TeacherCalendarLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="mt-2 h-4 w-[250px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-5">
          <CardHeader>
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[500px] w-full" />
          </CardContent>
        </Card>

        <div className="col-span-7 md:col-span-2 space-y-6">
          <div className="flex gap-2 border-b">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-[150px]" />
                      <Skeleton className="h-5 w-[80px]" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
