import {Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/blog/:id" element={<ArticleDetailPage/>}/>
        <Route index path="/register" element={<RegisterPage/>}/>
      </Routes>
      </div>
  );
}

export default App;