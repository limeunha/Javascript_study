const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjdjNTkwZjE1Mjg2MzI4OGMyMWVlODVjNjVlM2I2NCIsIm5iZiI6MTczMDA3NjEwMC40NDA0MzEsInN1YiI6IjY3MWFmMzJhNDU0MmUzNzFmZTBhNmQyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QnST5rCFdf4suNZHJ3S2yGYmDECM9uHiDYv2XIGlnXw',
   },
}

const urlParams = new URLSearchParams(window.location.search)

const tvId = urlParams.get('tv_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

//1
const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
         <div class="row">
                  <div class="col-sm-3" style="text-align:center">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%" />
                  </div>
                  <div class="col-sm-9">
                     <h2>${data.name}</h2>
                     <ul class="tv-info">
                     <li>원제 ${data.original_name}, ${data.original_language}</li>
                     <p>평점 : ${Number(data.vote_average.toFixed(1)) === 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <li>최근방영날짜 : ${data.last_air_date}</li>
                     <li>처음방영날짜 : ${data.first_air_date}</li>
                     <li>줄거리 : ${data.overview}</li>
                     </ul>
                     </div>
                     <ul class ="tv-content">
                     <li>${data.seasons[0]}</li>
                     <li>${data.seasons.air_date}</li>
                     </ul>
               </div>`

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.log('에러 발생: ', error)
   }
}

getDetailTv(tvDetailUrl)

//2
