import { Link } from "react-router-dom";
import CategoryLink from "./CategoryLink";
import { useState, useEffect } from "react";
import { getCategories } from "../../models/Category";

export default function CategoryList() {
  const [categories, setCategories] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getCategories();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCategories(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Categories not found</p>
        <Link to={"/"}>
          <p>Go back</p>
        </Link>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Categories are loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Category list</h1>
      {
        categories.map((category, index) => (
          <CategoryLink key={index} {...category} />
        ))
      }
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
