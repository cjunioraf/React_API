import useHttp from '../hooks/useHttp'
import { useParams } from 'react-router-dom'

const PostViewer = () => {

    const {postId} = useParams();    
    //data: post - renomeando o DATA para post.
    const {data: post, error, loading} = useHttp(`https://jsonplaceholder.typicode.com/posts/${postId}`, "GET", null, [postId]);
    
  return (
    <div>
        <h1>Post: {postId}</h1>
        {loading && (<p>Carregando informações da API...</p>)}        
        {error && (<h2 style={{color: 'red'}}>{error}</h2> )}
        {post && (         
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>  
            </div>    
        )}
    </div>
  )
}

export default PostViewer