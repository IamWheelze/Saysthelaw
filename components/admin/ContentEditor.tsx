'use client';

import { useState } from 'react';
import { Article } from '@/types';
import { saveArticle } from '@/lib/services/dataService';

export default function ContentEditor() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<any>('Human Rights');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('Saysthelaw Team');
  const [countries, setCountries] = useState('');
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Human Rights',
    'Police & Security',
    'Courts & Justice',
    'Labour & Employment',
    'Elections & Democracy',
    'Women & Children',
    'Environment',
    'Business & Commerce',
  ];

  const handleTitleChange = (value: string) => {
    setTitle(value);
    // Auto-generate slug
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    setSaving(true);

    const article: Article = {
      id: Date.now().toString(),
      title: title.trim(),
      slug: slug.trim(),
      description: excerpt.trim() || title.substring(0, 155),
      content: content.trim(),
      author: author.trim() || 'Saysthelaw Team',
      publishedDate: new Date().toISOString(),
      category: category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      countries: countries.split(',').map(c => c.trim().toUpperCase()).filter(Boolean),
      featured: featured,
      readTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
      seo: {
        title: title.trim() + ' | Saysthelaw',
        description: excerpt.trim() || title.substring(0, 155),
        keywords: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        ogImage: imageUrl.trim(),
      },
    };

    // Save using data service
    saveArticle(article);

    setTimeout(() => {
      setSaving(false);
      alert('Article published successfully! View it at /articles/' + slug);
      // Reset form
      setTitle('');
      setSlug('');
      setContent('');
      setExcerpt('');
      setTags('');
      setImageUrl('');
    }, 500);
  };

  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || placeholder;

    let newText = '';
    if (syntax === 'link') {
      newText = `[${selectedText}](url)`;
    } else if (syntax === 'image') {
      newText = `![alt text](${selectedText || 'image-url'})`;
    } else if (syntax === 'bold') {
      newText = `**${selectedText}**`;
    } else if (syntax === 'italic') {
      newText = `*${selectedText}*`;
    } else if (syntax === 'heading') {
      newText = `## ${selectedText}`;
    } else if (syntax === 'list') {
      newText = `- ${selectedText}`;
    } else if (syntax === 'quote') {
      newText = `> ${selectedText}`;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Article</h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Enter article title"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug (auto-generated)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50"
            placeholder="article-url-slug"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL: /articles/{slug || 'your-article-slug'}
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Author and Countries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Saysthelaw Team"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Countries (comma-separated codes: KE,NG,ZA)
            </label>
            <input
              type="text"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="KE, NG, GH"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Short Description)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Brief summary of the article..."
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
            Mark as featured article (will appear on homepage)
          </label>
        </div>

        {/* Markdown Toolbar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (Markdown supported) *
          </label>
          <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded">
            <button
              type="button"
              onClick={() => insertMarkdown('bold', 'bold text')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('italic', 'italic text')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('heading', 'Heading')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="Heading"
            >
              H
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('link', 'link text')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="Link"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('image')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="Image"
            >
              🖼️
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('list', 'list item')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="List"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('quote', 'quote text')}
              className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              title="Quote"
            >
              "
            </button>
          </div>
          <textarea
            id="content-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
            placeholder="Write your article content here...

You can use Markdown formatting:
- **bold text**
- *italic text*
- ## Headings
- [links](url)
- ![images](url)
- > quotes
"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="law, rights, justice"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={!title || !content || saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Publish Article'}
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
          >
            Save Draft
          </button>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Articles are saved locally in your browser.
            In production, these would be saved to a database via API.
          </p>
        </div>
      </div>
    </div>
  );
}
