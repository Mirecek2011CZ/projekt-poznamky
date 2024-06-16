import { Link } from "react-router-dom";
import NoteLink from "./NoteLink";
import { useState, useEffect } from "react";
import { getNotes } from "../../models/Note";
import "./NoteList.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { getCategories } from "../../models/Category";
import CategoryLink from "../CategoryList/CategoryLink";

export default function NoteList() {
  const [notes, setNotes] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const [categories, setCategories] = useState();
  const [isLoadedCategories, setLoadedCategories] = useState(false);

  const [filterValue, setFilterValue] = useState("");
  const current_notes = [];

  const load = async () => {
    const data = await getNotes();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setNotes(data.payload);
      setLoaded(true);
    }
  };

  const load_notes = (value) => {
    notes.forEach((element) => {
      if (element.type == value.target.value) {
        console.log("True", element);
        return (
          <>
            <p>DONE</p>
            {NoteLink(element)}
          </>
        );
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  const load_categories = async () => {
    const data = await getCategories();
    if (data.status === 500 || data.status === 404)
      return setLoadedCategories(null);
    if (data.status === 200) {
      setCategories(data.payload);
      setLoadedCategories(true);
    }
  };

  useEffect(() => {
    load_categories();
  }, []);

  if (isLoadedCategories === null) {
    console.log(1111111);
    return <></>;
  }

  if (!isLoadedCategories) {
    console.log(222222);
    return <></>;
  }

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
        <h1>Seznam poznámek</h1>
        <select
          type="text"
          name="type"
          onChange={(value) => {
            setFilterValue(value);
          }}
        >
          <option value="">Všechny poznámky</option>
          <option value="Domácnost">Domácnost</option>
          <option value="Škola">Škola</option>
          <option value="Obecné">Obecné</option>
          {categories.map((category, index) => (
            <option value={`${categories[index].category}`}>
              <CategoryLink key={index} {...category} />
            </option>
          ))}
        </select>
        {notes.forEach((element) => {
          if (filterValue) {
            if (filterValue.target.value == element.type) {
              current_notes.push(element);
            }
          }
        })}
        {console.log("TYPE: ", typeof filterValue)}
        {typeof filterValue == "object"
          ? console.log("VALUE: ", filterValue.target.value)
          : null}
        {current_notes
          ? current_notes.map((note, index) => (
              <NoteLink key={index} {...note} />
            ))
          : null}
        {(current_notes.length == 0 && typeof filterValue == "string") ||
        (filterValue && filterValue.target.value.trim() == "")
          ? notes.map((note, index) => <NoteLink key={index} {...note} />)
          : null}
        {current_notes.length == 0 &&
        filterValue &&
        filterValue.target.value.trim() != "" ? (
          <p>Nebyly nalezené žádné poznámky v této kategorii.</p>
        ) : null}
        <Link className="backBtn" to={"/"}>
          <Button variant="outlined">Zpět</Button>
        </Link>
      </div>
    </>
  );
}
