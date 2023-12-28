import { removeMovieFromWatchList, logWatchlist} from "/index.js";
let watchList = JSON.parse(localStorage.getItem("watchlist") || "[]");
const contentSection = document.getElementById("content-section");
render()
async function getMoviesHTML() {
    let moviesHTML = '';
    if (watchList.length > 0){
        for (let i = 0; i < watchList.length; i++) {
        moviesHTML += `
        <div class=movie-entry>
            <img src="${watchList[i].poster}" onerror="this.onerror=null; this.src='images/Default.jpg'" class="poster">
            <div class="movie-info">
                <div class="title-and-rating">
                    <h1>${watchList[i].title}</h1>
                    <div class="movie-rating">
                        <img src="images/star.png">
                        <p>${watchList[i].rating}</p>
                    </div>
                </div>
                <div class="runtime-genres-btn">
                    <p>${watchList[i].runtime}</p>
                    <p>${watchList[i].genres}</p>
                    <div class="remove-btn" id="${watchList[i].imdbID}">
                        <img src="images/add.png" class="remove-btn">
                        <p class="remove-btn">Watchlist</p>
                    </div>
                </div>
                <p class="plot">${watchList[i].plot}</p>
            </div>
        </div>`
        }
    }
    else{
        moviesHTML = `
        <div>
            <p>No Movies in Watchlist</p>
        <div>`
    }
    return moviesHTML;
  }
  function render() {
    watchList = JSON.parse(localStorage.getItem("watchlist") || "[]");
    getMoviesHTML().then(html => {
        contentSection.innerHTML = html;
    });
}
document.addEventListener('click', function(e){
    if(e.target.classList.contains("remove-btn")){
        let id =''
        let movieObj = watchList.find(movie => movie.imdbID === id)
        //if div is pressed
        if(e.target.id){
            id = e.target.id
            removeMovieFromWatchList(movieObj)
            render()
        }
        //if children of div is pressed
        else{
            id=e.target.parentElement.id
            removeMovieFromWatchList(movieObj)
            render()
        }
        logWatchlist()
    }
});
