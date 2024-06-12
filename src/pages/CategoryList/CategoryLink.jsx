import { Link } from "react-router-dom"
import "./CategoryList.css";
import * as React from 'react';

export default function CategoryLink(props) {
   
    return (
        <>
            <Link to={`/category/${props._id}`}>
                <p>{props.category}</p>
            </Link>
        </>
    )
}