import "./MainPage.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <h1>Poznámkový blok</h1>

      <div class="button-container">
        <Link to={"/createnote"}>
          <button class="button">Vytvořit poznámku</button>
        </Link>
        <Link to={"/notes"}>
          <button class="button button-secondary">Existující poznámky</button>
        </Link>
        <Link to={"/createcategory"}>
          <button class="button button-secondary">Vytvořit kategorii</button>
        </Link>
      </div>
    </>
  );
}
