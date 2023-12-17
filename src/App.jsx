import './App.css'
import AxiosPost from './Components/AxiosPost'
import FetchPost from './Components/FetchPost'

import {Routes, Route, Link} from 'react-router-dom'
import PostManager from './Components/PostManager'
import PostLoader from './Components/PostLoader'

function App() {
  
  return (
    <>
      {/* 1 - GET com Fetch e Axios */}
      <nav>
        <ul>
          <li><Link to="/fetchpost">Fetch Post API</Link></li>
          <li><Link to="/axiospost">Axios Post API</Link></li>
        </ul>
        {/* 2 - Requisições Axios POST, UPDATE e PUT */}
        <div>
          <Link to="/posts"> Gerenciar Posts</Link>
        </div>
        {/* 3 - Tratamento de erros */}       
        <div>
          <Link to="/post/2"> Carregar Post 2</Link>
          <Link to="/post/999"> Carregar Post 999</Link>
        </div> 

      </nav>
      <Routes>
         {/* 1 - GET com Fetch e Axios */}
        <Route path='/fetchpost' element={<FetchPost />} />        
        <Route path='/axiospost' element={<AxiosPost />} />
        {/* 2 - Requisições Axios POST, UPDATE e PUT */}
        <Route path='/posts' element={<PostManager/>} />
        {/* 3 - Tratamento de erros */}
        <Route path='/post/:postId' element={<PostLoader />} />

      </Routes>
      
    </>
  )
}

export default App
