const contentSection = document.getElementById("content-section")
const searchBtn = document.getElementById("search-btn")
async function getMoviesHTML(){
    let moviesHTML = ''
    const res = await fetch("http://www.omdbapi.com/?apikey=acec20f1&t=blade+runner", {method:"GET"})
    const data = await res.json()
    console.log(data)
}
getMoviesHTML()
searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    const inputText = document.getElementById("search-input").value
    console.log(inputText)
    console.log("clicked")
})