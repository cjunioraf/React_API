import {useState, useEffect} from 'react'
import axios from 'axios';
import PostForm from './PostForm';

const PostManager = () => {

    const [posts, setPosts ] = useState([]);
    const [error, setError ] = useState("");
    //saber qual post está sendo editado - selectPost
    const [selectPost, setSelectPost] = useState(null);
    //controla em que momento estou editando true ou false
    const [isEditing, setIsEditing] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    //função que retorna sucesso no componente PostForm, add - adicionar   
    const handleSuccess = (post, operation) => {
        //add - CRIAR NOVO POST PARA API
        if(operation === "add"){
            //currentPost - POST já existentes na API 
            setPosts((currentPost) => [post, ...currentPost])                
        }
        else if(operation === "update"){
            //para atualizar - update utiliza sempre o MAP 
            setPosts((currentPost) => currentPost.map((p) => p.id === post.id ? post : p));            
            handlePost(post, false, false);
        }         
        else if(operation === "delete"){
            //console.log ("operation === delete");
            setPosts((currentPost) => currentPost.filter((p) => p.id !== post.id));   
            handlePost(null, false, false);                
        }
    }

    useEffect(() => {
        //Função
        const axiosPost = async() => {
            try{
                const resposta = await axios.get("https://jsonplaceholder.typicode.com/posts");                
                //slice limita a quantidade de objeto que vem da API, no exemplo abaixo 5  
                setPosts(resposta.data.slice(0, 5));
            }
            catch (error) {
                setError(error.message)                    
            }
        } 

        axiosPost();

    }, [])

    const handlePost = (post, edit, del) => {
        setIsEditing(edit);
        setSelectPost(post);    
        setIsDelete(del);    
    } 

  return (
    <div>
        <h1>Gerenciar Posts</h1>
        <PostForm post={(isEditing || isDelete) ? selectPost : null} isDelete={isDelete} onSuccess={handleSuccess} />
        {isEditing == true &&  <button onClick={() => handlePost(null, false, false)} >Cancelar Edição</button>  }        
        <h2>Postagens</h2>        
        {posts.map((post) => (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>  
                <button onClick={() => handlePost(post, true, false)}>Editar Post</button>   
                <button onClick={() => handlePost(post, false, true)}>Deletar Post</button>
            </div>                        
        ))}

    </div>
  )
}

export default PostManager