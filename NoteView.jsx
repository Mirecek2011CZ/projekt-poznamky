import { Link, useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../../models/Note";
import { useState, useEffect } from "react";

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
  }

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (note.name === formData) {
      const data = await deleteNote(id);
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
        <p>Note not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Note is loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Note view</h1>
      <p>{id}</p>
      <p>{note.name}</p>
      <p>{note.date}</p>
      <p>{note.type}</p>
      <p>{note.text}</p>
      <form>
        <input type="text" placeholder={note.name} onChange={handleChange} />
        <button onClick={handleDelete}>Delete</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatenote/${id}`}>
        <p>Update note</p>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
