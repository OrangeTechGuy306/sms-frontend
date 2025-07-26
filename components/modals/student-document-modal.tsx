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
import { FileInput } from "@/components/ui/file-input"
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
      name: "Previous School Records",
      type: "Academic",
      uploadDate: "2023-01-20",
      size: "3.5 MB",
      url: "#",
    },
    {
      id: "doc-3",
      name: "Medical Certificate",
      type: "Medical",
      uploadDate: "2023-02-05",
      size: "0.8 MB",
      url: "#",
    },
  ])

  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "Identification",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
  }

  const handleAddDocument = () => {
    if (newDocument.name && selectedFile) {
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: newDocument.name,
        type: newDocument.type,
        uploadDate: new Date().toISOString().split("T")[0],
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        url: "#",
      }

      setDocuments([...documents, newDoc])
      setNewDocument({ name: "", type: "Identification" })
      setSelectedFile(null)
    }
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Documents</DialogTitle>
          <DialogDescription>
            Manage documents for {studentName} (ID: {studentId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document List */}
          <div>
            <h3 className="mb-2 text-lg font-medium">Uploaded Documents</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No documents uploaded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <DeleteConfirmationModal
                          title="Delete Document"
                          description={`Are you sure you want to delete ${doc.name}? This action cannot be undone.`}
                          onConfirm={() => handleDeleteDocument(doc.id)}
                          trigger={
                            <Button variant="ghost" size="sm">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Upload New Document */}
          <div className="border-t pt-4">
            <h3 className="mb-4 text-lg font-medium">Upload New Document</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="documentName">Document Name</Label>
                <Input
                  id="documentName"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  placeholder="Enter document name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select
                  value={newDocument.type}
                  onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Identification">Identification</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="documentFile">Document File</Label>
                <FileInput
                  id="documentFile"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onFileChange={handleFileChange}
                  buttonText="Select Document"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={handleAddDocument} disabled={!newDocument.name || !selectedFile}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
