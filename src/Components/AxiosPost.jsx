import { useState, useEffect } from "react"

import axios from "axios";

const AxiosPost = () => {

    const [posts, setPosts ] = useState([]);
    const [error, setError ] = useState("");

    //JSON placeholder (id, title, body)

    useEffect(() => {
        //Função
        const axiosPost = async() => {
            try{
                const resposta = await axios.get("https://jsonplaceholder.typicode.com/posts");                
                setPosts(resposta.data);
            }
            catch (error) {
                setError(error.message)                    
            }
        } 

        axiosPost();

    }, [])

  return (
    <div>
        <h1>Post (Axios API)</h1>
        {error ? (<p>Erro: {error}</p>) 
               : (posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>                        
                )))
        }
        
    </div>
  )
}

export default AxiosPost
