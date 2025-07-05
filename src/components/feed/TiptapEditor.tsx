'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  BoldIcon,
  ItalicIcon,
  Heading1Icon,
  Heading2Icon,
  ListOrderedIcon
} from '@/components/icons/EditorIcons';
import { ListBulletIcon } from '@heroicons/react/24/solid';

const TiptapToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md bg-gray-50 p-1 flex flex-wrap items-center gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        title="Bold"
      >
        <BoldIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        title="Italic"
      >
        <ItalicIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1.5 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        title="Heading 1"
      >
        <Heading1Icon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        title="Heading 2"
      >
        <Heading2Icon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        title="Bullet List"
      >
        <ListBulletIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        title="Ordered List"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

interface TiptapEditorProps {
  content: string;
  onChange: (richText: string) => void;
  placeholder?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none w-full h-[250px] border border-gray-200 rounded-b-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto'
      },
    },
  });

  // Update editor content when content prop changes (e.g. when emoji is added)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="editor-container">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
      <style jsx>{`
        .editor-container :global(.ProseMirror) {
          height: 100%;
          min-height: 250px;
          max-height: 250px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor; 