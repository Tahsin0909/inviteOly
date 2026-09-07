/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { AlertCircle, Trash2Icon, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export const ImageNode: React.FC<NodeViewProps> = ({
  node,
  selected,
  editor,
  deleteNode,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const imageSrc = node.attrs.src;
  const isUploadedImage = imageSrc && typeof imageSrc === "string";

  const imageUploadExt = editor.extensionManager.extensions.find(
    (ext) => ext.name === "imageUpload"
  );
  const onDelete = imageUploadExt?.options?.onDelete;

  // Auto-close popover when image is deselected
  useEffect(() => {
    if (!selected && openPopover) {
      setOpenPopover(false);
    }
  }, [selected, openPopover]);

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle image deletion
  const handleDelete = useCallback(async () => {
    if (isDeleting) return;

    if (!imageSrc || !onDelete) {
      deleteNode();
      setOpenPopover(false);
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await onDelete(imageSrc);
      deleteNode();
      setOpenPopover(false);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to delete image";
      setError(errorMsg);
      setIsDeleting(false);
    }
  }, [imageSrc, onDelete, deleteNode, isDeleting]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle image error
  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setError("Failed to load image. Please check the image URL.");
  }, []);

  return (
    <NodeViewWrapper
      as="div"
      className="relative inline-block max-w-full"
      data-drag-handle
    >
      {/* Error notification */}
      {error && (
        <div className="absolute -top-12 left-0 right-0 mx-auto w-max bg-red-500/90 text-white px-3 py-2 rounded-md flex items-center gap-2 text-sm z-50 shadow-lg">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-2 hover:bg-red-600/50 p-0.5 rounded transition-colors"
            aria-label="Dismiss error"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div
        className={`relative inline-block transition-all ${
          selected ? "ring-2 ring-blue-500 ring-offset-2 rounded-md" : ""
        }`}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        )}

        <img
          ref={imgRef}
          src={imageSrc}
          alt={node.attrs.alt || "Image"}
          title={node.attrs.title}
          className="max-w-full h-auto rounded-md"
          draggable={false}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Delete button - only show if image is selected and has upload handler */}
        {selected && isUploadedImage && onDelete && (
          <Button
            variant={"outline"}
            className="absolute top-2 right-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            title="Delete image"
            aria-label="Delete image"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            <Trash2Icon size={18} />
          </Button>
        )}
      </div>
    </NodeViewWrapper>
  );
};
