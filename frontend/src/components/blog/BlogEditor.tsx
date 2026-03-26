
import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { blogApi } from '@/services'; 
import { Upload, ImageIcon, Link as LinkIcon, Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Code } from 'lucide-react';
import { toast } from 'sonner';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  isLoading?: boolean;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ content, onChange, isLoading }) => {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Add your description here...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 bg-transparent text-gray-800 dark:text-gray-200',
      },
    },
  });

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true);
      const response = await blogApi.uploadImage(file);
      // Assuming backend returns { url: '...' }
      if (response.data?.url) {
        editor?.chain().focus().setImage({ src: response.data.url }).run();
      } else {
          // Fallback if backend not ready - create local URL for preview
          const url = URL.createObjectURL(file);
          editor?.chain().focus().setImage({ src: url }).run();
      }
    } catch (error) {
      toast.error('Failed to upload image. Using local preview.');
        // Fallback
        const url = URL.createObjectURL(file);
        editor?.chain().focus().setImage({ src: url }).run();
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await uploadImage(file);
      }
    };
    input.click();
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-700/50 rounded-lg overflow-hidden bg-[#0d1117] text-white">
      <Tabs defaultValue="write" className="w-full">
        <div className="px-4 pt-2 border-b border-gray-700 bg-[#0d1117] flex justify-between items-center">
            <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
                value="write" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#fd8c73] data-[state=active]:text-white text-gray-400 rounded-none px-4 py-2"
            >
                Write
            </TabsTrigger>
            <TabsTrigger 
                value="preview" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#fd8c73] data-[state=active]:text-white text-gray-400 rounded-none px-4 py-2"
            >
                Preview
            </TabsTrigger>
            </TabsList>
            <div>
                 {/* Formatting Toolbar */}
                 {editor && (
                    <div className="flex items-center gap-1.5 mr-4 text-gray-400">
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                        >
                            <Heading1 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('bold') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                            title="Bold (Ctrl+B)"
                        >
                            <Bold className="h-4 w-4" />
                        </button>
                         <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('italic') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                            title="Italic (Ctrl+I)"
                        >
                            <Italic className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('blockquote') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                        >
                            <Quote className="h-4 w-4" />
                        </button>
                         <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('codeBlock') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                        >
                            <Code className="h-4 w-4" />
                        </button>
                         <button
                            onClick={setLink}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('link') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </button>
                         <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('bulletList') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                        >
                            <List className="h-4 w-4" />
                        </button>
                         <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`p-1 hover:bg-gray-800 rounded ${editor.isActive('orderedList') ? 'bg-gray-800 text-blue-400' : ''}`}
                            type="button"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleImageClick}
                            className="p-1 hover:bg-gray-800 rounded"
                            type="button"
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <span className="animate-spin h-4 w-4 border-2 border-gray-400 rounded-full border-t-transparent" />
                            ) : (
                                <ImageIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                 )}
            </div>
        </div>

        <TabsContent value="write" className="m-0 p-0">
          <div className="bg-[#0d1117] min-h-[300px]">
             <EditorContent editor={editor} className="min-h-[300px]" />
          </div>
          <div className="bg-[#0d1117] border-t border-gray-700 p-2 text-xs text-gray-500 flex justify-end items-center gap-2">
            <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-400">Markdown is supported</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-400">
                <Upload className="h-3 w-3" />
                <span onClick={handleImageClick}>Paste, drop, or click to add files</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="m-0 p-4 bg-[#0d1117]">
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogEditor;
