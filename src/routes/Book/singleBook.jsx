import { Link, useParams } from "react-router-dom";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useEffect, useState } from "react";
// components

import DeleteButton from "../../components/deleteButton";

// material ui components
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// validation
import PropTypes from "prop-types";

function SingleBook() {
  const serverUrl=import.meta.env.VITE_SERVER_URL
  const [data, setData] = useState([]);
  const urlSlug = useParams();
  const baseUrl = `${serverUrl}/api/books/${urlSlug.slug}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function StarsRating({ numberOfStars }) {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(
        <span key={i} style={{ marginBottom: "0", paddingBottom: "0" }}>
          <StarPurple500SharpIcon
            sx={{ color: "	rgb(255,226,52)" }}
          ></StarPurple500SharpIcon>
        </span>
      );
    }
    return <div style={{ display: "flex" }}>Rating: {stars}</div>;
  }
  StarsRating.propTypes = {
    numberOfStars: PropTypes.number,
  };

  return (
    <div style={{ width: "100%" }}>
      <Link to={"/books"}>🔙 Books</Link>
      <div className="bookdetails">
        <div className="col-1">
          <img
            className="single-image"
            src={`${serverUrl}/uploads/${data?.thumbnail}`}
            alt={data?.title}
          />
          <Stack direction="row" spacing={2}>
            <Link to={`/editbook/${data.slug}`}>
              <Button variant="contained">Edit</Button>
            </Link>

            <DeleteButton id={data._id}></DeleteButton>
          </Stack>
        </div>
        <div className="col-2">
          <h1>{data?.title}</h1>
          <h4 style={{fontSize:"17px"}}>{data?.description}</h4>
          <StarsRating numberOfStars={data?.stars}></StarsRating>
          <p>Category</p>
          <ul>
            {data?.category?.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
