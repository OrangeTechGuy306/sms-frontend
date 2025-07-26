"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image, FileText, Video, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { filesApi } from '@/lib/api';

interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  onUploadComplete?: (uploadedFiles: any[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  autoUpload?: boolean;
  metadata?: any;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  response?: any;
  error?: string;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return Image;
  if (fileType.startsWith('video/')) return Video;
  if (fileType.startsWith('audio/')) return Music;
  if (fileType.includes('pdf') || fileType.includes('document') || fileType.includes('text')) return FileText;
  return File;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onUploadComplete,
  accept,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = true,
  className,
  disabled = false,
  autoUpload = false,
  metadata,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const uploadFile = async (file: File): Promise<any> => {
    try {
      const response = await filesApi.upload(file, metadata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleFileUpload = async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    if (autoUpload) {
      const uploadPromises = newFiles.map(async (uploadedFile, index) => {
        const fileIndex = uploadedFiles.length + index;
        
        try {
          // Update status to uploading
          setUploadedFiles(prev => 
            prev.map((f, i) => 
              i === fileIndex ? { ...f, status: 'uploading', progress: 0 } : f
            )
          );

          // Simulate progress (since we don't have real progress from axios)
          const progressInterval = setInterval(() => {
            setUploadedFiles(prev => 
              prev.map((f, i) => 
                i === fileIndex && f.progress < 90 
                  ? { ...f, progress: f.progress + 10 } 
                  : f
              )
            );
          }, 200);

          const response = await uploadFile(uploadedFile.file);

          clearInterval(progressInterval);

          // Update with success
          setUploadedFiles(prev => 
            prev.map((f, i) => 
              i === fileIndex 
                ? { ...f, status: 'success', progress: 100, response } 
                : f
            )
          );

          return response;
        } catch (error: any) {
          // Update with error
          setUploadedFiles(prev => 
            prev.map((f, i) => 
              i === fileIndex 
                ? { 
                    ...f, 
                    status: 'error', 
                    progress: 0, 
                    error: error.response?.data?.message || 'Upload failed' 
                  } 
                : f
            )
          );
          
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${uploadedFile.file.name}`,
            variant: "destructive",
          });

          throw error;
        }
      });

      try {
        const results = await Promise.allSettled(uploadPromises);
        const successfulUploads = results
          .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
          .map(result => result.value);

        if (successfulUploads.length > 0) {
          onUploadComplete?.(successfulUploads);
          toast({
            title: "Upload Successful",
            description: `${successfulUploads.length} file(s) uploaded successfully`,
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    } else {
      onFileSelect?.(files);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error: any) => {
        let message = `Error with file ${file.name}: `;
        switch (error.code) {
          case 'file-too-large':
            message += `File is too large. Maximum size is ${formatFileSize(maxSize)}.`;
            break;
          case 'file-invalid-type':
            message += 'File type is not supported.';
            break;
          case 'too-many-files':
            message += `Too many files. Maximum is ${maxFiles}.`;
            break;
          default:
            message += error.message;
        }
        
        toast({
          title: "File Rejected",
          description: message,
          variant: "destructive",
        });
      });
    });

    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles);
    }
  }, [maxSize, maxFiles, autoUpload, metadata, onFileSelect, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive: dropzoneIsDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles,
    maxSize,
    multiple,
    disabled,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const retryUpload = async (index: number) => {
    const file = uploadedFiles[index];
    if (file && file.status === 'error') {
      try {
        setUploadedFiles(prev => 
          prev.map((f, i) => 
            i === index ? { ...f, status: 'uploading', progress: 0, error: undefined } : f
          )
        );

        const response = await uploadFile(file.file);

        setUploadedFiles(prev => 
          prev.map((f, i) => 
            i === index ? { ...f, status: 'success', progress: 100, response } : f
          )
        );

        toast({
          title: "Upload Successful",
          description: `${file.file.name} uploaded successfully`,
        });

        onUploadComplete?.([response]);
      } catch (error: any) {
        setUploadedFiles(prev => 
          prev.map((f, i) => 
            i === index 
              ? { 
                  ...f, 
                  status: 'error', 
                  progress: 0, 
                  error: error.response?.data?.message || 'Upload failed' 
                } 
              : f
          )
        );

        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.file.name}`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          "hover:border-primary/50 hover:bg-primary/5",
          dropzoneIsDragActive && "border-primary bg-primary/10",
          disabled && "opacity-50 cursor-not-allowed",
          "border-gray-300"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          {dropzoneIsDragActive ? 'Drop files here' : 'Choose files or drag and drop'}
        </p>
        <p className="text-sm text-gray-500">
          {accept && `Accepted formats: ${accept}`}
          {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
          {maxFiles > 1 && ` • Max files: ${maxFiles}`}
        </p>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((uploadedFile, index) => {
            const FileIcon = getFileIcon(uploadedFile.file.type);
            
            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50"
              >
                <FileIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  
                  {uploadedFile.status === 'uploading' && (
                    <Progress value={uploadedFile.progress} className="mt-1" />
                  )}
                  
                  {uploadedFile.status === 'error' && (
                    <p className="text-xs text-red-600 mt-1">
                      {uploadedFile.error}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {uploadedFile.status === 'success' && (
                    <span className="text-green-600 text-sm">✓</span>
                  )}
                  
                  {uploadedFile.status === 'error' && autoUpload && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => retryUpload(index)}
                    >
                      Retry
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
