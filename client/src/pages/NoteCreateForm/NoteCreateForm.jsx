import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createNote } from "../../models/Note";
import "./NoteCreateForm.css";
import * as React from "react";
import Button from "@mui/material/Button";

export default function NoteCreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

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
    return navigate(`/creatednote/${id}`);
  };

  return (
    <>

      <div class="form-container">
        <Link to={"/"}>
          <Button className="backBtn" variant="outlined">
            Go back
          </Button>
        </Link>
        <h1>Vytvoření poznámky</h1>
        <form className="form">
          <input
            type="text"
            name="name"
            required
            placeholder="Enter name"
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
            <option value="Enter type"></option>
            <option value="Domácnost">Domácnost</option>
            <option value="Škola">Škola</option>
            <option value="Obecné">Obecné</option>
          </select>
          <input
            type="text"
            name="text"
            required
            placeholder="Enter text"
            onChange={(e) => handleChange(e)}
          />
          <button className="createBtn" onClick={handlePost}>
            Create note
          </button>
        </form>
      </div>
    </>
  );
}
