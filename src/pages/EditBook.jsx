import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";

const EditBook = () => {
  const { id } = useParams();
  return <BookForm id={id} />;
};

export default EditBook;
