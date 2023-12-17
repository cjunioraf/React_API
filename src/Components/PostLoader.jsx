import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PostLoader = () => {

    const [post, setPost] = useState(null);
    const [loding, setLoding] = useState(false);
    const [msgerror, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");
    
    const {postId} = useParams();

    useEffect(() => {

        const fetchPost = async() => {

            setLoding(true);  
            setMsgSuccess("");
            setMsgError("");
            
            try {

                if(postId > 500){
                    setPost(null);
                    throw new Error("Post não existe!");
                }    

                //const resposta = await axios.get(`https://jsonplaceholder.typicode.com/pos`);                
                const resposta = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);   
                setPost(resposta.data);                                    
                setMsgSuccess("Informação carregada com sucesso!");
            }
            catch(error) {
                setMsgError('Falha ao carregar API: ' + error.message);                 
                setLoding(false);                 
            }    
            finally{                
                setLoding(false);                
            }
        } 

        fetchPost();

    }, [postId])

  return (
    <div>
        <h1>Post: {postId}</h1>

        {loding && (<p>Carregando informações da API...</p>)}        
        {msgerror && (<h2 style={{color: 'red'}}>{msgerror}</h2> )}
        {msgSuccess && (<h2 style={{color: 'green'}}>{msgSuccess}</h2> )}
        {post && (         
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>  
            </div>    
        )}
    </div>
  )
}

export default PostLoader