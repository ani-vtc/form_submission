import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./BlogPost.css";

interface BlogMetadata {
    title: string;
    date: string;
    author?: string;
    image?: string;
    tags?: string[];
}

interface RelatedPost {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
}

// Simple frontmatter parser that works in the browser
function parseFrontmatter(text: string): { data: BlogMetadata; content: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = text.match(frontmatterRegex);

    if (!match) {
        return { data: { title: "", date: "" }, content: text };
    }

    const frontmatterText = match[1];
    const content = match[2];

    const data: any = {};
    frontmatterText.split("\n").forEach((line) => {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length > 0) {
            let value: string | string[] = valueParts.join(":").trim();
            // Remove quotes if present
            value = value.replace(/^["']|["']$/g, "");
            // Parse arrays
            if (value.startsWith("[") && value.endsWith("]")) {
                value = value
                    .slice(1, -1)
                    .split(",")
                    .map((v: string) => v.trim().replace(/^["']|["']$/g, ""));
            }
            data[key.trim()] = value;
        }
    });

    return { data: data as BlogMetadata, content };
}

function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState("");
    const [metadata, setMetadata] = useState<BlogMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);

    useEffect(() => {
        const loadBlogPost = async () => {
            try {
                setLoading(true);
                setError(false);

                // Fetch the markdown file from public folder
                const response = await fetch(`/blogs/${slug}.md`);
                if (!response.ok) throw new Error("Blog post not found");

                const text = await response.text();
                const { data, content: markdownContent } = parseFrontmatter(text);

                setMetadata(data);
                setContent(markdownContent);

                // Load related posts
                loadRelatedPosts();

                setLoading(false);
            } catch (err) {
                console.error("Error loading blog post:", err);
                setError(true);
                setLoading(false);
            }
        };

        if (slug) {
            loadBlogPost();
        }
    }, [slug]);

    const loadRelatedPosts = async () => {
        // Sample related posts - in a real app, you'd fetch these based on tags or categories
        const related: RelatedPost[] = [
            {
                slug: "sample-post-1",
                title: "Blog Title",
                excerpt: "Lorem ipsum dolor amet, consectetuer adipiscing elit...",
                image: "/placeholder-blog.jpg"
            },
            {
                slug: "sample-post-2",
                title: "Blog Title",
                excerpt: "Lorem ipsum dolor amet, consectetuer adipiscing elit...",
                image: "/placeholder-blog.jpg"
            },
            {
                slug: "sample-post-3",
                title: "Blog Title",
                excerpt: "Lorem ipsum dolor amet, consectetuer adipiscing elit...",
                image: "/placeholder-blog.jpg"
            }
        ];
        setRelatedPosts(related);
    };

    if (loading) {
        return (
            <div className="blog-post-container">
                <div className="blog-post-loading">Loading...</div>
            </div>
        );
    }

    if (error || !metadata) {
        return (
            <div className="blog-post-container">
                <div className="blog-post-error">
                    <h2>Blog post not found</h2>
                    <Link to="/blog" className="back-link">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-post-container">
            <div className="blog-post-logo">
                <Link to="/">VTCo</Link>
            </div>

            <div className="blog-post-header">
                <Link to="/blog" className="back-link">← Back to Blog</Link>
            </div>

            <article className="blog-post-article">
                <header className="blog-post-title-section">
                    <h1>{metadata.title}</h1>
                    {metadata.date && (
                        <div className="blog-post-meta">
                            <span className="blog-post-date">{metadata.date}</span>
                            {metadata.author && (
                                <>
                                    <span className="meta-divider">•</span>
                                    <span className="blog-post-author">{metadata.author}</span>
                                </>
                            )}
                        </div>
                    )}
                </header>

                {metadata.image && (
                    <div className="blog-post-hero-image">
                        <img src={metadata.image} alt={metadata.title} />
                    </div>
                )}

                <div className="blog-post-content">
                    <ReactMarkdown
                        components={{
                            h2: ({ children }) => (
                                <h2 className="section-header">{children}</h2>
                            ),
                            img: ({ src, alt }) => (
                                <div className="content-image">
                                    <img src={src} alt={alt} />
                                </div>
                            ),
                            p: ({ children }) => <p className="content-paragraph">{children}</p>,
                            ul: ({ children }) => <ul className="content-list">{children}</ul>,
                            ol: ({ children }) => <ol className="content-list">{children}</ol>,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <section className="related-posts">
                    <h2>Check out more related articles below</h2>
                    <div className="related-posts-grid">
                        {relatedPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="related-post-card"
                            >
                                <div className="related-post-image">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="related-post-content">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <span className="related-post-link">Readmore →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default BlogPost;
