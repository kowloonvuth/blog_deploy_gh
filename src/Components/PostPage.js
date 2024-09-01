import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import api from '../api/post';
import DataContext from '../context/dataContext';

const PostPage = () => {
  const {posts, setPosts} = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`,)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className='PostPage'>
        <article className='post'>
          {post && 
            <>
              <h2>{post.title}</h2>
              <p className='postData'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <Link to={`/edit/${id}`}><button className='editButton'>Edit Post</button></Link>
              <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                Delete Post
              </button>
            </>
          }
        </article>
    </main>
  )
}

export default PostPage
