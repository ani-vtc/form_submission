import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    tags: string[];
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "sample-post-1",
        title: "Blog title text",
        excerpt: "Lorem ipsum dolor amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh...",
        image: "/placeholder-blog.jpg",
        tags: ["Best Sellers", "Post", "Readmore"]
    },
    {
        id: 2,
        slug: "sample-post-2",
        title: "Understanding Modern Web Development",
        excerpt: "In today's rapidly evolving digital landscape, understanding modern web development practices is essential for building robust applications...",
        image: "/placeholder-blog.jpg",
        tags: ["Categories", "Post"]
    },
    {
        id: 3,
        slug: "sample-post-3",
        title: "The Power of Visual Thinking",
        excerpt: "Visual thinking transforms complex ideas into clear, actionable insights. This cognitive approach leverages our brain's natural ability...",
        image: "/placeholder-blog.jpg",
        tags: ["Readmore", "Categories"]
    }
];

const allTags = ["Schools", "Vancouver", "BC"];

function Blog() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="blog-container">
            <div className="blog-logo">VTCo</div>

            <div className="blog-hero">
                <div className="blog-hero-content">
                    <div className="blog-eyebrow">RESOURCES</div>
                    <h1>Knowledge you can put to work</h1>
                    <p>
                        From civiv data frameworks to product updates - our resources help planners, policymakers and communities make sense of complex systems   
                    </p>
                </div>
            </div>

            <div className="blog-content">
                <div className="blog-filters">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="blog-search"
                    />
                    <div className="blog-tags">
                        <button
                            className={`tag-btn ${!selectedTag ? 'active' : ''}`}
                            onClick={() => setSelectedTag(null)}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="blog-grid">
                    {filteredPosts.map(post => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                            <div className="blog-card-image">
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className="blog-card-content">
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <span className="read-more">Read More →</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="no-results">
                        <p>No blog posts found matching your criteria.</p>
                    </div>
                )}

                <div className="show-more">
                    <button className="show-more-btn">Show more →</button>
                </div>
            </div>
        </div>
    );
}

export default Blog;
