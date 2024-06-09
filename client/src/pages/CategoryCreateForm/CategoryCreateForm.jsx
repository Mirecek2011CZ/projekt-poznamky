import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCategory } from "../../models/Category";

export default function CategoryCreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const category = await createCategory(formData);
    if (category.status === 201) {
      redirectToSuccessPage(category.payload._id);
    } else {
      setInfo(category.msg);
    }
  }
  
  const handleChange = (e) => {
    if (e.target.value !== "Enter type"){
      console.log(e.target.name)
      setFormData({...formData, [e.target.name]: e.target.value});
    }
    else{
      e.target.value = ""
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  }
  
  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  }

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdcategory/${id}`)
  }

  return (
    <>
      <h1>Category create form</h1>
      <form>
        <input type="text" name="category" required placeholder="Enter category" onChange={e => handleChange(e)}/>
        <button onClick={handlePost}>
          Create category
        </button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
