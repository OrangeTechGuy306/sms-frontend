"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Book, User, Calendar, MapPin, Hash, Globe, FileText } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  publisher: string
  publishedYear: string
  edition: string
  language: string
  pages: string
  copies: string
  availableCopies: string
  location: string
  description: string
  status: string
  borrowingHistory?: any[]
  rating?: number
  reviews?: any[]
}

interface ViewBookModalProps {
  book: Book
  trigger?: React.ReactNode
}

export function ViewBookModal({ book, trigger }: ViewBookModalProps) {
  const [open, setOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'checked out':
        return 'bg-yellow-100 text-yellow-800'
      case 'reserved':
        return 'bg-blue-100 text-blue-800'
      case 'damaged':
        return 'bg-red-100 text-red-800'
      case 'lost':
        return 'bg-gray-100 text-gray-800'
      case 'under repair':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage === 0) return 'bg-red-100 text-red-800'
    if (percentage <= 25) return 'bg-orange-100 text-orange-800'
    if (percentage <= 50) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const availableCopies = parseInt(book.availableCopies) || 0
  const totalCopies = parseInt(book.copies) || 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
          <DialogDescription>Complete information about the book.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-muted-foreground">by {book.author}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(book.status)}>
                {book.status}
              </Badge>
              <Badge variant="outline">{book.category}</Badge>
              <Badge className={getAvailabilityColor(availableCopies, totalCopies)}>
                {availableCopies}/{totalCopies} Available
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Book Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Book Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Author:</span>
                <p className="flex items-center mt-1">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  {book.author}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Category:</span>
                <p>{book.category}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">ISBN:</span>
                <p className="flex items-center mt-1">
                  <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                  {book.isbn || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Language:</span>
                <p className="flex items-center mt-1">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  {book.language}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Publication Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Publication Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Publisher:</span>
                <p>{book.publisher || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Published Year:</span>
                <p>{book.publishedYear || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Edition:</span>
                <p>{book.edition || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Pages:</span>
                <p className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  {book.pages || 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Library Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Library Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Location:</span>
                <p className="flex items-center mt-1">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {book.location || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Total Copies:</span>
                <p>{book.copies}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Available Copies:</span>
                <p>{book.availableCopies}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Checked Out:</span>
                <p>{totalCopies - availableCopies}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Description</h4>
                <div className="text-sm">
                  <p className="p-3 bg-muted rounded-md">{book.description}</p>
                </div>
              </div>
            </>
          )}

          {/* Statistics */}
          <Separator />
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Statistics</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-blue-600">{totalCopies}</div>
                <div className="text-muted-foreground">Total Copies</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-green-600">{availableCopies}</div>
                <div className="text-muted-foreground">Available</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-2xl font-bold text-orange-600">{totalCopies - availableCopies}</div>
                <div className="text-muted-foreground">Checked Out</div>
              </div>
            </div>
          </div>

          {/* Rating and Reviews */}
          {book.rating && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Rating & Reviews</h4>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{book.rating}</div>
                  <div className="text-muted-foreground">out of 5 stars</div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
