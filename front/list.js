const MongoAPI = "http://localhost:3000"

let addedAnimes = JSON.parse(localStorage.getItem("addedAnimes"))

let reviewForm = document.querySelector('#review-form');

reviewForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  reviewForm = document.querySelector('#review-form');

  //Dados do anime
  const animeTitle = document.getElementById('animeTitle').innerHTML
  const currentEpisode = document.getElementById('currentEpisode').innerHTML
  const animePicture = document.getElementById('animePicture').innerHTML

  //Dados da análise
  const username = reviewForm.elements.inputName.value
  const recommended = reviewForm.elements.btnradio.value
  const reviewText = reviewForm.elements.inputReview.value

  const data = JSON.stringify({
    animeTitle,
    currentEpisode,
    animePicture,
    username,
    recommended,
    reviewText,
  })

  try {
    fetch(`${MongoAPI}/reviews`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
  } catch (error) {
    console.log(error.message)
  }

  clearForm()

});

function clickAddReviewButton(id, title, currentEpisode, picture){
  // //Dados do anime que aparecerão no modal
  const animeInfo = document.querySelector('#anime-info')

  animeInfo.innerHTML = `<h5 class="modal-title" id="reviewModalLabel">Escrever análise</h5>
                        <span class="bold" id="animeTitle">${title}</span>
                        <p>Episódio atual: <span id="currentEpisode">${currentEpisode}</span></p>
                        <p id="animePicture" hidden>${picture}</p>
                        `
}

function clearForm(){
  reviewForm = document.querySelector('#review-form');
  reviewForm.elements.inputName.value = ""
  reviewForm.elements.btnradio.value = null
  reviewForm.elements.inputReview.value = ""
}

function getAnimes(){
    const animesList = document.querySelector('#animes-list');
    let animesListHTML = ""
    !addedAnimes ? animesListHTML = "<p>Nenhum anime adicionado</p>" : addedAnimes.forEach(anime => {
        animesListHTML += `
        <div id=${anime.mal_id} class="card card-margin" style="width: 18rem;">
            <img class="card-img-left" src="${anime.images.jpg.image_url}">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                  <span class="bold">${anime.title}</span><span> (${anime.episodes} episódios)</span>
                  <p>Nota: ${anime.score}</p>
              </div>
              <div>
                <p>Episódio atual: <input id="${"anime_ep_" + anime.mal_id}" value="${anime.currentEpisode}" type="number" min="1" max="${anime.episodes}" onchange="saveCurrentEpisode(${anime.mal_id}, this)"></p>
              </div>
              <div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reviewModal" onclick="clickAddReviewButton(${anime.mal_id},'${anime.title}', ${anime.currentEpisode}, '${anime.images.jpg.image_url}')">Escrever análise</button>
              </div>
            </div>
        </div>
        `
    });
    
    animesList.innerHTML = animesListHTML
  }

function saveCurrentEpisode(id){
  for (const index in addedAnimes)
      if(addedAnimes[index].mal_id == id)
          addedAnimes[index].currentEpisode = document.getElementById("anime_ep_"+id).value

  localStorage.setItem("addedAnimes", JSON.stringify(addedAnimes));
}

const submitBtn = document.getElementById('submit-button');

let username = document.getElementById('inputName')
let recommended = document.getElementById('btnradio1')
let notRecommended = document.getElementById('btnradio2')
let reviewText = document.getElementById('inputReview')

username.addEventListener('change', updateSubmitBtn);
recommended.addEventListener('change', updateSubmitBtn);
notRecommended.addEventListener('change', updateSubmitBtn);
reviewText.addEventListener('change', updateSubmitBtn);

function updateSubmitBtn(){
  let username_ = username.value;
  let recommended_ = recommended.checked
  let notRecommended_ = notRecommended.checked
  let reviewText_ = reviewText.value;

  if(username_ && (recommended_||notRecommended_) && reviewText_){
    submitBtn.removeAttribute('disabled');
  }else {
    submitBtn.setAttribute('disabled', 'disabled');
  }
}

