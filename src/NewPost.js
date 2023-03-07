import React from 'react'

const NewPost = ({handleSubmit , postTitle , setPosttitle , postBody , setPostbody}) => {
  return (
    <main className='PostForm'>
        <h1>NewPost</h1>

        <form className='newPost' onSubmit={(e)=> e.preventDefault()}>
          <label htmlFor="postTitle">Post Title : </label>
          <input
            id='postTitle' 
            type="text" 
            placeholder = 'Post Title'
            value={postTitle}
            onChange = {(e)=> setPosttitle(e.target.value)} />

            <label htmlFor="postBody">Post Body :</label>
            <textarea 
            name="postbody" 
            id="postBody" 
            cols="30" 
            rows="10"
            placeholder='Enter Your Blog Text Here ...'
            value={postBody}
            onChange = {(e) => setPostbody(e.target.value)}>

            </textarea>
        </form>

        <button type='submit'>Submit</button>
    </main>
  )
}

export default NewPost