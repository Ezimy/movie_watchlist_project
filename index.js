if (localStorage.getItem("watchlist") === null) {
    localStorage.setItem("watchlist", JSON.stringify([]));
  }

const contentSection = document.getElementById("content-section");
const inputText = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const pageSection = document.getElementById("page-btn-section");

let page = 1;
let searchedtitle = "";
let pageStorage = [];

function getPageHTML(){
    let pageHTML = ''
    if (page === 1){
        pageHTML = `
        <div id="page-btn-section">
            <button id="next-page" class=page-btn>Next Page</button>
        </div>`
    }
    else{
        pageHTML = `
        <div id="page-btn-section">
            <button id="previous-page"class=page-btn>Previous Page</button>
            <button id="next-page" class=page-btn>Next Page</button>
        </div>`
    }
    return pageHTML
}

async function getMoviesHTML() {
    let moviesHTML = '';
    const res = await fetch(`http://www.omdbapi.com/?apikey=acec20f1&s=${inputText.value}&page=${page}&type=movie`, { method: "GET" });
    const data = await res.json();
  
    // Use Promise.all to wait for all promises to resolve
    const movieDetailsArray = await Promise.all(data.Search.map(movie => getMovieByID(movie.imdbID)));
    for (let i = 0; i < data.Search.length; i++) {
      moviesHTML += `
      <div class=movie-entry>
        <img src="${movieDetailsArray[i].poster}" onerror="this.onerror=null; this.src='images/Default.jpg'" class="poster">
        <div class="movie-info">
            <div class="title-and-rating">
                <h1>${movieDetailsArray[i].title}</h1>
                <div class="movie-rating">
                    <img src="images/star.png">
                    <p>${movieDetailsArray[i].rating}</p>
                </div>
            </div>
            <div class="runtime-genres-btn">
                <p>${movieDetailsArray[i].runtime}</p>
                <p>${movieDetailsArray[i].genres}</p>
                <div class="add-btn" id="${data.Search[i].imdbID}">
                    <img src="images/add.png">
                    <p>Watchlist</p>
                </div>
            </div>
            <p class="plot">${movieDetailsArray[i].plot}</p>
        </div>
      </div>`
    }
  
    moviesHTML += getPageHTML();
    return moviesHTML;
  }
  async function getMovieByID(imdbId) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=acec20f1&i=${imdbId}`, { method: "GET" });
    const data = await res.json();
  
    const rating = data.Ratings && data.Ratings.length > 0 ? data.Ratings[0].Value : "N/A";
  
    return {
      poster: data.Poster,
      title: data.Title,
      runtime: data.Runtime,
      genres: data.Genre,
      plot: data.Plot,
      rating: rating,
    };
  }
function render() {
    getMoviesHTML().then(html => {
        contentSection.innerHTML = html;
    });
}
document.addEventListener('click', function(e){
    if(e.target.id === "search-btn"){
        e.preventDefault()
        render()
    }
    if(e.target.id ==="next-page"){
        page = page + 1
        render()
    }
    if(e.target.id ==="previous-page" && page != 1){
        page = page - 1
        render()
    }
});