'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../axios';

const Edit = () => {
  interface Post {
    id: number;
    title: string;
    content: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();


  useEffect(() => {
    setLoading(true); 
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/authposts');
        console.log('Posts res:', response);
        setPosts(response.data);

      } catch (err) {
        console.log('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    try {
      const response = await axios.post('/api/posts', {
        title: newPostTitle,
        content: newPostContent,
      });
      setPosts([...posts, response.data]);
      setIsAddPostModalOpen(false);
    } catch (err) {
      console.log('Error adding post:', err);
    }
  };

  const handleEditPost = async () => {
    try {
      const response = await axios.put(`/api/posts/${editPostId}`, {
        title: editPostTitle,
        content: editPostContent,
      });
      console.log('Edit response:', response);
      setPosts(
        posts.map((post) =>
          post.id === editPostId ? { ...post, title: editPostTitle, content: editPostContent } : post
        )
      );
      setIsEditPostModalOpen(false);
    } catch (err) {
      console.log('Error editing post:', err);
    }
  };

  const handleDeletePost = async () => {
    try {
      console.log('Delete post ID:', deletePostId);
      const response = await axios.delete(`/api/posts/${deletePostId}`);
      console.log('Delete response:', response);
      if (response.status === 204) {
        setPosts(posts.filter((post) => post.id !== deletePostId));
    }
      setIsDeleteConfirmModalOpen(false);
    } catch (err) {
      console.log('Error deleting post:', err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
    <h1 className="text-4xl font-semibold text-center text-white mb-6">Manage Posts</h1>

    <div className="flex justify-between mb-4">
      <button
        onClick={() => router.push('/dashboard')}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
      <button
        onClick={() => setIsAddPostModalOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Add New Post
      </button>
    </div>


    {loading ? (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    ) : (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-300">{post.content}</p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => {
                                setIsEditPostModalOpen(true);
                                setEditPostId(post.id);
                                setEditPostTitle(post.title);
                                setEditPostContent(post.content);
                            }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setIsDeleteConfirmModalOpen(true);
                                setDeletePostId(post.id);
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )}
      {isAddPostModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
            <div className="mb-4">
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full p-2 bg-gray-700 text-white rounded-lg mb-2"
              />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Post Content"
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleAddPost}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddPostModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Pop-up  */}
      {isEditPostModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
            <div className="mb-4">
              <input
                type="text"
                value={editPostTitle}
                onChange={(e) => setEditPostTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full p-2 bg-gray-700 text-white rounded-lg mb-2"
              />
              <textarea
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
                placeholder="Post Content"
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleEditPost}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditPostModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Pop-up  */}
      {isDeleteConfirmModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Are you sure you want to delete this post?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeletePost}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setIsDeleteConfirmModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
