import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import styles from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navgiate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;
    // console.log(result)
    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    // console.log(getCurrentId)
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  function handleEdit(getCurrentItem) {
    navgiate("/add-blog", { state: { getCurrentItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h3>Pending...Please Wait</h3>
      ) : (
        <div className={styles.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem.id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Yet!</h3>
          )}
        </div>
      )}
    </div>
  );
}
