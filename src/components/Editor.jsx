import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline as UnderlineExtension } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link as LinkExtension } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import MenuBar from "./EditorMenuBar";
import { forwardRef, useImperativeHandle } from "react";

const Editor = forwardRef(({ content, onChange }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  useImperativeHandle(ref, () => ({
    clearContent: () => {
      editor?.commands.clearContent();
    },
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden w-full">
      <MenuBar editor={editor} />

      <div
        className="p-8 cursor-text"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="prose prose-lg max-w-none min-h-[500px] focus:outline-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-4xl prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mb-3
                prose-h3:text-2xl prose-h3:mb-2
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700
                [&_.ProseMirror]:min-h-[500px]
                [&_.ProseMirror]:outline-none
                [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
                [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400
                [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
                [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
                [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
        />
      </div>
    </div>
  );
});

export default Editor;
