import React from 'react'
import { useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import Posts from './api/Posts';

const EditPost = (
    { posts , handleEdit , editTitle , setEditTitle , editBody , setEditBody }
    ) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    } , [posts , setEditTitle , setEditBody])
  return (
    <main className='PostForm'>
        { editTitle &&
        <>
            <h1 style={{
                marginLeft : "10px"}
            }>EditPost</h1>
            
            <form className='newPost' onSubmit={(e)=> e.preventDefault()} action="/">
            <label htmlFor="postTitle">Post Title : </label>
            <input
                id='postTitle' 
                type="text" 
                placeholder = 'Post Title'
                value={editTitle}
                onChange = {(e)=> setEditTitle(e.target.value)} />

                <label htmlFor="postBody">Post Body :</label>
                <textarea 
                name="postbody" 
                id="postBody" 
                cols="30" 
                rows="10"
                placeholder='Enter Your Blog Text Here ...'
                value={editBody}
                onChange = {(e) => setEditBody(e.target.value)}>
                </textarea>
            
            <button onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
    </>
    }
    {!editTitle && 
        <>
          <h2>Post Not Found</h2>
          <p>Well , That's disappointing</p>
          <p>
            <Link to ='/'>
              Return to Home
            </Link>
          </p>
        </>
      }
    </main>
  )
}

export default EditPost