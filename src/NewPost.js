import React, { useContext } from 'react'
import DataContext from './context/DataContext'
import { useState } from 'react'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'
import api from './api/Posts'

const NewPost = () => {
    const {posts , setPosts} = useContext(DataContext)
    const[postTitle , setPostTitle] = useState("");
    const[postBody , setPostBody] = useState('');
    const {history} = useHistory();
    
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1
    const datetime = format(new Date(),  "MMMM dd, yyyy pp");
    const newPost = {id , title: postTitle , datetime , body: postBody} 

    try{
        const response = await api.post("/Posts" , newPost)
        const allPost = [...posts , response.data];
        setPosts(allPost)
        setPostTitle('');
        setPostBody('');
        history.push('/');
    }catch(err){
      console.log(err.message);
    }
}
  
    return (
    <main className='PostForm'>
        <h1 style={{
          marginLeft : "10px"}
          }>NewPost</h1>

        <form className='newPost' onSubmit={handleSubmit} action="/">
          <label htmlFor="postTitle">Post Title : </label>
          <input
            id='postTitle' 
            type="text" 
            placeholder = 'Post Title'
            value={postTitle}
            onChange = {(e)=> setPostTitle(e.target.value)} />

            <label htmlFor="postBody">Post Body :</label>
            <textarea 
            name="postbody" 
            id="postBody" 
            cols="30" 
            rows="10"
            placeholder='Enter Your Blog Text Here ...'
            value={postBody}
            onChange = {(e) => setPostBody(e.target.value)}>
            </textarea>
        
        <button type='submit'>Submit</button>
        </form>

    </main>
  )
}

export default NewPost