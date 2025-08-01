"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Trash2, Upload } from "lucide-react"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"
import { filesApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  filename: string
  original_filename: string
  file_size: number
  mime_type: string
  file_type: string
  description?: string
  is_public: boolean
  created_at: string
  uploaded_by_name?: string
}

interface StudentDocumentModalProps {
  studentId: string | number
  studentName: string
  trigger?: React.ReactNode
}

export function StudentDocumentModal({ studentId, studentName, trigger }: StudentDocumentModalProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newDocument, setNewDocument] = useState({
    description: "",
    file_type: "",
    file: null as File | null,
  })
  const { toast } = useToast()

  // Fetch documents when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchDocuments()
    }
  }, [isOpen, studentId])

  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const response = await filesApi.getByStudent(String(studentId))
      setDocuments(response || [])
    } catch (error) {
      console.error("Error fetching documents:", error)
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async () => {
    if (!newDocument.file || !newDocument.description || !newDocument.file_type) return

    setIsUploading(true)
    try {
      const metadata = {
        description: newDocument.description,
        relatedToType: 'student',
        relatedToId: String(studentId),
        isPublic: false
      }

      await filesApi.upload(newDocument.file, metadata)

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      })

      // Refresh documents list
      await fetchDocuments()

      // Reset form
      setNewDocument({ description: "", file_type: "", file: null })
    } catch (error) {
      console.error("Error uploading document:", error)
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      await filesApi.delete(documentId)
      toast({
        title: "Success",
        description: "Document deleted successfully",
      })
      // Refresh documents list
      await fetchDocuments()
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      })
    }
  }

  const handleDownload = (document: Document) => {
    // Open file in new tab for download/view
    const downloadUrl = `/api/files/${document.id}`
    window.open(downloadUrl, '_blank')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Documents - {studentName}</DialogTitle>
          <DialogDescription>Manage documents for this student.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Upload New Document</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="docDescription">Document Description</Label>
                <Input
                  id="docDescription"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter document description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="docType">Document Type</Label>
                <Select
                  value={newDocument.file_type}
                  onValueChange={(value) => setNewDocument((prev) => ({ ...prev, file_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="docFile">Select File</Label>
              <Input
                id="docFile"
                type="file"
                onChange={(e) => setNewDocument((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !newDocument.file || !newDocument.description || !newDocument.file_type}
            >
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </>
              )}
            </Button>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Existing Documents</h3>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading documents...
              </div>
            ) : documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">{document.original_filename}</TableCell>
                      <TableCell>{document.description || "No description"}</TableCell>
                      <TableCell className="capitalize">{document.file_type}</TableCell>
                      <TableCell>{new Date(document.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{formatFileSize(document.file_size)}</TableCell>
                      <TableCell>{document.uploaded_by_name || "Unknown"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(document)}
                            title="Download/View"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <DeleteConfirmationModal
                            title="Delete Document"
                            description={`Are you sure you want to delete "${document.original_filename}"? This action cannot be undone.`}
                            onConfirm={() => handleDelete(document.id)}
                            trigger={
                              <Button variant="outline" size="sm" title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No documents uploaded yet.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
