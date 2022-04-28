import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

import "../styles/Youtube.css";

function UnsplashDashboard() {
  const [query, setQuery] = useState("");
  const { addToast } = useToasts();

  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = url.match(p);
    if (matches) {
      return matches[1];
    }
    return false;
  }
  const addVideo = async (e) => {
    e.preventDefault();
    if (matchYoutubeUrl(query)) {
      console.log(query);
      localStorage.setItem("video", query);
      Swal.bindClickHandler();

      Swal.mixin({
        title: "ADDED!",
        icon: "success",
        toast: true,
        timer: 1500,
      }).bindClickHandler("data-swal-toast-template");
      localStorage.setItem("Txt", query);
      console.log(localStorage.getItem("Txt"));
    } else {
      addToast("Please enter a valid YouTube URL", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="youtube__container">
      <form className="youtube__form" onSubmit={addVideo}>
        <label className="youtube__label" htmlFor="query">
          {" "}
          ▶
        </label>
        <input
          style={{ outline: "none" }}
          type="text"
          name="query"
          className="youtube__input"
          placeholder={`Paste video link here ..`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          data-swal-toast-template="#my-template"
          type="submit"
          className="youtube__button"
        >
          Add video
        </button>
      </form>
    </div>
  );
}

export default UnsplashDashboard;
