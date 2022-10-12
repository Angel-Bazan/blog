const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');
const bodyParser = require("body-parser")

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// create the get request
app.get('/api/blog', cors(), async (req, res) => {
  try {
    const { rows: blog } = await db.query('SELECT * FROM blog');
    res.send(blog);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get('/api/join', cors(), async (req, res) => {
  try {
    const { rows: blog } = await db.query('SELECT blog.title, blog.blurb, blog.content, users.firstName FROM blog LEFT JOIN users ON blog.users_id = users.id ORDER BY blog.id DESC');
    res.send(blog);
  }catch (e) {
    return res.status(400).json({ e });
  }
})

//getting infromation specific to id 
app.get('/api/blog/:blogId', cors(), async (req,res) => {
  try{
  //req.param what you're getting from your url 
    const blogId = req.params.blogId;
    const getId = await db.query(`SELECT * FROM blog WHERE id=${blogId}`);
    console.log("blogId", blogId.rows);
    res.send(getId.rows);
  } catch (e) {
    return res.send(400).json({e});
  }
  
})

// create the POST request
app.post('/api/blog', cors(), async (req, res) => {
  const newBlog = {
    title: req.body.title,
    blurb: req.body.blurb,
    content: req.body.content, 
    img: req.body.img, 
  };
  console.log([newBlog.title, newBlog.blurb]);
  const result = await db.query(
    'INSERT INTO blog(title, blurb, content, img) VALUES($1, $2, $3, $4) RETURNING *',
    [newBlog.title, newBlog.blurb, newBlog.content, newBlog.img],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

app.delete('/api/blog/:blogId',  async (req, res) => {
  const blogId = req.params.blogId;
  console.log(contactId);
  try{
  await db.query('DELETE FROM blog WHERE id=$1', [blogId]);
  res.send({ status: "success" });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ e });
  }
})

app.put('/api/blog/:blogId', cors(), async (req, res) => {
  const blogId = req.params.blogId;
  const updatedBlog = { id: req.body.id, title: req.body.title, blurb: req.body.blurb, content: req.body.content, img: req.body.img}
  const query = 'UPDATE blog SET  title=$1, blurb=$2, content=$3, img=$4 WHERE id=$5 RETURNING *';
  const values = [updatedBlog.title, updatedBlog.blurb, updatedBlog.content, updatedBlog.img, blogId];
  try{
    const updated = await db.query(query, values); 
    console.log('updated', updated);
    res.send(updated);
  } catch (e){
    console.log('error', e);
    return res.status(400).json({e});
  }
})
// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
