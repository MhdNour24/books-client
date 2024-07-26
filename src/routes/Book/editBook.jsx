// hooks
import { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
// data
import NoImageSelected from "../../assets/no-image-selected.jpg";

// material ui components
import Grid from "@mui/material/Grid";
import BookReducer from "../../reducers/bookDataReducer";

// components
import DeleteButton from "../../components/deleteButton";
import TextFieldComponet from "../../components/textField";
import ChipTextFieldComponent from "../../components/chipTextField";


function EditBook() {
  const serverUrl=import.meta.env.VITE_SERVER_URL
  const { slug } = useParams();
  const baseUrl = `${serverUrl}/api/books/${slug}`;
  const [data, dispatch] = useReducer(BookReducer, {
    title: "",
    slug: "",
    stars: "",
    description: "",
    categories: [],
    thumbnail: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);
  const [bookId, setBookId] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const AllData = await response.json();
      setBookId(AllData._id);
      dispatch({ type: "title", payload: { title: AllData.title } });
      dispatch({ type: "slug", payload: { slug: AllData.slug } });
      dispatch({ type: "stars", payload: { stars: AllData.stars } });
      dispatch({
        type: "description",
        payload: { description: AllData.description },
      });
      dispatch({
        type: "categories",
        payload: { categories: AllData.category },
      });
      dispatch({
        type: "thumbnail",
        payload: { thumbnail: AllData.thumbnail },
      });
      setImage(
        AllData.thumbnail
          ? `${serverUrl}/uploads/${AllData.thumbnail}`
          : NoImageSelected
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const EdittingBook = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("bookId", bookId);
    formdata.append("title", data.title);
    formdata.append("slug", data.slug);
    formdata.append("stars", data.stars);
    formdata.append("description", data.description);
    data.categories.forEach((category) =>
      formdata.append("category[]", category)
    );
    if (data.thumbnail) {
      formdata.append("thumbnail", data.thumbnail);
    }
    try {
      const response = await fetch(`${serverUrl}/api/books`, {
        method: "PUT",
        body: formdata,
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit data to server");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      dispatch({
        type: "thumbnail",
        payload: { thumbnail: e.target.files[0] },
      });
    }
  };
  return (
    <div className="edit-book-container">
      <h1 className="edit-book-title">Edit Book</h1>
      <p className="edit-book-description">
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>
      <DeleteButton id={bookId}></DeleteButton>
      {submitted ? (
        <h2 className="success-message">Data submitted successfully!</h2>
      ) : (
        <form className="edit-book-form" onSubmit={EdittingBook}>
          <div className="image-upload-container">
            <label className="image-upload-label">Upload Thumbnail</label>
            <img className="thumbnail-preview" src={image} alt="preview" />
            <input
              className="image-input"
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png"
            />
          </div>
          <div className="form-fields-container">
            <Grid container spacing={2}>
              <TextFieldComponet
                label={"title"}
                value={data.title}
                dispatch={dispatch}
              />
              <TextFieldComponet
                label={"slug"}
                value={data.slug}
                dispatch={dispatch}
              />
              <TextFieldComponet
                label={"stars"}
                value={data.stars}
                dispatch={dispatch}
                type="number"
              />
              <TextFieldComponet
                label={"description"}
                value={data.description}
                dispatch={dispatch}
                placeholder="Type here the description of the item"
              />

              <ChipTextFieldComponent dispatch={dispatch} data={data}></ChipTextFieldComponent>
            </Grid>
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
      )}
    </div>
  );
}

export default EditBook;
