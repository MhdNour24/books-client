// hooks
import { useState, useReducer } from "react";
// data
import NoImageSelected from "../../assets/no-image-selected.jpg";
// import Categories from "../../data/categories";

// reducers
import BookReducer from "../../reducers/bookDataReducer";

// material ui components and dependencies
import Grid from "@mui/material/Grid";

// components
import TextFieldComponet from "../../components/textField";
import ChipTextFieldComponent from "../../components/chipTextField";


function CreateBook() {
  const serverUrl=import.meta.env.VITE_SERVER_URL
  const [data, dispatch] = useReducer(BookReducer, {
    title: "",
    slug: "",
    stars: "",
    description: "",
    categories: [],
    thumbnail: null,
  });
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState(NoImageSelected);

  const CreatingBook = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("slug", data.slug);
    formdata.append("stars", data.stars);
    formdata.append("description", data.description);
    data.categories.forEach((category) =>
      formdata.append("category[]", category)
    );
    formdata.append("thumbnail", data.thumbnail);
    try {
      const response = await fetch( `${serverUrl}/api/books` , {
        method: "POST",
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
    <div className="create-book-container">
      <h1>Create Book</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>
      {submitted ? (
        <h2 className="success-message">Data submitted successfully!</h2>
      ) : (
        <form className="book-details-form" onSubmit={CreatingBook}>
          <div className="image-upload-container">
            <label className="image-upload-label">Upload Thumbnail</label>
            <img className="single-image" src={image} alt="preview" />
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

export default CreateBook;
