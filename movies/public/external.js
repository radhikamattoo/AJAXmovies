document.addEventListener('DOMContentLoaded', init);

function init(){
  console.log('init');

  //filter button
  document.getElementById("filterBtn").addEventListener('click', function(evt){
    //prevent submission
    evt.preventDefault();

    //get director field - if empty, request all movies
    var director = document.getElementById("director").value;
    console.log("Director: " + director);

    //make URL & background request
    var url = "http://localhost:3000/api/movies?director=" + director;

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.addEventListener('load', handleLoad);
    req.addEventListener('error', function(){
      document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
    });
    req.send();
  });
}


function handleLoad(){
  if (req.status >= 200 && req.status < 400) {
    //parse JSON and make table
     var movies = JSON.parse(req.responseText);

     var table = document.getElementById('movie-list');

     movies.forEach(function(movie){
       var row = document.createElement('tr');
       var title = document.createElement('td').textContent = movie.title;
       var director = document.creteElement('td').textContent = movie.director;
       var year = document.creteElement('td').textContent = movie.year;

       row.appendChild(title);
       row.appendChild(director);
       row.appendChild(year);
       table.replaceChild(row);
     });
  }

}
