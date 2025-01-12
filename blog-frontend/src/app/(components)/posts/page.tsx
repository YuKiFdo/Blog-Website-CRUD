'use client';
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useRouter } from 'next/navigation';

const PostsMain = () => {
  interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [search, setSearch] = useState<string>(''); 
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data); 
      } catch (err: any) {
        console.log('Posts fetch error:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered); 
    } else {
      setFilteredPosts(posts); 
    }
  }, [search, posts]);

  const handleClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center mb-8 text-white">Posts</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search posts by title..."
              className="px-4 py-2 rounded-lg w-full sm:w-1/2 md:w-1/3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <div className="flex justify-start mb-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.length === 0 ? (
              <p className="text-white text-center col-span-full">No posts found</p>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  onClick={() => handleClick(post.id)}
                >
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                    <p className="mt-2 text-gray-300">{truncateContent(post.content)}</p>
                    <p className="mt-2 text-sm text-gray-400">Posted on: {formatDate(post.created_at)}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-700 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        router.push(`/posts/edit/${post.id}`);
                      }}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostsMain;
