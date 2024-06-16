import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createCategory } from "../../models/Category";
import "./CategoryCreateForm.css";
import * as React from "react";
import Button from "@mui/material/Button";

export default function CategoryCreateForm() {
  const [formData, setFormData] = useState({});
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const category = await createCategory(formData);
    if (category.status === 201) {
      redirectToSuccessPage(category.payload._id);
    } else {
      setInfo(category.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdcategory/${id}`);
  };

  return (
    <>
      <div id="CategoryCreateForm">
        <h1>Vytvoření kategorie</h1>
        <form>
          <input
            type="text"
            name="category"
            required
            placeholder="Název kategorie"
            onChange={(e) => handleChange(e)}
          />
          <div className="buttonContainer">
            <Button
              onClick={handlePost}
              className="btnCreate"
              variant="contained"
            >
              Vytvořit kategorii
            </Button>
          </div>
        </form>
      </div>
      <Link to={"/"}>
        <Button className="backBtn" variant="outlined">
          Zpět
        </Button>
      </Link>
    </>
  );
}
