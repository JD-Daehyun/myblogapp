import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h3>JD MERN Blog App</h3>
      <ul>
        <Link to={'/'}>
        <li>Home</li>
        </Link>

        <Link to={'/add-blog'}>
        <li>Add Blog</li>
        </Link>

      </ul>
    </div>
  );
}
