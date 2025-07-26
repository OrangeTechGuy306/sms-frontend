"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (file: File | null) => void
  previewUrl?: string
  className?: string
  buttonText?: string
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFileChange, previewUrl, buttonText = "Select File", ...props }, ref) => {
    const [preview, setPreview] = React.useState<string | null>(previewUrl || null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        onFileChange?.(file)
      } else {
        setPreview(null)
        onFileChange?.(null)
      }
    }

    const handleClearFile = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      setPreview(null)
      onFileChange?.(null)
    }

    React.useEffect(() => {
      if (previewUrl) {
        setPreview(previewUrl)
      }
    }, [previewUrl])

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            <Upload className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
          {preview && (
            <Button type="button" variant="ghost" size="sm" onClick={handleClearFile}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={(el) => {
            // Handle both refs
            if (typeof ref === "function") {
              ref(el)
            } else if (ref) {
              ref.current = el
            }
            fileInputRef.current = el
          }}
          {...props}
        />
        {preview && (
          <div className="mt-2 overflow-hidden rounded-md border">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="h-48 w-auto object-cover" />
          </div>
        )}
      </div>
    )
  },
)

FileInput.displayName = "FileInput"
