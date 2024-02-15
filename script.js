$.ajax({
  url: "http://www.omdbapi.com/?apikey=20a84982&s=Avenger",
  success: (results) => {
    const movies = results.Search;
    // getMovies(movies);
    let cards = "";
    movies.map((movie) => {
      cards += ` <div class="col-md-4 my-3">
              <div class="card">
                <img src=${movie.Poster} class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                  <p class="card-text"></p>
                  <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Detais</a>
                </div>
              </div>
            </div>`;
    });
    $(".movie-container").html(cards);
    //ketika tombol detail di klik
    $(".modal-detail-button").on("click", function () {
      $.ajax({
        url:
          `http://www.omdbapi.com/?apikey=20a84982&i=` + $(this).data("imdbid"),
        success: (m) => {
          const movieDetail = ` <div class="container-fluid">
                                <div class="row">
                                <div class="col-md-3">
                                    <img src="${m.Poster}" class="img-fluid" />
                                </div>
                                <div class="col-md">
                                    <ul class="list-group">
                                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                                    <li class="list-group-item">
                                        <strong>Director : </strong>${m.Director}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Actors : </strong>${m.Actors}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Writer : </strong> ${m.Writer}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Plot : </strong>${m.Plot}
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>`;
          $(".modal-body").html(movieDetail);
        },
        error: (e) => {
          console.log(e);
        },
      });
    });
  },
  error: (e) => {
    console.log(e);
  },
});

// const movieContainer = document.getElementById("movie-container");

// const getMovies = (result) => {
//   result.map((movie) => {
//     console.log(movie);
//     movieContainer.innerHTML += ` <div class="col-md-4 my-3">
//           <div class="card">
//             <img src=${movie.Poster} class="card-img-top" />
//             <div class="card-body">
//               <h5 class="card-title">${movie.Title}</h5>
//               <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
//               <p class="card-text"></p>
//               <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetailModal">Show Detais</a>
//             </div>
//           </div>
//         </div>`;
//   });
// };
