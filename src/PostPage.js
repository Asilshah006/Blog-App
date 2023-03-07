import React from 'react'
import { useParams , Link } from 'react-router-dom'

const PostPage = ({posts , handleDelete}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id );

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