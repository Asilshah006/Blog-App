import React from 'react'

const NewPost = ({handleSubmit , postTitle , setPostTitle , postBody , setPostBody}) => {

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