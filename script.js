const quizzesContainer = document.querySelector(".quizzes-container");

getQuizzes()

function getQuizzes(){
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
  promise.catch((error) => {
    alert("Ocorreu um erro inesperado. A página será recarregada.");
    window.location.reload();
  })
  promise.then(renderQuizzes)
}

function renderQuizzes(success){
  let APIQuizzes = success.data;
  quizzesContainer.innerHTML = null;
  for (let i = 0; i < APIQuizzes.length; i++){
    quizzesContainer.innerHTML += `
    <div>
      <img src=${APIQuizzes[i].image}>
      <h3>${APIQuizzes[i].title}</h3>
      <div class="opacity"></div>
    </div>`
  }
}



