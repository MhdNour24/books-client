import { useNavigate } from "react-router-dom";

// material ui components

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";



function DeleteButton({ id }) {
  const navigate = useNavigate();
  const removeBook = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/books");
        console.log("deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <Button
        onClick={removeBook}
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="error"
        className="delete-button"
      >
        Delete
      </Button>
  );
}

export default DeleteButton;
