import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createNote } from "../../models/Note";
import CategoryLink from "../CategoryList/CategoryLink";
import { getCategories } from "../../models/Category";
import "./NoteCreateForm.css";
import * as React from "react";
import Button from "@mui/material/Button";

export default function NoteCreateForm() {
  const [categories, setCategories] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  
  const load = async () => {
    const data = await getCategories();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      console.log(data.payload)
      setCategories(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    console.log(1111111)
    return (
      <>
      </>
    )
  }

  if (!isLoaded) {
    console.log(222222)
    return (
      <>
      </>
    )
  }

  const postForm = async () => {
    const note = await createNote(formData);
    if (note.status === 201) {
      redirectToSuccessPage(note.payload._id);
    } else {
      setInfo(note.msg);
    }
  };

  const handleChange = (e) => {
    if (e.target.value !== "Enter type") {
      console.log(e.target.name);
      console.log(e.target.value);
      console.log(  )
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/notes`);
  };

  return (
    <>
  <div id="noteCreate">
      <div class="form-container">

        <h1>Vytvoření poznámky</h1>
        <form className="form">
          <input
            type="text"
            name="name"
            required
            placeholder="Název poznámky"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="date"
            name="date"
            required
            placeholder="Enter date"
            onChange={(e) => handleChange(e)}
          />
          <select
            type="text"
            name="type"
            onChange={(value) => handleChange(value)}
          >
            <option value = ""></option>
            <option value = "Domácnost">Domácnost</option>
            <option value = "Škola">Škola</option>
            <option value = "Obecné">Obecné</option>
            {
              categories.map((category, index) => (
                <option value={`${categories[index].category}`}><CategoryLink key={index} {...category} /></option>
              ))
            }
          </select>
          <input
            type="text"
            name="text"
            required
            placeholder="Text"
            onChange={(e) => handleChange(e)}
          />
          <button className="createBtn" onClick={handlePost}>
            Vytvořit poznámku
          </button>
        </form>
      </div>
      <Link to={"/"}>
          <Button className="backBtn" variant="outlined">
            Zpět
          </Button>
        </Link>
        </div>
    </>
  );
}
