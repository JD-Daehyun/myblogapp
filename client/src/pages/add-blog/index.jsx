import { useContext } from "react";
import styles from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
export default function AddNewBlog() {
  const { formData, setFormData } = useContext(GlobalContext);

  console.log(formData);
  async function handleSaveBlogToDatabase() {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title : formData.title,
      description : formData.description,
    });

    const result = await response.data;
    console.log(result);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Add A Blog</h1>
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
        <button onClick={handleSaveBlogToDatabase}>Add New Blog</button>
      </div>
    </div>
  );
}
