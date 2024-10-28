const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjdjNTkwZjE1Mjg2MzI4OGMyMWVlODVjNjVlM2I2NCIsIm5iZiI6MTczMDA3NjEwMC40NDA0MzEsInN1YiI6IjY3MWFmMzJhNDU0MmUzNzFmZTBhNmQyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QnST5rCFdf4suNZHJ3S2yGYmDECM9uHiDYv2XIGlnXw',
   },
}

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getPlayingtvs = async (url) => {
   try {
      const response = await fetch(url, options)

      const data = await response.json()
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break

            const tv = results[index]
            const posterPath = tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : './images/placeholder.png'

            rowHtml += ` 
               <div class="col-sm-3 p-3">
                  <div class="card">
                     <a href="./detail2.html?tv_id=${tv.id}">
                        <img src="${posterPath}" class="card-img-top poster" alt="${tv.name}" />
                     </a>
                     <div class="card-body">
                        <p class="card-text title">${tv.name}</p>
                        <p class="card-text average">${tv.vote_average}점</p>
                     </div>
                  </div>
               </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러 발생: ', error)
   }
}

getPlayingtvs(url)
