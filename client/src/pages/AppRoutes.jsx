import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import About from "./About/About";
import NoteCreateForm from "./NoteCreateForm/NoteCreateForm";
import NoteList from "./NoteList/NoteList";
import NoteUpdateForm from "./NoteUpdateForm/NoteUpdateForm";
import NoteView from "./NoteView/NoteView";
import CreatedNote from "./NoteCreateForm/CreatedNote";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/createnote" element={<NoteCreateForm />} />
          <Route path="/updatenote/:id" element={<NoteUpdateForm />} />
          <Route path="/note/:id" element={<NoteView />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/creatednote/:id" element={<CreatedNote />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
