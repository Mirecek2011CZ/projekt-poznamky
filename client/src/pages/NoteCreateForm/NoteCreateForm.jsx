import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createNote } from "../../models/Note";

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
    return navigate(`/creatednote/${id}`)
  }

  return (
    <>
      <h1>Note create form</h1>
      <form>
        <input type="text" name="name" required placeholder="Enter  name" onChange={e => handleChange(e)}/>
        <input type="text" name="date" required placeholder="Enter date" onChange={e => handleChange(e)}/>
        <select type="text" name="type" onChange={value => handleChange(value)}>
          <option value = "Enter type"></option>
          <option value = "Option1">Option1</option>
          <option value = "Option2">Option2</option>
          <option value = "Option3">Option3</option>
        </select>
        <input type="text" name="text" required placeholder="Enter text" onChange={e => handleChange(e)}/>
        <button onClick={handlePost}>
          Create note
        </button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
