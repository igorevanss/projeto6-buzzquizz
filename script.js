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


//popLevel();
//popQuestions();

function popQuestions(){
  const questionsContainer = document.querySelector(".questionsQuizz");
  questionsContainer.innerHTML = `
    <h2>Crie suas perguntas</h2>
    <div class="miniQuestion" onclick="hideOption(this)">
      <h3>Pergunta 2</h3>
      <ion-icon name="create-outline"></ion-icon>
    </div>
    <div class="miniQuestion" onclick="hideOption(this)">
      <h3>Pergunta 2</h3>
      <ion-icon name="create-outline"></ion-icon>
    </div>
    <div class="miniQuestion" onclick="hideOption(this)">
      <h3>Pergunta 3</h3>
      <ion-icon name="create-outline"></ion-icon>
    </div>
    <button>Prosseguir para criar níveis</button>`
}

function popLevel(){
  const levelContainer = document.querySelector(".quizzLevels");
  levelContainer.innerHTML = `
    <h2>Agora, decida os níveis!</h2>
    <div class="miniLevel" onclick="hideOption(this)">
      <h3>Nível 2</h3>
      <ion-icon name="create-outline"></ion-icon>
    </div>
    <div class="miniLevel" onclick="hideOption(this)">
      <h3>Nível 2</h3>
      <ion-icon name="create-outline"></ion-icon>
    </div>
    <div class="miniLevel" onclick="hideOption(this)">
      <h3>Nível 2</h3>
      <ion-icon name="create-outline"></ion-icon>
    </div>
    <button>Finalizar Quizz</button>`
  }

function hideOption(element){
  const optionType = element.parentNode
  const maximizedQuestion = optionType.querySelector(".maxiQuestion");
  const maximizedLevel = optionType.querySelector(".maxiLevel");
  if(optionType.classList.contains("questionsQuizz")){
    if (element.classList.contains("maxiQuestion")){
      return
    } else {
      element.classList.add("maxiQuestion")
      element.classList.remove("miniQuestion")
      element.innerHTML = `
          <div class="questionDescription">
            <h3>Pergunta 1</h3>
            <input placeholder="Texto da pergunta">
            <input placeholder="Cor de fundo da pergunta">
          </div>
          <div class="correctAnswer">
            <h3>Resposta correta</h3>
            <input placeholder="Resposta correta">
            <input placeholder="URL da imagem">
          </div>
          <div class="wrongAnswers">
            <h3>Respostas incorretas</h3>
            <input placeholder="Resposta incorreta 1">
            <input placeholder="URL da imagem 1">
            <div></div>
            <input placeholder="Resposta incorreta 2">
            <input placeholder="URL da imagem 2">
            <div></div>
            <input placeholder="Resposta incorreta 3">
            <input placeholder="URL da imagem 3">
            <div></div>
          </div>
          `
      maximizedQuestion.classList.remove("maxiQuestion")
      maximizedQuestion.classList.add("miniQuestion")
      maximizedQuestion.innerHTML = `
        <h3>Pergunta 2</h3>
        <ion-icon name="create-outline"></ion-icon>
        `
    }
  } else {
    if (element.classList.contains("maxiLevel")){
      return
    } else {
      element.classList.add("maxiLevel")
      element.classList.remove("miniLevel")
      element.innerHTML = `
          <h3>Nível 1</h3>
          <input placeholder="Título do nível">
          <input placeholder="% de acerto mínima">
          <input placeholder="URL da imagem do nível">
          <input placeholder="Descrição do nível">
        `
      maximizedLevel.classList.remove("maxiLevel")
      maximizedLevel.classList.add("miniLevel")
      maximizedLevel.innerHTML = `
          <h3>Nível 2</h3>
          <ion-icon name="create-outline"></ion-icon>
        `
    }
  }
}


