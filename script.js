const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const date = document.querySelector('#date');
function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=854c832b0c3b2220153231f04287d91d&language=ru&query=' + searchText;
    requestApi(server);


}
searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', function () {
        if (request.readyState !== 4) return;

        if(request.status !== 200){
            console.log('error: ' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);
        console.log(output);
        let inner = '';
     
        output.results.forEach(function(item){
            let nameItem = item.name || item.title;
            let dateItem = item.release_date || item.first_air_date;
            
            inner += `<div class="col-sm-12 col-md-12 col-lg-6 col-xl-4"><br>${nameItem}</br>Дата выхода: ${dateItem}</div>`;
        });
      
        movie.innerHTML = inner;
        

        
    });

    

}