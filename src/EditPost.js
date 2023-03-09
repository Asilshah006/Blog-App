import React, { useContext } from 'react'
import { useEffect , useState } from 'react';
import { useParams , Link } from 'react-router-dom';
import api from './api/Posts';
import DataContext from './context/DataContext';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

const EditPost = () => {
  const[editTitle , setEditTitle] = useState("");
  const[editBody , setEditBody] = useState('');
  const { posts , setPosts } = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id)
    const history = useHistory();
    
  const handleEdit = async (id) =>{
    const datetime = format(new Date() , "MMMM dd, yyyy pp");
    const UpdatedPost = {id , title : editTitle , datetime , body : editBody};

    try{
      const response = api.put(`/Posts/${id}` , UpdatedPost)
      setPosts(posts.map(post =>
        (post.id) === id ? {...response.data} : post
      ))
      setEditTitle('');
      setEditBody('');
      history.push('/');
    }catch(err){
      console.log(`Error : ${err.message}` );
    }
  }

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    } , [post , setEditTitle , setEditBody])

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