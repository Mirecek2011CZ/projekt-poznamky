import { Link, useParams } from "react-router-dom";

export default function CreatedCategory() {
  const { id } = useParams();  

  return (
    <>
      <p>Created category: { id }</p>
      <Link to={`/category/${id}`}>
        <p>View category</p>
      </Link>
      <Link to={"/"}>
        <p>Go home</p>
      </Link>
    </>
  );
}
