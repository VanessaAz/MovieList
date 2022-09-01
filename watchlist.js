const keyApi = '5b8fbf61'
const displayMovies = document.getElementById('movie-list')


renderMovieWatchlist()

function renderMovieWatchlist(){
    const watchlist = JSON.parse(localStorage.getItem('watchlist'))
    if(watchlist.length > 0) {
        for(let movie of watchlist){
           fetch(`https://www.omdbapi.com/?apikey=${keyApi}&i=${movie}`)
            .then(res => res.json())
            .then(data => {
                 displayMovies.innerHTML += render(data, movie)           
            })  
        }
    } else {
       displayMovies.innerHTML = addMoviesToWatchlist()
    }
    
} 

function addMoviesToWatchlist(){
    return `<div class='add-movie-section'>
                <h3 class='add-movie-h3'>Your watchlist is looking a little empty...</h3>
                <a href='index.html' class='add-movie-btn'>
                    <img class='icon' src='img/icon-mais.png'> 
                    Let’s add some movies!
                </a>
            </div>
            `
}

function render(data, movie){
    return `<div id='${data.imdbID}'>
                <div class='movie'>
                <img class='poster' src='${data.Poster}'>
                    <div class='info'>
                        <h3>${data.Title}   ⭐${data.imdbRating}</h3>
                        <div class='inline'>
                            <p>${data.Runtime}</p>   
                            <p>${data.Genre}</p>
                            <button class='watchlist-btn'
                                onClick="removeMovieBtn('${movie}')">
                            <img class='icon' src='img/remove.png'>Remove</button>
                        </div>
                        <p>${data.Plot}</p>
                    </div>
                </div>
            </div>
            <hr>`
} 


function removeMovieBtn(id){
    const watchlist = JSON.parse(localStorage.getItem('watchlist'))
    const movieId = watchlist.indexOf(id)
    const removed = watchlist.splice(movieId, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    displayMovies.innerHTML = ''
    renderMovieWatchlist()
}
