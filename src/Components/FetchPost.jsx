import { useState, useEffect } from "react"

const FetchPost = () => {

    const [posts, setPosts ] = useState([]);
    const [error, setError ] = useState("");

    //JSON placeholder (id, title, body)

    useEffect(() => {
        //Função
        const fetchPosts = async() => {
            try{

                const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
                const dados = await resposta.json();
                setPosts(dados);
            }
            catch (error) {
                setError(error.message)                    
            }
        } 

        fetchPosts();

    }, [])

  return (
    <div>
        <h1>Post (Fetch API)</h1>
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

export default FetchPost


// {error ? (<p>Erro: {error}</p>) 
//                : (posts.map((post) => (
//                 <div> 
//                     <h2>{post.title}</h2>

//                 </div>
//                 ) )) }