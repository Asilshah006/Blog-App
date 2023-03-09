import { createContext , useEffect , useState } from "react";
import useAxiosFetchAPI from "../api/hooks/UseAxiosFetchAPI";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    
  const[search ,setSearch] =useState('');
  const [posts , setPosts] = useState([])
  const [searchResults , setSearchResults] = useState([]);
  const {data , fetchError , isLoading} = useAxiosFetchAPI("http://localhost:3500/Posts");

  useEffect(()=>{
        setPosts(data);
  },[data])
  
  useEffect(()=>{
    const filteredResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        ||((post.title).toLowerCase()).includes(search.toLowerCase())
              )
  
        setSearchResults(filteredResults.reverse())
  }, [posts , search])

  
  

   return(
    <DataContext.Provider value={{
        search , setSearch ,
        searchResults , fetchError , isLoading, posts, setPosts,
    }}>
        {children}
    </DataContext.Provider>
   )
}

export default DataContext