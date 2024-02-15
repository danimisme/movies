// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=20a84982&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.map((movie) => {
//         cards += showCards(movie);
//       });
//       $(".movie-container").html(cards);
//       //ketika tombol detail di klik
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             `http://www.omdbapi.com/?apikey=20a84982&i=` +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e);
//     },
//   });
// });

// fetch

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch(`http://www.omdbapi.com/?apikey=20a84982&s=${inputKeyword.value}`).then(
    (response) =>
      response.json().then((response) => {
        const movies = response.Search;
        let cards = "";
        movies.forEach((m) => (cards += showCards(m)));
        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = cards;

        //ketika tombol detail di klik

        const modalDetailButton = document.querySelectorAll(
          ".modal-detail-button"
        );
        modalDetailButton.forEach((btn) => {
          btn.addEventListener("click", function () {
            const imdbid = this.dataset.imdbid;
            fetch(`http://www.omdbapi.com/?apikey=20a84982&i=${imdbid}`)
              .then((response) => response.json())
              .then((m) => {
                const movieDetail = showMovieDetail(m);
                const modalBody = document.querySelector(".modal-body");
                modalBody.innerHTML = movieDetail;
              });
          });
        });
      })
  );
});

function showCards(movie) {
  return ` <div class="col-md-4 my-3">
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
}

function showMovieDetail(m) {
  return ` <div class="container-fluid">
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
}
