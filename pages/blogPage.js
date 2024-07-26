import { useState, useEffect } from 'react';
import axios from 'axios';
// import Styles from '@/styles/Home.module.css';
import Styles from '@/styles/blogPage.module.css'
import Modal from './modal'; // Import the Modal component

export default function BlogPostManagement() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('/api/getBlogPost');
      setBlogPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createBlogPost = async () => {
    try {
      const response = await axios.post('/api/createBlogPost', {
        title,
        content,
        author,
      });
      setBlogPosts([...blogPosts, response.data]);
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlogPost = async (id) => {
    try {
      await axios.delete(`/api/deleteBlogPost?id=${id}`);
      const updatedPosts = blogPosts.filter((post) => post._id !== id);
      setBlogPosts(updatedPosts);
    } catch (error) {
      console.error(error);
      console.log("not working");
    }
  };

  const handlerupdateBlogPost = async (id) => {
    try {
      const response = await axios.patch(`/api/updatePost?id=${id}`, {
        title: editTitle,
        content: editContent,
        author: editAuthor,
      });
      const updatedPosts = blogPosts.map((post) =>
        post._id === id ? response.data : post
      );
      setBlogPosts(updatedPosts);
      setEditPostId('');
      setEditTitle('');
      setEditContent('');
      setEditAuthor('');
      setIsModalOpen(false); // Close the modal after updating
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const openModal = (post) => {
    setEditPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditAuthor(post.author);
    setIsModalOpen(true);
  };

  return (
    <div className={Styles.homePage}>
      <h1>Blog Post Management</h1>
      <div className={Styles.formArea}>
        {/* Create Post Form */}
        <form onSubmit={createBlogPost}>
          <div>
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              cols="30"
            />
          </div>
          <button className={Styles.btn} type="submit">Create Post</button>
        </form>
      </div>

      {/* Blog Post List */}
      <h2>All Blog Posts</h2>
      <div className={Styles.allBlogs}>
        {blogPosts.map((post) => (
          <div className={Styles.blogs} key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <button onClick={() => deleteBlogPost(post._id)}>Delete</button>
            <button onClick={() => openModal(post)}>Edit</button>
          </div>
        ))}
      </div>

      {/* Edit Post Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={Styles.formArea}>
          <h2>Edit Blog Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlerupdateBlogPost(editPostId);
            }}
          >
            <div>
              <label>Title: </label>
              <input
                type="text"
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Author</label>
              <input
                type="text"
                placeholder="Author"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Content</label>
              <textarea
                placeholder="Content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="6"
                cols="30"
                required
              />
            </div>
            <button className={Styles.btn} type="submit">
              Update Post
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
