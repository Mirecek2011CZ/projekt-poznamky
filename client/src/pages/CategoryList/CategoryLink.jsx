import { Link } from "react-router-dom"

export default function CategoryLink(props) {
   
    return (
        <>
            <Link to={`/category/${props._id}`}>
                <p>{props.category}</p>
            </Link>
        </>
    )
}