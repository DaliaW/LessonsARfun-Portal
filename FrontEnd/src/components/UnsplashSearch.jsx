import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import "./PolySearch/PolySearch.css";
import "../styles/UnsplashStyle.css";
import Swal from "sweetalert2";

const unsplash = new Unsplash({
  accessKey: "WR48RoHswpUw4jtiBdmqfx0ifzw587K9rcyxMSvz9vM",
});
function UnsplashDashboard() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  useEffect(() => {
    unsplash.search
      .photos("galaxy")
      .then(toJson)
      .then((json) => {
        setPics(json.results);
      });
  }, []);

  const searchPhotos = async (e) => {
    e.preventDefault();
    if (query) {
      unsplash.search
        .photos(query)
        .then(toJson)
        .then((json) => {
          setPics(json.results);
        });
    } else {
      unsplash.search
        .photos("science")
        .then(toJson)
        .then((json) => {
          setPics(json.results);
        });
    }
  };

  function handleClick(pic, e) {
    let target = e.currentTarget;
    let toggled = target.classList.toggle("UnsplashSearch__selected");
    if (toggled) {
      console.log("true");
      localStorage.setItem("pic", pic);
      console.log(localStorage.getItem("pic"));

      let existingEntries = JSON.parse(localStorage.getItem("allImages"));
      if (existingEntries === null) existingEntries = [];
      const entry = { picture: pic };

      localStorage.setItem("entry", JSON.stringify(entry));
      existingEntries.push(entry);
      localStorage.setItem("allImages", JSON.stringify(existingEntries));
      console.log("all", JSON.parse(localStorage.getItem("allImages")));
    } else {
      console.log("false");
      const removeSelected = localStorage.getItem("pic");
      console.log(removeSelected, "here");
      let existingEntries = JSON.parse(localStorage.getItem("allImages"));
      const index = existingEntries.indexOf(removeSelected);
      existingEntries.splice(index, 1);
      localStorage.setItem("allImages", JSON.stringify(existingEntries));
      console.log("all", JSON.parse(localStorage.getItem("allImages")));
    }
  }

  return (
    <div className="UnsplashSearch__container">
      <form className="UnsplashSearch__form" onSubmit={searchPhotos}>
        <label className="UnsplashSearch__label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          style={{ outline: "none" }}
          type="text"
          name="query"
          className="UnsplashSearch__input"
          placeholder={`Try "cat" or "sun"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="UnsplashSearch__button">
          Search
        </button>
      </form>
      {pics.length > 1 ? (
        <h4>You can select one picture or multiple pictures from below:</h4>
      ) : null}
      {query ? (
        <div className="UnsplashSearch__card-list">
          {pics.map((pic) => (
            <div className="UnsplashSearch__card" key={pic.id}>
              <img
                className="UnsplashSearch__card--image"
                alt={pic.alt_description}
                src={pic.urls.thumb}
                width="50%"
                height="50%"
                onClick={(e) => handleClick(pic.urls.full, e)}
              ></img>
            </div>
          ))}
        </div>
      ) : (
        <div className="UnsplashSearch__card-list">
          {pics.map((pic) => (
            <div className="UnsplashSearch__card" key={pic.id}>
              <img
                className="UnsplashSearch__card--image"
                alt={pic.alt_description}
                src={pic.urls.thumb}
                width="50%"
                height="50%"
                onClick={(e) => handleClick(pic.urls.full, e)}
              ></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UnsplashDashboard;
