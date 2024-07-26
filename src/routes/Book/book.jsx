import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

// material ui components
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function BookItem() {
  const serverUrl=import.meta.env.VITE_SERVER_URL
  const baseUrl = `${serverUrl}/api/books`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCotegory, setSelectedCategoy] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if (selectedCotegory) {
          url += `?category=${selectedCotegory}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCotegory]);
  const handleChange = (event) => {
    setSelectedCategoy(event.target.value);
  };
  return (
    <div>
      <h1>Books</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>
      <Link to={"/createbook"}>
        {" "}
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add
        </Button>
      </Link>
      <h2>Fetch Example</h2>
      <FormControl fullWidth className="filters" sx={{margin:"10px 0"}}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCotegory}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={""}>All</MenuItem>
          <MenuItem value={"romance"}>Romance</MenuItem>
          <MenuItem value={"science"}>Science</MenuItem>
          <MenuItem value={"crime"}>Crime</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"adventure"}>Adventure</MenuItem>
          <MenuItem value={"thriller"}>Thriller</MenuItem>
          <MenuItem value={"fiction"}>Fiction</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>

      {isLoading ? (
        <h2 style={{ color: "aqua" }}>Loading...</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  className="all-images"
                  src={`${serverUrl}/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h4>{item.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookItem;
