import { Link, useParams } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

export default function CreatedNote() {
  const { id } = useParams();  

  return (
    <>
      <h2>Poznámka byla vytvořena</h2>
      <Link to={"/notes"}>
      <Button variant="outlined">Seznam poznámek</Button>
      </Link>
    </>
  );
}
