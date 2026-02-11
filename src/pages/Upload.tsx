"use client";
import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState, type DragEvent } from "react";
import PrivateLayout from "../layout/private";
import { useUpload } from "../hooks/upload";

const MAX_CAPTION_LENGTH = 100;

export default function UploadPage() {
  const { uploadMedia } = useUpload();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const setImageFromFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const firstFile = files[0];
    if (!firstFile.type.startsWith("image/")) {
      return;
    }

    setSelectedFile(firstFile);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setCaption("");
    setIsDragging(false);
    setIsUploading(false);
    setIsUploadSuccess(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setImageFromFiles(event.dataTransfer.files);
  };

  const handleSubmit = async () => {
    if (!selectedFile || isUploading) {
      return;
    }

    try {
      setIsUploading(true);
      const uploaded = await uploadMedia(selectedFile, caption);
      if (uploaded) {
        setIsUploadSuccess(true);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <PrivateLayout>
      <div className="mx-auto h-full w-full bg-white px-4 pt-4 pb-24">
        <h1 className="text-lg font-semibold text-gray-900">Upload</h1>

        {isUploadSuccess ? (
          <div className="mt-6 space-y-4">
            <p className="text-base text-gray-900">Upload Succeed!</p>
            <a
              href="/news-feed"
              className="block w-full rounded-lg bg-[#614dc7] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Back to Newsfeed
            </a>
            <button
              type="button"
              onClick={resetUploadForm}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800"
            >
              Upload Another
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => setImageFromFiles(event.target.files)}
          />

          <div
            role="button"
            tabIndex={0}
            className={`flex min-h-72 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-3 transition-colors ${
              isDragging
                ? "border-[#614dc7] bg-indigo-50"
                : "border-gray-300 bg-gray-50"
            }`}
            onClick={openFilePicker}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openFilePicker();
              }
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selected upload"
                draggable
                className="max-h-80 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <ImagePlus className="h-9 w-9" />
                <p className="text-sm">Click or drag image here</p>
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="caption" className="text-sm font-medium text-gray-700">
                Caption
              </label>
              <span className="text-xs text-gray-500">
                {caption.length}/{MAX_CAPTION_LENGTH}
              </span>
            </div>
            <textarea
              id="caption"
              rows={4}
              value={caption}
              placeholder="Write a caption..."
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#614dc7]"
              onChange={(event) =>
                setCaption(event.target.value.slice(0, MAX_CAPTION_LENGTH))
              }
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile || isUploading}
            className="w-full rounded-lg bg-[#614dc7] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        )}
      </div>
    </PrivateLayout>
  );
}
