import { Link } from "react-router-dom";
import NoteLink from "./NoteLink";
import { useState, useEffect } from "react";
import { getNotes } from "../../models/Note";

export default function NoteList() {
  const [notes, setNotes] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getNotes();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setNotes(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Notes not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Notes are loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Note list</h1>
      {
        notes.map((note, index) => (
          <NoteLink key={index} {...note} />
        ))
      }
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
