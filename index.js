const keyApi = '5b8fbf61'
const inputSearch = document.getElementById('search-input')
const btnSearch = document.getElementById('search-btn')
const movieList = document.getElementById('movie-list')
let watchlist = []


btnSearch.addEventListener('click', function(e){
    e.preventDefault()
    getMovieList()
    movieList.textContent = ''
})

function getMovieList(){
    fetch(`https://www.omdbapi.com/?apikey=${keyApi}&s=${inputSearch.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response == 'True'){
                for(let i = 0; i < data.Search.length; i++){ 
                    let movie = data.Search[i].imdbID
                    fetchMovieData(movie)  
                }   
            } else {
                movieList.innerHTML = `<h3 class='not-found'>
                                            Unable to find what you’re looking for. Please try another search.
                                        </h3>`
            }
        })
}

function fetchMovieData(movie){
     fetch(`https://www.omdbapi.com/?apikey=${keyApi}&i=${movie}`)
            .then(res => res.json())
            .then(data => {
                movieList.innerHTML += render(data)
                inputSearch.value = ''
            })
}

function render(data){
     if(data.Error !== "Movie not found!" && data.Poster !== 'N/A'){
      return `
            <div id='${data.imdbID}'>
                <div class='movie'>
                    <img class='poster' src='${data.Poster}'>
                    <div class='info'>
                        <h3>${data.Title}   ⭐${data.imdbRating}</h3>
                        <div class='inline'>
                            <p>${data.Runtime}</p>   
                            <p>${data.Genre}</p>
                            <button class='watchlist-btn' 
                            onclick='addMovieToList(${data.imdbID})'>
                            <img class='icon' src='img/icon-mais.png'>Watchlist</button>
                        </div>
                        <p>${data.Plot}</p>
                    </div>
                </div>
            </div>
            <hr>
            `  
    } else {
        return ''
    }
}

function addMovieToList(id){
    const movieId = id.getAttribute('id')
    watchlist = JSON.parse(localStorage.getItem('watchlist'))
    watchlist.push(movieId)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
}

