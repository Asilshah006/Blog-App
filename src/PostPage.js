import React, { useContext } from 'react'
import { useParams , Link } from 'react-router-dom'
import DataContext from './context/DataContext';
import api from './api/Posts'
import {useHistory} from 'react-router-dom';

const PostPage = () => {
  const {posts , setPosts} = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id );
  const history = useHistory();
  const handleDelete = async (id) => {
    await api.delete(`/Posts/${id}`);
    const PostList = posts.filter(post => post.id !== id );
    setPosts(PostList);
    history.push('/');
  }

  return (
    <main>
        <article className='postPage'>
          {post &&
            <>
            <h2>{post.title}</h2>
            <p>{post.dateTime}</p>
            <p>{post.body}</p>
            <Link to={`/edit/${id}`}><button>EditPost</button></Link>
            <button onClick={()=> handleDelete(post.id)}>Delete Post</button>
            </>
          }
          {!post && 
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
          
        </article>
    </main>
  )
}

export default PostPage