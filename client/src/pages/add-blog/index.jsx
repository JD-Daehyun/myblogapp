import { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function AddNewBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(formData);
  async function handleSaveBlogToDatabase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.getCurrentItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;
    // console.log(result);
    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    // console.log(location)
    if (location.state) {
      const { getCurrentItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentItem.title,
        description: getCurrentItem.description,
      });
    }
  }, [location]);

  return (
    <div className={styles.wrapper}>
      <h1>{isEdit ? "Edit Blog" : "Add Blog"}</h1>
      <div className={styles.formWrapper}>
        <input
          name="input"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(event) =>
            setFormData({
              ...formData,
              title: event.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit Blog" : "Add New Blog"}
        </button>
      </div>
    </div>
  );
}
