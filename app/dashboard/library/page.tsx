"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Badge } from '@/src/components/ui/badge';
import { DataTable } from '@/src/components/ui/data-table';
import { libraryApi } from '@/src/lib/api';
import { libraryBookSchema, type LibraryBookFormData } from '@/src/lib/validations';
import { toast } from '@/src/components/ui/use-toast';
import { Plus, Edit, Trash2, Book, BookOpen, Users, BarChart3, Loader2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

interface LibraryBook {
  id: string;
  isbn?: string;
  title: string;
  author: string;
  publisher?: string;
  publication_year?: number;
  category: string;
  subcategory?: string;
  language: string;
  total_copies: number;
  available_copies?: number;
  condition_status: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface LibraryLoan {
  id: string;
  book_id: string;
  borrower_id: string;
  borrower_type: string;
  loan_date: string;
  due_date: string;
  return_date?: string;
  status: string;
  book_title?: string;
  borrower_name?: string;
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'books' | 'loans' | 'statistics'>('books');
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loans, setLoans] = useState<LibraryLoan[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LibraryBookFormData>({
    resolver: zodResolver(libraryBookSchema),
    defaultValues: {
      language: 'English',
      condition_status: 'good',
      status: 'active',
    },
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await libraryApi.getBooks({
        page: 1,
        limit: 50,
        sort_by: 'title',
        sort_order: 'asc'
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await libraryApi.getLoans({
        page: 1,
        limit: 50,
        sort_by: 'loan_date',
        sort_order: 'desc'
      });
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      toast({
        title: "Error",
        description: "Failed to fetch loans. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await libraryApi.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch statistics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'books') {
      fetchBooks();
    } else if (activeTab === 'loans') {
      fetchLoans();
    } else if (activeTab === 'statistics') {
      fetchStatistics();
    }
  }, [activeTab]);

  const handleAddBook = async (data: LibraryBookFormData) => {
    try {
      const newBook = await libraryApi.createBook(data);
      setBooks(prev => [newBook, ...prev]);
      setAddBookModalOpen(false);
      reset();
      toast({
        title: "Book Added",
        description: "The book has been added to the library successfully.",
      });
    } catch (error) {
      console.error('Error adding book:', error);
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const bookColumns: ColumnDef<LibraryBook>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "total_copies",
      header: "Total Copies",
    },
    {
      accessorKey: "available_copies",
      header: "Available",
      cell: ({ row }) => {
        const available = row.getValue("available_copies") as number;
        const total = row.original.total_copies;
        return `${available || total}/${total}`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === "active" ? "default" : "outline"}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const book = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const loanColumns: ColumnDef<LibraryLoan>[] = [
    {
      accessorKey: "book_title",
      header: "Book Title",
    },
    {
      accessorKey: "borrower_name",
      header: "Borrower",
    },
    {
      accessorKey: "borrower_type",
      header: "Type",
    },
    {
      accessorKey: "loan_date",
      header: "Loan Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("loan_date"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("due_date"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === 'returned' ? 'default' : 
                      status === 'overdue' ? 'destructive' : 'outline';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const loan = row.original;
        return (
          <div className="flex items-center space-x-2">
            {loan.status === 'active' && (
              <Button variant="ghost" size="sm">
                Return Book
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium">Loading library data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management</h1>
          <p className="text-muted-foreground">
            Manage books, loans, and library operations.
          </p>
        </div>
        
        {activeTab === 'books' && (
          <Dialog open={addBookModalOpen} onOpenChange={setAddBookModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Add a new book to the library collection.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(handleAddBook)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      {...register('author')}
                      className={errors.author ? 'border-red-500' : ''}
                    />
                    {errors.author && (
                      <p className="text-sm text-red-600">{errors.author.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN (Optional)</Label>
                    <Input
                      id="isbn"
                      {...register('isbn')}
                      className={errors.isbn ? 'border-red-500' : ''}
                    />
                    {errors.isbn && (
                      <p className="text-sm text-red-600">{errors.isbn.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      {...register('category')}
                      className={errors.category ? 'border-red-500' : ''}
                    />
                    {errors.category && (
                      <p className="text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_copies">Total Copies</Label>
                  <Input
                    id="total_copies"
                    type="number"
                    {...register('total_copies', { valueAsNumber: true })}
                    className={errors.total_copies ? 'border-red-500' : ''}
                  />
                  {errors.total_copies && (
                    <p className="text-sm text-red-600">{errors.total_copies.message}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAddBookModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Book
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'books' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('books')}
        >
          <Book className="mr-2 h-4 w-4" />
          Books
        </Button>
        <Button
          variant={activeTab === 'loans' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('loans')}
        >
          <Users className="mr-2 h-4 w-4" />
          Loans
        </Button>
        <Button
          variant={activeTab === 'statistics' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('statistics')}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Statistics
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'books' && (
        <Card>
          <CardHeader>
            <CardTitle>Library Books</CardTitle>
            <CardDescription>
              Manage all books in the library collection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={bookColumns}
              data={books}
              searchKey="title"
              searchPlaceholder="Search books..."
            />
          </CardContent>
        </Card>
      )}

      {activeTab === 'loans' && (
        <Card>
          <CardHeader>
            <CardTitle>Book Loans</CardTitle>
            <CardDescription>
              Manage all book loans and returns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={loanColumns}
              data={loans}
              searchKey="book_title"
              searchPlaceholder="Search loans..."
            />
          </CardContent>
        </Card>
      )}

      {activeTab === 'statistics' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.total_books || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.active_loans || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.overdue_books || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Books</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.available_books || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
