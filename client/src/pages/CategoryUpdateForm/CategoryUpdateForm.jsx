import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCategory, getCategory } from "../../models/Category";

export default function CategoryUpdateForm() {
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
  };

  const postForm = async () => {
    const category = await updateCategory(id, formData);
    if (category.status === 200) {
      navigate(`/category/${id}`);
    } else {
      setInfo(category.msg);
    }
  };

  const handleChange = (e) => {
    if (e.target.value !== "Enter type"){
      console.log(e.target.name)
      setFormData({...formData, [e.target.name]: e.target.value});
    }
    else{
      e.target.value = ""
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Category not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Category is loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Upravit kategorii</h1>
      <p>{id}</p>
      <form>
        <input
          type="text"
          defaultValue={category.name}
          name="name"
          required
          placeholder="Enter category name"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Update category</button>
      </form>
      <Link to={"/"}>
        <p>Zpět</p>
      </Link>
    </>
  );
}
