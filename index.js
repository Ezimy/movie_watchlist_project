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

getPageHTML()

function getPageHTML(){
    if (page === 1){
        pageSection.innerHTML = `
        <button id="next-page" class=page-btn>Next Page</button>`
    }
    else{
        pageSection.innerHTML = `
        <button id="next-page" class=page-btn>Next Page</button>
        <button id="previous-page"class=page-btn>Previous Page</button>`
    }
}

async function getMoviesHTML(){
    let moviesHTML = ''
    const res = await fetch(`http://www.omdbapi.com/?apikey=acec20f1&s=${inputText.value}&page=${page}&type=movie`, {method:"GET"});
    const data = await res.json();
    for(let i =0 ; i < data.Search.length; i++){
        moviesHTML += `<h1>${data.Search[i].Title}</h1>`
    }
    return moviesHTML
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
        getPageHTML()
        getMoviesHTML()
    }
    if(e.target.id ==="previous-page" && page != 1){
        page = page - 1
        getPageHTML()
        getMoviesHTML()
    }
});