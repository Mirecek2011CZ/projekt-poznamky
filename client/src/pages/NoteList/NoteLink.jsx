import { Link } from "react-router-dom"

export default function NoteLink(props) {
   
    return (
        <>
            <Link to={`/note/${props._id}`}>
                <p>{props.name}</p>
            </Link>
        </>
    )
}