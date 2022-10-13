import "./App.css";
import { useState } from 'react';
import Blogs from "./components/blogs";
import Navbar from './components/navbar';
import Favorite from './components/favorite'
import Form from './components/form'


function App() {
  const [view, setView] = useState('home')
  return (
    <div className="App">
     <Navbar setView={setView}/>
     {view === 'home' && <Blogs />}
     {view === 'blogs'&& < Form />} 
     {view === 'favorite' && <Favorite />}
    </div>
  );
}

export default App;
