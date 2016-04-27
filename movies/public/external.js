document.addEventListener('DOMContentLoaded', init);

function init(){
  console.log('init');
  filter();
  add();
}

function filter(){
  //filter button
  document.getElementById("filterBtn").addEventListener('click', function(evt){
    //prevent submission
    evt.preventDefault();

    //get director field - if empty, request all movies
    var director = document.getElementById("director").value;
    console.log("Director: " + director);

    //make URL & background request
    var url = "";
    if(director !== ""){
      url =  "http://localhost:3000/api/movies?director=" + director;
    }else{
      url = "http://localhost:3000/api/movies";
    }

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        //FIXME
        //parse JSON and make table
         var movies = JSON.parse(req.responseText);

         var table = document.getElementById('movie-list');
         console.log(table.childNodes);

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
    });

    req.addEventListener('error', function(e){
      document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
    });

    //FIXME: 500 SERVER ERROR
    req.send();
  });

}

function add(){
  //add
  document.getElementById("addBtn").addEventListener('click', function(evt){
    //prevent submission
    evt.preventDefault();

    //get form data
    var data = "";

    var title = document.getElementById("movieTitle").value;
    var director = document.getElementById("movieDirector").value;
    var year = document.getElementById("movieYear").value;

    data = "title=" + title + "&director=" + director + "&year=" + year;

    //make url and request
    var url = "http://localhost:3000/api/movies/create";
    var req = new XMLHttpRequest();
    req.open('POST', url, true);

    req.addEventListener('load', function(){

    });
    req.addEventListener('error', function(){

    });
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(data);

    //TODO: make sure to clear any filtered movies

  });


}
