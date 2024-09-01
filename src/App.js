import Header from './Components/Header';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';
import About from './Components/About';
import Missing from './Components/Missing';
import { useEffect } from 'react';
import useAxiosFetch from './Hooks/useAxiosFetch';
import { Routes, Route } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';


function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => {
        setPosts(data);
    }, [data, setPosts])

  return (
    <div className='App'>
        <Header title="React JS Blog"/>
          <Nav />
          <Routes>
            <Route path="/" 
              element={<Home 
                    isLoading={isLoading} 
                    fetchError={fetchError}/>} 
            />
            <Route path="/post" element={<NewPost/>} />
            <Route path="/edit/:id" element={<EditPost/>} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        <Footer />
    </div>
  );
}

export default App;
