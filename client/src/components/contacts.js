import { useState, useEffect } from "react";
import Form from "./form";
import { API_URL } from "../constants";

const Blogs = () => {
  const [blog, SetBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [id, setId] = useState(-1); //by default you are not editing anything so id -1; 

  const addBlog = (newBlog) => {
    SetBlog((blog) => [...blog, newBlog]);
  };
  const deleteBlog = async (deleteId) => {
    await fetch(`${API_URL}/api/blog/${deleteId}`, {
      method: "DELETE",
    });

    await getBlog();
  };
  const editBlog = async () => {
    await fetch(`${API_URL}/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title, blurb, content, img}),
    });

    await getBlog();
    setId(-1); //that is the function you call when you click the edit button and are done editing 
  };

  const getBlog = async () => {
    const response = await fetch(`${API_URL}/api/blog`);
    const blog = await response.json();
    SetBlog(blog);
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <section className="blog container">
      <h2 className="list-of-blogs">List of Blogs</h2>
      <ul id="blog" className="row justify-content-md-center list-unstyled">
        {blog.map((blog, index) => {
          return (
            <li key={index} className="col col-sm-4 mb-3">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <br />
                  <strong>Title:</strong>
                  {blog.title}
                  <br />
                  <strong>Blurb:</strong>
                  {blog.blurb} <br />
                  <strong>Content:</strong>
                  {blog.content}
                  <br />
                  <strong>img:</strong>
                  {<img width='400px' src={blog.img} alt={blog.alt}></img>}
                  <br />
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setTitle(blog.title);
                      setBlurb(blog.blurb);
                      setContent(blog.content);
                      setImg(blog.img);
                      setId(blog.id) //This will update to a non negative id value 
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </span>
                  </button>
                  <br />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className ={ id=== -1 ? "d-none" : "d-block"}>
        
        <label htmlFor="edit-blog-title">Title</label>
        <input
          id="edit-blog-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <label htmlFor="edit-blog-blurb">Blurb</label>
        <input
          id="edit-blog-blurb"
          type="text"
          value={blurb}
          onChange={(e) => {
            setBlurb(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <label htmlFor="edit-blog-content">Content</label>
        <input
          id="edit-blog-content"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <label htmlFor="edit-blog-image">Image</label>
        <input
          id="edit-blog-image"
          type="image"
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        
        <button className="btn btn-primary" onClick={editBlog}>Update User</button>
      </div>
      <Form addBlog={addBlog} />
    </section>
  );
};

export default Blogs;
