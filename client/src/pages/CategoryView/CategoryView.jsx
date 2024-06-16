import { Link, useParams, useNavigate } from "react-router-dom";
import { getCategory, deleteCategory } from "../../models/Category";
import { useState, useEffect } from "react";

export default function CategoryView() {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getCategory(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCategory(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (category.name === formData) {
      const data = await deleteCategory(id);
      if (data.status === 200) {
        navigate("/");
      } else {
        setInfo(data.msg);
      }
    } else {
      setInfo("Wrong input!");
    }
  }

  if (isLoaded === null) {
    return (
      <>
        <p>Category not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Category is loading...</p>
      </>
    )
  }

  return (
    <>
    
      <h1>Category view</h1>
      <p>{id}</p>
      <p>{category.name}</p>
      <form>
        <input type="text" placeholder={category.name} onChange={handleChange} />
        <button onClick={handleDelete}>Delete</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatecategory/${id}`}>
        <p>Update category</p>
      </Link>
      <Link to={"/"}>
        <p>Zpět</p>
      </Link>
    </>
  );
}
