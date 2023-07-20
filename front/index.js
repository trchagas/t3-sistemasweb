const MongoAPI = "https://fragile-pig-hose.cyclic.app"

async function getReviews(){
    const reviewsList = document.querySelector('#reviews-list');
    try {
      fetch(`${MongoAPI}/reviews`)
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        let reviewsListHTML = ""
        !data ? reviewsListHTML = "<p>Nenhuma análise foi encontrada</p>" : data.forEach(anime => {
        reviewsListHTML += `
          <div class="card mb-3" style="width: 800px; min-height: 320px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${anime.animePicture}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${anime.username} ${anime.recommended ? "recomenda:" : "não recomenda:"}</h5>
                  <h4 class="card-title">${anime.animeTitle}</h5>
                  <p class="card-text text-muted">Episódio atual do usuário: ${anime.currentEpisode}</p>
                  <p class="card-text scroll">${anime.reviewText}</p>
                  
                </div>
              </div>
            </div>
          </div>
        
          `
        });
        reviewsList.innerHTML = reviewsListHTML

        })
    } catch (error) {
      console.log(error.message)
    }
  }