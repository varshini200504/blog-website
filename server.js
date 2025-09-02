import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
const app = express();
const port = 3000;

let posts = [];

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
  res.render("index", {posts});
});
app.get("/new", (req, res) => {
  res.render("new" );
});

app.post("/posts", (req, res) => {
  const {title, content} = req.body;
  posts.push({ id: Date.now(), title, content, date: new Date().toDateString() });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', {post});
});

app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if(post){
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/");
});

app.delete('/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.get('/view/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if(!post){
    return res.status(404).send('post not found');
  }else{
    res.render('view', {post});
  }
});


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


