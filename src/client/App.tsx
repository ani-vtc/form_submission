import "./App.css";
import Form from "./components/form";
import Blog from "./components/blog";
import BlogPost from "./components/BlogPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
