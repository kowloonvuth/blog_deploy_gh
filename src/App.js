import Header from './Components/Header';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';
import About from './Components/About';
import Missing from './Components/Missing';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/dataContext';


function App() {
  return (
    <div className='App'>
        <Header title="React JS Blog"/>
        <DataProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<NewPost/>} />
            <Route path="/edit/:id" element={<EditPost/>} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </DataProvider>
        <Footer />
    </div>
  );
}

export default App;
