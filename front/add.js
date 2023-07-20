const API_URL = 'https://api.jikan.moe/v4';
const searchForm = document.querySelector('#search-form');
const animeDetails = document.querySelector('#anime-details');

let addedAnimes = []
let animesList = [];

searchForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const animeTitle = searchForm.elements.anime.value;
  const response = await fetch(`${API_URL}/anime?q=${encodeURIComponent(animeTitle)}`);
  const results = await response.json();
  animesList = results.data;
  let animesListHTML = ""
  animesList.forEach(anime => {
      animesListHTML += `
      <div id=${anime.mal_id} class="card card-margin" style="width: 18rem;">
        <img class="card-img-left" src="${anime.images.jpg.image_url}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <span class="bold">${anime.title}</span><span> (${anime.episodes} episódios)</span>
            <p>Nota: ${anime.score}</p>
          </div>
          <div>
            <button type="button" onclick="addAnime(${anime.mal_id})" class="btn btn-primary">Adicionar</button>
          </div>
        </div>
      </div>
    `

  });
  animeDetails.innerHTML = animesListHTML
});

function addAnime(id){
  addedAnimes = JSON.parse(localStorage.getItem("addedAnimes"))
  if(!addedAnimes) addedAnimes = []
  if(addedAnimes.filter(anime => anime.mal_id == id).length == 0){
    newAnime = animesList.find(anime => anime.mal_id == id);
    newAnime.currentEpisode = 1;
    addedAnimes = addedAnimes ? [...addedAnimes, newAnime] : [newAnime]
    localStorage.setItem("addedAnimes", JSON.stringify(addedAnimes));
  }
}

