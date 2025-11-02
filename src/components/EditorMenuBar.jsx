import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Code2,
} from "lucide-react";

const EditorMenuBar = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const buttonClass = (active) =>
    `p-2.5 rounded-lg transition-all duration-200 ${
      active
        ? "bg-indigo-100 text-indigo-700 shadow-sm"
        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
    }`;

  return (
    <div className="border-b border-gray-200 bg-linear-to-r from-gray-50 to-white px-4 py-3">
      <div className="flex flex-wrap gap-1">
        <div className="flex gap-1">
          <button
            className={buttonClass(editor.isActive("bold"))}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("italic"))}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("underline"))}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("strike"))}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={18} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        <div className="flex gap-1">
          <button
            className={buttonClass(editor.isActive("heading", { level: 1 }))}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("heading", { level: 2 }))}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("heading", { level: 3 }))}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={18} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        <div className="flex gap-1">
          <button
            className={buttonClass(editor.isActive({ textAlign: "left" }))}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive({ textAlign: "center" }))}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive({ textAlign: "right" }))}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={18} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        <div className="flex gap-1">
          <button
            className={buttonClass(editor.isActive("bulletList"))}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("orderedList"))}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={18} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        <div className="flex gap-1">
          <button
            className={buttonClass(editor.isActive("blockquote"))}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("code"))}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("codeBlock"))}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code2 size={18} />
          </button>
          <button
            className={buttonClass(editor.isActive("link"))}
            onClick={addLink}
          >
            <Link2 size={18} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        <div className="flex gap-1">
          <button
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
            className={`p-2.5 rounded-lg ${
              editor.can().undo()
                ? "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <Undo size={18} />
          </button>
          <button
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
            className={`p-2.5 rounded-lg ${
              editor.can().redo()
                ? "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <Redo size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorMenuBar;
