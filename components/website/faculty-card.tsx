import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

interface FacultyCardProps {
  name: string
  title: string
  description: string
  imageUrl: string
  email: string
  phone: string
}

export function FacultyCard({ name, title, description, imageUrl, email, phone }: FacultyCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={`Photo of ${name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <CardDescription className="text-primary">{title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Mail className="h-4 w-4" /> {email}
          </a>
          <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" /> {phone}
          </a>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}
