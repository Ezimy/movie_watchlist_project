if (localStorage.getItem("watchlist") === null) {
    localStorage.setItem("watchlist", JSON.stringify([]));
  }
  
const contentSection = document.getElementById("content-section");
const inputText = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let page = 1;
let searchedtitle = "";
let pageStorage = [];

// async function searchMovie(){
//     const res = await fetch(`http://www.omdbapi.com/?apikey=acec20f1&s=${inputText.value}`, {method:"GET"});
//     const data = await res.json();
//     console.log(data);
// }
// searchBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     searchMovie();
// })
const getImdbIds = async (movieTitle, page) => {
    contentSection.innerHTML = `<div class="loader"></div>`
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=3dce0b9&s=${movieTitle}&page=${page}&type=movie`
    );
    const data = await response.json();
  
    if (data.Search) {
      
      return data.Search.map((movie) => movie.imdbID);
    } 
  };
  console.log(getImdbIds("blade runner", 1))
