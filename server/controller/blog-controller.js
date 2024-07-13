const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//fetch a list of blogs
//add a new blog
//delete a blog
//update a blog
//These are four controllers we need for the blog

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }

  if (!blogList) {
    //404 Error
    return res.status(404).json({ message: "No Blogs Found" });
  }
  //200 Ok
  return res.status(200).json(blogList);
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });
  try {
    await new newlyCreatedBlog.save();
  } catch (e) {
    console.log(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    return res.status(200).message({ message: "Deleted!" });
  } catch (e) {
    console.log(e);
    return res.staus(500).json({ message: "Unable To Delete! Try Again" });
  }
};
