"use client"

import { useEffect, useState } from "react"
import "@/css/posts/index.css"

type Post = {
    _id: string,
    title: string,
    content: string,
    author: string,
    tags: string[],
    likes: number,
    createdAt: string,
    updatedAt: string
}

export default function Posts() {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {

        async function fetchPosts() {
            
            const result = await fetch(`/api/post`)
            const data = await result.json()

            setPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <div className="posts-container">
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post._id} className="post-card">
                    <p>ID: {post._id.toString()}</p>
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-content">{post.content}</p>
                    
                    <div className="post-meta">
                        <p><strong>Author:</strong> {post.author.toString()}</p>
                    </div>
                    <div>
                        <p><strong>Created:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <p><strong>Updated:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
                    </div>

                    <div>
                        {post.tags && post.tags.map((tag, index) => (
                            <span key={index} className="post-tag">#{tag}</span>
                        ))}
                    </div>

                    <p className="post-likes">❤ {post.likes} Likes</p>
                </div>
            ))}
        </div>
    )
}