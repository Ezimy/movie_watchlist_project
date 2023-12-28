const contentSection = document.getElementById("content-section");
const inputText = document.getElementById("search-input");
let page = 1;
//local storage functionality
if (localStorage.getItem("watchlist") === null) {
    localStorage.setItem("watchlist", JSON.stringify([]));
  }
function addMovieToWatchlist(movie) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist"));
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
export function removeMovieFromWatchList(movie){
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    watchlist.pop(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

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
                    <img src="images/add.png" class="add-btn">
                    <p class="add-btn">Watchlist</p>
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
      id: data.imdbID,
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
//event listeners
document.addEventListener('click', function(e){
    if(e.target.id === "search-btn"){
        e.preventDefault()
        page = 1
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
    if(e.target.classList.contains("add-btn")){
        let id =''
        //if div is pressed
        if(e.target.id){
            id = e.target.id
            getMovieByID(id).then(movieObj => {
                addMovieToWatchlist(movieObj)
            });
        }
        //if children of div is pressed
        else{
            id=e.target.parentElement.id
            getMovieByID(id).then(movieObj => {
                addMovieToWatchlist(movieObj)

            });
        }
    }
});
export function logWatchlist() {
    let watchlistString = localStorage.getItem("watchlist");
    let watchlist = JSON.parse(watchlistString);
    console.log("Current watchlist:", watchlist);
}