import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateNote, getNote } from "../../models/Note";
import CategoryLink from "../CategoryList/CategoryLink";
import { getCategories } from "../../models/Category";
import Button from "@mui/material/Button";
import "./NoteUpdateForm.css"

export default function NoteUpdateForm() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadedCategories, setLoadedCategories] = useState(false);
  const [categories, setCategories] = useState();
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getNote(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setNote(data.payload);
      setLoaded(true);
    }
  };

  const load_categories = async () => {
    const data = await getCategories();
    if (data.status === 500 || data.status === 404)
      return setLoadedCategories(null);
    if (data.status === 200) {
      console.log(data.payload);
      setCategories(data.payload);
      setLoadedCategories(true);
    }
  };

  useEffect(() => {
    load_categories();
    load();
  }, []);

  if (isLoadedCategories === null) {
    console.log(1111111);
    return <></>;
  }

  if (!isLoadedCategories) {
    console.log(222222);
    return <></>;
  }

  const postForm = async () => {
    const note = await updateNote(id, formData);
    if (note.status === 200) {
      navigate(`/notes`);
    } else {
      setInfo(note.msg);
    }
  };

  const handleChange = (e) => {
    if (e.target.value !== "Enter type") {
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

  if (isLoaded === null) {
    return (
      <>
        <p>Note not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Note is loading...</p>
      </>
    );
  }

  return (
    <>
      <div id="NoteUpdateForm">
        <h1>Úprava poznámky</h1>
        
        <form>
          <input
            type="text"
            defaultValue={note.name}
            name="name"
            required
            placeholder="Enter note name"
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
            <option value = "">Výběr kategorie</option>
            <option value="Domácnost">Domácnost</option>
            <option value="Škola">Škola</option>
            <option value="Obecné">Obecné</option>
            {categories.map((category, index) => (
              <option value={`${categories[index].category}`}>
                <CategoryLink key={index} {...category} />
              </option>
            ))}
          </select>
          <input
            type="text"
            defaultValue={note.text}
            name="text"
            required
            placeholder="Enter text"
            onChange={(e) => handleChange(e)}
          />
          <button className="updateBtn" onClick={handlePost}>Upravit poznámku</button>
        </form>
      </div>
      <Link to={`/`}>
        <Button className="backBtn" variant="outlined">
          Zpět
        </Button>
      </Link>
    </>
  );
}
