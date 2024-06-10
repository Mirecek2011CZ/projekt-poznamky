import { Link } from "react-router-dom";
import NoteLink from "./NoteLink";
import { useState, useEffect } from "react";
import { getNotes } from "../../models/Note";
import "./NoteList.css";
import * as React from "react";
import Button from "@mui/material/Button";

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
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Notes not found</p>
        <Link to={"/"}>
          <p>Go back</p>
        </Link>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Notes are loading...</p>
      </>
    );
  }

  return (
    <>
    <div id="NoteList">
      <h1>Note list</h1>
      {notes.map((note, index) => (
        <NoteLink key={index} {...note} />
      ))}
      <Link className="backBtn" to={"/"}>
        <Button variant="outlined">Go back</Button>
      </Link>
      </div>
    </>
  );
}
