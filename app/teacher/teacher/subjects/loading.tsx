import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function TeacherSubjectsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="mt-2 h-4 w-[250px]" />
        </div>
        <Skeleton className="h-10 w-[300px]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[80px]" />
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[40px]" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                  <Skeleton className="h-4 w-[200px]" />
                  <div>
                    <Skeleton className="h-4 w-[80px]" />
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Skeleton className="h-6 w-[80px]" />
                      <Skeleton className="h-6 w-[80px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
