import { Image as TiptapImage } from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNode } from "./image-node";

/**
 * Custom Image extension that uses a NodeView for delete functionality
 * This extension wraps the default Tiptap Image extension and adds:
 * - Custom NodeView for image rendering
 * - Delete button with popover confirmation
 * - Integration with image delete mutation
 */
export const CustomImage = TiptapImage.extend({
  // Use custom NodeView instead of default rendering
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
}).configure({
  // Allow base64 encoded images
  allowBase64: true,
  // Add default HTML attributes
  HTMLAttributes: {
    class: "rounded-lg",
  },
});
