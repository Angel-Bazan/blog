import "./App.css";
import { useState } from 'react';
import Blogs from "./components/blogs";
import Navbar from './components/navbar';


function App() {
  const [view, setView] = useState('blogs')
  return (
    <div className="App">
     <Navbar setView={setView}/>
     {view==='blogs'&& < Blogs />} 
    </div>
  );
}

export default App;
