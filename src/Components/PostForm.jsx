import {useEffect, useState} from 'react'

import axios from 'axios'

const PostForm = ({onSuccess, post, isDelete}) => {
  //post"?" - pois o post pode ser NULL  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(post?.title || "");
    setBody(post?.body || "");
  }, [post]) 

  const handleSubmit = async(e) => {

    e.preventDefault();
    const newpost = {title, body, userId:1};

    try{
      //se vem o "post" é pq estou editando, então quero atualizar a API 
      if(post){        
        //console.log(isDelete)
        if(isDelete) {
          await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
          onSuccess(post, "delete");            
        }
        else{
          const resposta = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, newpost);
          onSuccess(resposta.data, "update");
        }
      }
      else{
        //INSERINDO DADOS PARA API
        const resposta = await axios.post("https://jsonplaceholder.typicode.com/posts", newpost);
        onSuccess(resposta.data, "add");
      }
    }
    catch (error) {
      //setError(error.message)    
      console.log('Erro ao enviar Post.', error)                
    }

    setTitle("");
    setBody("");
    
  } 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="text" 
          value={title} 
          placeholder='Digite o Título' 
          onChange={(e) => setTitle(e.target.value)} 
        />   
      </div> 
      <div>
        <textarea 
          type="textarea" 
          value={body} 
          placeholder='Digite o conteúdo...' 
          onChange={(e) => setBody(e.target.value)} 
        />
      </div>        
      
      {isDelete && <p>Confirmar que deseja DELETAR postagem?</p>}           
      <button type='submit'>Confirmar</button>
      
    </form>
  )
}

export default PostForm