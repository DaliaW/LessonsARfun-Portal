import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./PolySearch/PolySearch.css";
import "../styles/Txt.css";

function TxtDashboard() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    Swal.bindClickHandler();

    Swal.mixin({
      title: "ADDED!",
      icon: "success",
      toast: true,
      timer: 1500,
    }).bindClickHandler("data-swal-toast-template");
  }, []);
  const addText = async (e) => {
    localStorage.setItem("Txt", query);
    console.log(localStorage.getItem("Txt"));

    let existingEntries = JSON.parse(localStorage.getItem("allTxt"));
    if (existingEntries === null) existingEntries = [];
    const entry = { Txt: query };

    localStorage.setItem("entry", JSON.stringify(entry));
    existingEntries.push(entry);
    localStorage.setItem("allTxt", JSON.stringify(existingEntries));
    console.log("all", JSON.parse(localStorage.getItem("allTxt")));
  };

  return (
    <div className="Txt__container">
      <form className="Txt__form" onSubmit={addText}>
        <label className="Txt__label" htmlFor="query">
          {" "}
          📝
        </label>
        <input
          style={{ outline: "none" }}
          type="text"
          name="query"
          className="Txt__input"
          placeholder={`Try adding a text here to appear in AR`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          data-swal-toast-template="#my-template"
          type="submit"
          className="Txt__button"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
export default TxtDashboard;
