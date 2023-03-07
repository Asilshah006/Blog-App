import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { format } from "date-fns";
import {Route , Switch , useHistory} from 'react-router-dom';
import { useState , useEffect } from "react";


function App() {
  
  const[search ,setSearch] =useState('');
  const [posts , setPosts] = useState([
    {
      id :1,
      title : "My First Post",
      datetime : "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sequi ipsa exercitationem reprehenderit asperiores iure nulla ratione dolorem provident atque impedit facere nostrum, sapiente temporibus iusto itaque unde adipisci beatae."
    },
    {
      id :2,
      title : "My Second Post",
      datetime : "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sequi ipsa exercitationem reprehenderit asperiores iure nulla ratione dolorem provident atque impedit facere nostrum, sapiente temporibus iusto itaque unde adipisci beatae."
    },
    {
      id :3,
      title : "My Third Post",
      datetime : "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sequi ipsa exercitationem reprehenderit asperiores iure nulla ratione dolorem provident atque impedit facere nostrum, sapiente temporibus iusto itaque unde adipisci beatae."
    },
    {
      id :4,
      title : "My Fourth Post",
      datetime : "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sequi ipsa exercitationem reprehenderit asperiores iure nulla ratione dolorem provident atque impedit facere nostrum, sapiente temporibus iusto itaque unde adipisci beatae."
    },
  ])
  
  const [searchResults , setSearchResults] = useState([]);
  const[postTitle , setpostTitle] = useState('');
  const[postBody , setpostBody] = useState('');
  const history = useHistory();


  const handleDelete = (id) => {
    const PostList = posts.filter(post => post.id !== id );
    setPosts(PostList);
    history.push('/');
  }
  
  const handleSubmit = () =>{
    const id = posts.length ? posts[posts.length -1].id + 1 : 1
    const datetime = format(new Date(),  "MMMM dd, yyyy pp");
    const newPost = {id ,title :postTitle , datetime , body:postBody} 
    const allPost = [...posts , newPost];
    setPosts(allPost)
    setpostTitle('');
    setpostBody('');
    history.push('/')
  }
  
  useEffect(()=>{
    const filteredResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        ||((post.title).toLowerCase()).includes(search.toLowerCase())
              )
  
              setSearchResults(filteredResults.reverse())
  }, [posts , search])
  return (
    <div className="App">
      <Header title = "React Js Blogs" />
      <Nav search ={search} setSearch ={setSearch} />
      <Switch>

        <Route exact path="/">
          <Home 
            posts = {posts}/>
        </Route>

       <Route exact path="/post">
          <NewPost
            handleSubmit = {handleSubmit}
            postTitle = {postTitle}
            setpostTitle = {setpostTitle}
            postBody = {postBody}
            setpostBody = {setpostBody}
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
      <Footer />

    </div>
  );
}

export default App;
