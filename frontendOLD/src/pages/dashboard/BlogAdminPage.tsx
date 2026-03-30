
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { blogApi, BlogPost, CreateBlogDTO } from '@/services/blog.service';
import BlogList from '@/components/blog/BlogList';
import BlogEditor from '@/components/blog/BlogEditor';

export default function BlogAdminPage() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<CreateBlogDTO>>({
    title: '',
    content: '',
    status: 'draft',
  });

  const queryClient = useQueryClient();

  // Fetch Posts
  const { data: postsData, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => blogApi.listPosts(),
  });

  // Fetch Categories
  const { data: categoriesData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => blogApi.categories(),
  });

  const posts = postsData?.data?.results || [];
  const categoriesRaw = categoriesData?.data;
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : (categoriesRaw?.results || []);

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: CreateBlogDTO) => blogApi.createPost(data),
    onSuccess: () => {
      toast.success('Blog post created successfully');
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setView('list');
      setFormData({ title: '', content: '', status: 'draft' });
    },
    onError: () => toast.error('Failed to create blog post'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateBlogDTO> }) => 
      blogApi.updatePost(id, data),
    onSuccess: () => {
      toast.success('Blog post updated successfully');
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setView('list');
      setCurrentPost(null);
    },
    onError: () => toast.error('Failed to update blog post'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogApi.deletePost(id),
    onSuccess: () => {
      toast.success('Blog post deleted');
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
    onError: () => toast.error('Failed to delete blog post'),
  });

  // Handlers
  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      status: post.status,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
    });
    setView('edit');
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    const payload = {
        ...formData,
        // Ensure default values
        status: formData.status || 'draft',
        title: formData.title || '',
        content: formData.content || '',
    } as CreateBlogDTO;

    if (view === 'create') {
      createMutation.mutate(payload);
    } else if (view === 'edit' && currentPost) {
      updateMutation.mutate({ id: currentPost.id, data: payload });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground mt-1">
            {view === 'list' 
              ? 'Manage your blog posts and updates' 
              : view === 'create' 
                ? 'Create a new blog post' 
                : 'Edit blog post'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {view !== 'list' && (
            <Button variant="outline" onClick={() => setView('list')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
          )}
          
          {view === 'list' ? (
            <Button onClick={() => {
                setFormData({ title: '', content: '', status: 'draft' });
                setView('create');
            }}>
              <Plus className="mr-2 h-4 w-4" /> Create Post
            </Button>
          ) : (
             <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
              <Save className="mr-2 h-4 w-4" /> 
              {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Post'}
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {view === 'list' && (
        <BlogList 
          posts={posts} 
          isLoading={isLoading} 
          onEdit={handleEdit} 
          onDelete={(id) => deleteMutation.mutate(id)} 
        />
      )}

      {(view === 'create' || view === 'edit') && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="grid gap-6 p-6 bg-white rounded-lg border border-gray-200">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Post Title</label>
              <Input 
                placeholder="Enter post title" 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-lg font-semibold"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Status</label>
                    <select 
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Category</label>
                    <select 
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.category_id || ''}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium">Excerpt (Optional)</label>
                 <Input 
                    placeholder="Short summary for cards..." 
                    value={formData.excerpt || ''} 
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium">Featured Image</label>
                <div className="flex items-center gap-4">
                    {formData.featured_image && (
                        <img 
                            src={formData.featured_image} 
                            alt="Preview" 
                            className="h-20 w-20 object-cover rounded-md border border-gray-200"
                        />
                    )}
                    <div className="flex-1">
                         <Input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    try {
                                        const toastId = toast.loading('Uploading image...');
                                        const response = await blogApi.uploadImage(file);
                                        // Use url from response or fallback to local object URL
                                        const url = response.data?.url || URL.createObjectURL(file);
                                        setFormData(prev => ({ ...prev, featured_image: url }));
                                        toast.dismiss(toastId);
                                        toast.success('Image uploaded');
                                    } catch (err) {
                                        toast.error('Upload failed, using local preview');
                                        setFormData(prev => ({ ...prev, featured_image: URL.createObjectURL(file) }));
                                    }
                                }
                            }}
                        />
                         <p className="text-xs text-muted-foreground mt-1">Upload a cover image for the blog post.</p>
                    </div>
                </div>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Content</label>
              <BlogEditor 
                content={formData.content || ''} 
                onChange={(content) => setFormData({ ...formData, content })} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
