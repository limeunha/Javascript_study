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

// 1
const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w200${data.poster_path}`
      const year = data.last_air_date.substring(0, 4)

      const rowHtml = `
         <div class="row" >
            <div class="col-sm-5" style="text-align:right" >
            <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%","text-align:center" />
            </div>
            <div class="col-sm-5" style ="display=flex">
              <h2>${data.name}(${year})</h2>
               <ul class="tv-info">
                  <li>원제: ${data.original_name}, ${data.original_language}</li>
                  <p>평점: ${Number(data.vote_average.toFixed(1)) === 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                  <li>최근 방영 날짜: ${data.last_air_date}</li>
                  <li>처음 방영 날짜: ${data.first_air_date}</li>
                  </br>
                  <li>줄거리: ${data.overview || '줄거리가 없습니다.'}</li>
               </ul>
            </div>
         </div>
         `

      mainContainer.innerHTML = rowHtml

      // 2
      let seasonsHtml = '시즌 정보가 없습니다.'
      if (Array.isArray(data.seasons) && data.seasons.length > 0) {
         seasonsHtml = ''
         data.seasons.forEach((season) => {
            seasonsHtml += `
            
               <p style ="text-align: center"> ${season.name || '정보없음'} (평점 ${season.vote_average || '정보없음'}) 보러가기 - ${season.air_date || '정보없음'} 방영</p>
            
               `
         })
      }

      // 3
      mainContainer.innerHTML += `<div class ="tv_content">${seasonsHtml}<div>`
   } catch (error) {
      console.error('에러 발생: ', error)
   }
}

getDetailTv(tvDetailUrl)
