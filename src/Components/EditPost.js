import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { format } from 'date-fns';
import api from '../api/post';
import {useNavigate} from 'react-router-dom';
import DataContext from '../context/dataContext';

const EditPost = () => {
    const[editTitle, setEditTitle] = useState('');
    const[editBody, setEditBody] = useState('');
    const {posts, setPosts} = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    }, [post, setEditTitle, setEditBody])


    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatePost = { id, title: editTitle, body: editBody, datetime };
        try {
          const response = await api.put(`/posts/${id}`, updatePost);
          setPosts(posts.map(post => post.id === id ? {...response.data} : post));
          setEditTitle('');
          setEditBody('');
          navigate('/');
        } catch (err) {
          console.log(`Error: ${err.message}`)
        }
      }
  return (
    <main className='NewPost'>
        {editTitle &&
        <>
            <h2>Edit Post</h2>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <input 
                    id='postTitle'
                    type='text'
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post: </label>
                <textarea
                id='postBody'
                type='textarea'
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                />
                <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>
        }
        {!editTitle &&
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing.</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditPost
