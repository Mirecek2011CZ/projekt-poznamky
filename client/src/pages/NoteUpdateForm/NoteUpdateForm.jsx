import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateNote, getNote } from "../../models/Note";

export default function NoteUpdateForm() {
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

  const postForm = async () => {
    const note = await updateNote(id, formData);
    if (note.status === 200) {
      navigate(`/note/${id}`);
    } else {
      setInfo(note.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <h1>Note update form</h1>
      <p>{id}</p>
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
          type="number"
          defaultValue={note.legs}
          name="legs"
          required
          placeholder="Enter legs"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          defaultValue={note.color}
          name="color"
          required
          placeholder="Enter color"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Update note</button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
