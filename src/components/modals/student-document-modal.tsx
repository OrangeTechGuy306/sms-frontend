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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Trash2, Upload } from "lucide-react"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  size: string
  url: string
}

interface StudentDocumentModalProps {
  studentId: string
  studentName: string
  trigger?: React.ReactNode
}

export function StudentDocumentModal({ studentId, studentName, trigger }: StudentDocumentModalProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Birth Certificate",
      type: "Identification",
      uploadDate: "2023-01-15",
      size: "1.2 MB",
      url: "#",
    },
    {
      id: "doc-2",
      name: "Medical Records",
      type: "Medical",
      uploadDate: "2023-02-10",
      size: "2.5 MB",
      url: "#",
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    file: null as File | null,
  })

  const handleUpload = async () => {
    if (!newDocument.file || !newDocument.name || !newDocument.type) return

    setIsUploading(true)
    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: newDocument.name,
        type: newDocument.type,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(newDocument.file.size / 1024 / 1024).toFixed(1)} MB`,
        url: "#",
      }
      
      setDocuments((prev) => [...prev, newDoc])
      setNewDocument({ name: "", type: "", file: null })
    } catch (error) {
      console.error("Error uploading document:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
  }

  const handleDownload = (document: Document) => {
    // Simulate download
    console.log("Downloading:", document.name)
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
                <Label htmlFor="docName">Document Name</Label>
                <Input
                  id="docName"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter document name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="docType">Document Type</Label>
                <Select
                  value={newDocument.type}
                  onValueChange={(value) => setNewDocument((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Identification">Identification</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
              disabled={isUploading || !newDocument.file || !newDocument.name || !newDocument.type}
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
            {documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">{document.name}</TableCell>
                      <TableCell>{document.type}</TableCell>
                      <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(document)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <DeleteConfirmationModal
                            title="Delete Document"
                            description={`Are you sure you want to delete "${document.name}"? This action cannot be undone.`}
                            onConfirm={() => handleDelete(document.id)}
                            trigger={
                              <Button variant="outline" size="sm">
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
