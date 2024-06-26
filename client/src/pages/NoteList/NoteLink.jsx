import { Link } from "react-router-dom";
import "./NoteList.css";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const handleDelete = async (e) => {
  e.preventDefault();
  const data = await deleteNote(props._id.$oid);
  if (data.status === 200) {
    window.location.reload();
  } else {
    setInfo(data.msg);
  }
};

export default function NoteLink(props) {
  return (
    <>
      <div className="list">
        <p>{props.name}</p>
        <p>{props.date}</p>
        <p>{props.type}</p>

        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Text poznámky</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{props.text}</Typography>
          </AccordionDetails>
        </Accordion>

    <form>
        <Button className="changeBtn" variant="contained">
          <Link to={`/note/${props._id}`}>
            <p>upravit</p>
          </Link>
        </Button>
    </form>
      </div>
    </>
  );
}
