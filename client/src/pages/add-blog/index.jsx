import { useContext } from "react";
import styles from "./styles.module.css";
import { GlobalContext } from "../../context";

export default function AddNewBlog() {
  const { formData, setFormData } = useContext(GlobalContext);


  console.log(formData);
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
        <button >Add New Blog</button>
      </div>
    </div>
  );
}
