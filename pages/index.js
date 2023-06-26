import { useState, useEffect } from 'react';
// import './App.css'
import axios from 'axios'
// import { error } from 'console';
import Styles from '@/styles/Home.module.css'

export default function BlogPostManagement() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  // Add event handlers for input fields

  //FETCH ALL BLOG POSTS
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('/api/getBlogPost');
      setBlogPosts(response.data);
    } catch (error) {
      console.error(error);
    }
    // console.log(response.data);
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
      console.log("not working")
    }
  };

  const handlerupdateBlogPost = async (id) => {
    try {
      await axios.patch(`/api/updateBlogPost?id=${id}`);
      const updateBLogPost = blogPosts.filter((post) => post._id !== id);
      setBlogPosts(updateBLogPost);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogPosts();
  }, []);


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
            <button onClick={() => handlerupdateBlogPost(post._id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

