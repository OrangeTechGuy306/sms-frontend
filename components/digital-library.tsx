"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
  User,
  Star,
  Heart,
  Share,
  Bookmark,
  QrCode,
  Scan,
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Library,
  Tablet,
  Headphones,
  Video,
  FileText,
} from "lucide-react"

// Sample library data
const books = [
  {
    id: "BOOK001",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    grade: "9-12",
    copies: 25,
    available: 18,
    checkedOut: 7,
    reserved: 2,
    rating: 4.5,
    coverImage: "/placeholder.svg",
    description: "A classic novel about racial injustice and childhood innocence in the American South.",
    publishedYear: 1960,
    pages: 376,
    readingLevel: "Grade 9",
  },
  {
    id: "BOOK002",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    grade: "11-12",
    copies: 30,
    available: 22,
    checkedOut: 8,
    reserved: 0,
    rating: 4.2,
    coverImage: "/placeholder.svg",
    description: "A tale of decadence and excess in Jazz Age America.",
    publishedYear: 1925,
    pages: 180,
    readingLevel: "Grade 11",
  },
  {
    id: "BOOK003",
    title: "Introduction to Biology",
    author: "Campbell & Reece",
    isbn: "978-0-321-55823-7",
    category: "Textbook",
    grade: "9-10",
    copies: 40,
    available: 35,
    checkedOut: 5,
    reserved: 3,
    rating: 4.0,
    coverImage: "/placeholder.svg",
    description: "Comprehensive biology textbook for high school students.",
    publishedYear: 2020,
    pages: 1248,
    readingLevel: "Grade 9-10",
  },
]

const digitalResources = [
  {
    id: "EBOOK001",
    title: "Digital Mathematics Collection",
    type: "E-book Collection",
    provider: "McGraw-Hill Education",
    accessType: "Unlimited",
    users: 1248,
    license: "School-wide",
    expiryDate: "2025-06-30",
    cost: "$2,400/year",
    icon: FileText,
  },
  {
    id: "VIDEO001",
    title: "Science Video Library",
    type: "Video Content",
    provider: "National Geographic",
    accessType: "Streaming",
    users: 856,
    license: "Concurrent 50 users",
    expiryDate: "2024-12-31",
    cost: "$1,800/year",
    icon: Video,
  },
  {
    id: "AUDIO001",
    title: "Language Learning Audio",
    type: "Audio Resources",
    provider: "Rosetta Stone",
    accessType: "Individual Accounts",
    users: 234,
    license: "Per student",
    expiryDate: "2025-03-15",
    cost: "$15/student/year",
    icon: Headphones,
  },
]

const checkoutHistory = [
  {
    id: "CHK001",
    studentName: "Emma Thompson",
    studentId: "STU001",
    bookTitle: "To Kill a Mockingbird",
    checkoutDate: "2024-04-10",
    dueDate: "2024-04-24",
    returnDate: null,
    status: "checked_out",
    renewals: 0,
    fines: 0,
  },
  {
    id: "CHK002",
    studentName: "James Wilson",
    studentId: "STU002",
    bookTitle: "The Great Gatsby",
    checkoutDate: "2024-04-05",
    dueDate: "2024-04-19",
    returnDate: "2024-04-18",
    status: "returned",
    renewals: 1,
    fines: 0,
  },
  {
    id: "CHK003",
    studentName: "Sophia Martinez",
    studentId: "STU003",
    bookTitle: "Introduction to Biology",
    checkoutDate: "2024-03-28",
    dueDate: "2024-04-11",
    returnDate: null,
    status: "overdue",
    renewals: 0,
    fines: 5.50,
  },
]

const libraryStats = {
  totalBooks: 12847,
  totalCheckouts: 3456,
  activeUsers: 1089,
  overdueItems: 23,
  totalFines: 234.50,
  popularCategories: [
    { category: "Fiction", checkouts: 1234 },
    { category: "Science", checkouts: 987 },
    { category: "History", checkouts: 756 },
    { category: "Mathematics", checkouts: 654 },
  ],
}

export function DigitalLibrary() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null)
  const [isBookDetailOpen, setIsBookDetailOpen] = useState(false)
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || book.category.toLowerCase() === selectedCategory
    const matchesGrade = selectedGrade === "all" || book.grade.includes(selectedGrade)
    return matchesSearch && matchesCategory && matchesGrade
  })

  const handleViewBook = (book: typeof books[0]) => {
    setSelectedBook(book)
    setIsBookDetailOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "checked_out": return "secondary"
      case "returned": return "outline"
      case "overdue": return "destructive"
      case "reserved": return "default"
      default: return "outline"
    }
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage <= 20) return "text-red-600"
    if (percentage <= 50) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Digital Library System</h2>
          <p className="text-muted-foreground">Manage books, digital resources, and library operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <QrCode className="mr-2 h-4 w-4" />
            Scan Book
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>Add a new book to the library catalog</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Book title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" placeholder="Author name" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" placeholder="978-0-123456-78-9" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                        <SelectItem value="textbook">Textbook</SelectItem>
                        <SelectItem value="reference">Reference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="copies">Number of Copies</Label>
                    <Input id="copies" type="number" placeholder="25" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Book description..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddBookOpen(false)}>Add Book</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
          <TabsTrigger value="digital">Digital Resources</TabsTrigger>
          <TabsTrigger value="checkouts">Checkouts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fines">Fines & Fees</TabsTrigger>
        </TabsList>

        {/* Book Catalog Tab */}
        <TabsContent value="catalog" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books, authors, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="textbook">Textbook</SelectItem>
                <SelectItem value="reference">Reference</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-medium line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{book.category}</Badge>
                        <Badge variant="secondary">{book.grade}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${getAvailabilityColor(book.available, book.copies)}`}>
                          {book.available}/{book.copies} available
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{book.rating}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewBook(book)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" disabled={book.available === 0}>
                              Checkout
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Checkout Book</DialogTitle>
                              <DialogDescription>
                                Checkout "{book.title}" to a student
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="student">Student</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select student" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="stu001">Emma Thompson (STU001)</SelectItem>
                                    <SelectItem value="stu002">James Wilson (STU002)</SelectItem>
                                    <SelectItem value="stu003">Sophia Martinez (STU003)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="due-date">Due Date</Label>
                                <Input id="due-date" type="date" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setIsCheckoutOpen(false)}>
                                Checkout Book
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Digital Resources Tab */}
        <TabsContent value="digital" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {digitalResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <resource.icon className="h-5 w-5" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.provider}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Type:</span>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Access:</span>
                    <span className="font-medium">{resource.accessType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Users:</span>
                    <span className="font-medium">{resource.users.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>License:</span>
                    <span className="text-muted-foreground">{resource.license}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Expires:</span>
                    <span className="text-muted-foreground">{resource.expiryDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Cost:</span>
                    <span className="font-medium text-green-600">{resource.cost}</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                <Library className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{libraryStats.totalBooks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">In collection</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Checkouts</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{libraryStats.totalCheckouts.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This academic year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{libraryStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{libraryStats.overdueItems}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Most checked out book categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {libraryStats.popularCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{category.checkouts}</span>
                        <Progress
                          value={(category.checkouts / libraryStats.popularCategories[0].checkouts) * 100}
                          className="w-20 h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Library usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Usage trend chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
