import { useEffect , useState } from "react";
import axios from "axios";

const useAxiosFetchAPI = (dataurl) =>{
    const [data , setData] =useState([]);
    const [fetchError , setFetchError] = useState(null);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const FetchAPI = async (url) =>{
            setIsLoading(true);
            try{
                const response = await axios.get(url ,{
                    CancelToken : source.cancel()
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            }finally{
                {isMounted && setTimeout(()=> setIsLoading(false) , 2000)}
            }   
        }
        FetchAPI(dataurl);

        const cleanUp = () =>{
            console.log("Clean up Something")
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    },[dataurl])

    return {data , fetchError , isLoading}
}

export default useAxiosFetchAPI;