import { Link, useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../../models/Note";
import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import "./NoteView.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [isLoaded, setLoaded] = useState(false);
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

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (note.name) {
      const data = await deleteNote(id);
      if (data.status === 200) {
        navigate("/");
      } else {
        setInfo(data.msg);
      }
    } else {
      setInfo("Wrong input!");
    }
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
      <Link to={"/notes"}>
        <Button className="btnBack" variant="outlined">
          Go back
        </Button>
      </Link>
      <h1>Note view</h1>
      <h2>{note.name}</h2>
      <form>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          className="btnDelete"
          onClick={handleDelete}
        >
          Smazat poznámku
        </Button>
        <p>{info}</p>
      </form>
      <Link to={`/updatenote/${id}`}>
        <Button className="btnUpdate" variant="contained">
          Upravit poznámku
        </Button>
      </Link>
    </>
  );
}
