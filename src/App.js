import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from "./EditPost";
import api from "./api/Posts";
import { format } from "date-fns";
import {Route , Switch , useHistory} from 'react-router-dom';
import { useState , useEffect } from "react";


function App() {
  
  const[search ,setSearch] =useState('');
  const [posts , setPosts] = useState([])
  const [searchResults , setSearchResults] = useState([]);
  const[postTitle , setPostTitle] = useState("");
  const[postBody , setPostBody] = useState('');
  const[editTitle , setEditTitle] = useState("");
  const[editBody , setEditBody] = useState('');
  const history = useHistory();

  useEffect(()=>{
    const fetchRequest = async () =>{
      try{
        const response = await api.get('/Posts');
        setPosts(response.data);
      }catch(err){
        if(err.data){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }else{
          console.log(`Error ${err.message}`);
        }
      }
    } 

    fetchRequest();
    
  },[])
  
  useEffect(()=>{
    const filteredResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        ||((post.title).toLowerCase()).includes(search.toLowerCase())
              )
  
        setSearchResults(filteredResults.reverse())
  }, [posts , search])

  const handleDelete = async (id) => {
    await api.delete(`/Posts/${id}`);
    const PostList = posts.filter(post => post.id !== id );
    setPosts(PostList);
    history.push('/');
  }
  
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

  const handleSubmit = async () =>{
   
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
    <div className="App">
      <Header title = "React Js Blogs" /> 
      <Nav search ={search} setSearch ={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home 
            posts = {searchResults}/>
        </Route>

       <Route exact path="/post">
          <NewPost
            handleSubmit = {handleSubmit}
            postTitle = {postTitle}
            setPostTitle = {setPostTitle}
            postBody = {postBody}
            setPostBody = {setPostBody}
          />
      </Route>
       <Route exact path="/edit/:id">
          <EditPost
            posts={posts}
            handleEdit = {handleEdit}
            editTitle = {editTitle}
            setEditTitle = {setEditTitle}
            editBody = {editBody}
            setEditBody = {setEditBody}
          />
      </Route>

      <Route exact path="/post/:id" >
        <PostPage 
          posts={posts}
          handleDelete = {handleDelete}
        />
      </Route>

      <Route path="/about" component={About} />
      <Route path= "*" component={Missing}/>     
      
      </Switch>
      
      <button onClick={ ()=>{
        setPostTitle("hello");
        setPostBody("Testing");
        handleSubmit();
      }}>Button
      </button>

      <p>{postTitle}</p>


      <Footer />


    </div>
  );
}

export default App;
