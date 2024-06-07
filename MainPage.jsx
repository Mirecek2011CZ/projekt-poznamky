import "./MainPage.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <h1>Notebooks</h1>

      <Link to={"/createnote"}>
        <p>Create note</p>
      </Link>
      <Link to={"/notes"}>
        <p>Notes</p>
      </Link>
    </>
  );
}