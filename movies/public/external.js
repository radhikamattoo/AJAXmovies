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

    //make URL
    var url = "";
    if(director !== ""){
      url =  "http://localhost:3000/api/movies?director=" + director;
    }else{
      url = "http://localhost:3000/api/movies";
    }

    //make background request
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        //FIXME
        //parse JSON and replace table elements
         var movies = JSON.parse(req.responseText).movies;
         var table = document.getElementById('movie-list');
        //  console.log(table.children);

         //construct array of new table elements
         var filtered = [];
         for(var i = 0; i < movies.length; i++){
           var movie = movies[i];
           var row = document.createElement('tr');

           var title = document.createElement('td');
           var titleText = document.createTextNode(movie.title);
           title.appendChild(titleText);

           var director = document.createElement('td');
           var directorText = document.createTextNode(movie.director);
           director.appendChild(directorText);

           var year = document.createElement('td');
           var yearText = document.createTextNode(movie.year);
           year.appendChild(yearText);

           row.appendChild(title);
           row.appendChild(director);
           row.appendChild(year);
           filtered.push(row);
         }

         //empty out current table and replace with new movies
        for(var i = 0; i < table.children.length; i++){
          var row = table.children[i];
          row.innerHTML = "";
        }
        for(var i = 0; i < filtered.length; i++){
          table.appendChild(filtered[i]);
        }
      }
    }); //end load evt listener

    req.addEventListener('error', function(e){
      document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
    }); //end error

    req.send();
  });

}//end filter btn evt listener

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

    data = "movieTitle=" + title + "&movieDirector=" + director + "&movieYear=" + year;
    // console.log(data);

    //make url and request
    var url = "http://localhost:3000/api/movies/create";
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    req.addEventListener('load', function(){
      //clear text fields for form submission
      document.querySelector("#movieTitle").innerHTML = "";
      document.querySelector("#movieDirector").innerHTML = "";
      document.querySelector("#movieYear").innerHTML = "";

      //repopulate table
      if (req.status >= 200 && req.status < 400) {
        //parse JSON and replace table elements
         var movie = JSON.parse(req.responseText).movies;

         //simulate a click to evt listener button
         document.getElementById('director').value = "";
         document.getElementById('filterBtn').click();

         var table = document.getElementById('movie-list');
         var row = document.createElement('tr');

         var title = document.createElement('td');
         var titleText = document.createTextNode(movie.title);
         title.appendChild(titleText);

         var director = document.createElement('td');
         var directorText = document.createTextNode(movie.director);
         director.appendChild(directorText);

         var year = document.createElement('td');
         var yearText = document.createTextNode(movie.year);
         year.appendChild(yearText);

         row.appendChild(title);
         row.appendChild(director);
         row.appendChild(year);
         table.appendChild(row);
       }
    });
    req.addEventListener('error', function(){
      document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
    });

    req.send(data);

  });


}
