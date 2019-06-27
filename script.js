const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movie');
const urlPoster = 'https://image.tmdb.org/t/p/w500';
function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger"> Поле поиска не должно быть пустым</h2>';
        return
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=854c832b0c3b2220153231f04287d91d&language=ru&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';
    fetch(server)
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            let inner = '';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info"> По Вашему запросу ничего не найдено</h2>';
            };
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.jpg';
                let dataInfo = '';
                if(item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
             <div class="col-6 col-md-4 col-xl-3 item" >
                <img src="${poster}" class="poster_img" alt="${nameItem}" ${dataInfo}">
                <h5>${nameItem}</h5>
                </div>`;
            });
            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(function (reason) {
            movie.innerHTML = 'Упс, что то пошло не так!';
            console.log('error: ' + request.status);
        });
}
searchForm.addEventListener('submit', apiSearch);

function addEventMedia(){
    const media = movie.querySelectorAll('img[data-id]');
                media.forEach(function(elem){
                    elem.style.cursor = 'pointer';
                    elem.addEventListener('click', showFullInfo);
                });
}

function showFullInfo(){
    console.log(this);
}