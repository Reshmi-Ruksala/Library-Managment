import { useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Book {id}</h1>
    </div>
  );
}
