import { Link, useParams } from "react-router-dom";

export default function CreatedNote() {
  const { id } = useParams();  

  return (
    <>
      <p>Created note: { id }</p>
      <Link to={`/note/${id}`}>
        <p>View note</p>
      </Link>
      <Link to={"/"}>
        <p>Go home</p>
      </Link>
    </>
  );
}
