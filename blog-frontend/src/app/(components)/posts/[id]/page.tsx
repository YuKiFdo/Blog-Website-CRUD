'use client';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useParams, useRouter } from 'next/navigation';

const PostDetail = () => {
  interface Post {
    title: string;
    content: string;
    created_by: string;
    created_at: string;
    user: {
      name: string;
    }
  }

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { id: postId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Error fetching post details');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 space-y-6">
        <button
          onClick={() => router.push('/posts')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Posts
        </button>
        
        <h1 className="text-4xl font-extrabold">{post?.title}</h1>
        
        <div className="mt-4 text-gray-300">
          <p>{post?.content}</p>
        </div>

        <div className="flex justify-between mt-6">
          <div>
            <p className="text-sm text-gray-500">Created by: {post?.user?.name}</p>
            <p className="text-sm text-gray-500">Created on: {post?.created_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
