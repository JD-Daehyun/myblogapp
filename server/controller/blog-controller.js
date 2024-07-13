const mongoose = require('mongoose');
const Blog = require('../model/Blog')

//fetch a list of blogs
//add a new blog
//delete a blog
//update a blog
//These are four controllers we need for the blog

const fetchListOfBlogs = async(req,res) =>{
    let blogList;
    try{
        blogList = await Blog.find();
    }catch(e){
        console.log(e)
    }

    if(!blogList){
        //404 Error
        return res.status(404).json({message: 'No Blogs Found'})
    }
    //200 Ok
    return res.status(200).json(blogList)
}