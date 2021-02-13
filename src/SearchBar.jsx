import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
function SearchBar() {
  // useState Hooks:
  const [input, setInput] = useState("");
  const [filmName, setFilmName] = useState("batman");
  const [isMousedOver, setMouseOver] = useState(false);
  const [searchedShows, setSearchedShows] = useState([]);
  //this function is trigerred whenever the search field changes
  function handleChange(event) {
    setInput(event.target.value);
  }
  //this function is trigerred whenever the submit button is clicked
  function handleClick() {
    setFilmName(input);
  }
  //this function is trigered whenever the mouse is over the submit button
  function handleMouseOver() {
    setMouseOver(true);
  }
  //this function is trigerred whenever the mouse moves out of the submit button
  function handleMouseOut() {
    setMouseOver(false);
  }
  //this function performs a get request from the API with the spesific show Name
  useEffect(() => {
    axios
      .get("http://api.tvmaze.com/search/shows?q=" + filmName) // get data from this spesific route
      .then((res) => {
        setSearchedShows(res.data); // set the list of searched shows that will be displayed in the table
        console.log("succes: data has been received");
        console.log(res.data);
      })
      .catch(() => {
        alert("data has not been received"); // in case of an error while fetching data from the API,an alert will be trigered
      });
  }, [filmName]); // the function is called whenever the variable filmName changes
  return (
    <div>
      <div>
        <div className="container">
          <h1>Tv Show App ®</h1>
          {/* search bar will triger the handleChange function whenver the typed value changes */}
          <input
            type="text"
            placeholder="Search.."
            value={input}
            onChange={handleChange}
          />
          {/*submit button that will triger the handleClick function whenver it's clicked*/}
          <button
            style={{ backgroundColor: isMousedOver ? "black" : "white" }}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Submit
          </button>
        </div>
      </div>
      {/*table that displays the results*/}
      <table>
        {/*header part of he table*/}
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Score</th>
            <th>More..</th>
          </tr>
        </thead>
        {/*body part of the table*/}
        <tbody>
          {/*the map function will map every single element of the searchedShows array and display spefic attribute in the table*/}
          {searchedShows.map((row) => {
            return (
              <tr>
                <td>{row.show.name}</td>
                <td>
                  {/*in case this element has more than one genre, we add a space to separate the strings*/}
                  {row.show.genres.map((element) => {
                    return element + ", ";
                  })}
                </td>
                <td>{row.show.language}</td>

                <td>{row.score}</td>
                <td>
                  <a href={row.show.url}>see..</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default SearchBar;
