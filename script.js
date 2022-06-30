const container = document.querySelector(".DOMcontainer");
welcome()
const quizzesContainer = document.querySelector(".quizzes-container");
let title;
let url;
let numberOfQuestions;
let numberOfLevels;


function welcome(){
  const container = document.querySelector(".DOMcontainer");
  container.innerHTML = null
  container.innerHTML += `
    <main>
      <div class="make-quizz">
        <span>Você não criou nenhum quizz ainda :(</span>
        <button onclick="initialInfoQuizz()">Criar Quizz</button>
      </div>
      <div class="all-quizzes">
        <h2>Todos os Quizzes</h2>
        <div class="quizzes-container"></div>
      </div>
    </main>`
  getQuizzes()
}

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
    <div onclick="goToQuizz()">
      <img src=${APIQuizzes[i].image}>
      <h3>${APIQuizzes[i].title}</h3>
      <div class="opacity"></div>
    </div>`
  }
}

function initialInfoQuizz(){
  container.innerHTML = null;
  container.innerHTML = `
  <div class="basicInfos">
    <h2>Comece pelo começo</h2>
    <div class="infoContainer">
      <input placeholder="Título do seu quizz" type="text" minlength="20" maxlength="65">
      <input type="url" placeholder="URL da imagem do seu quizz">
      <input placeholder="Quantidade de perguntas do quizz" type="number" min="3">
      <input placeholder="Quantidade de níveis do quizz" type="number" min="2">
    </div>
    <button onclick="createQuestions()">Prosseguir para criar perguntas</button>
  </div>`

}

function createQuestions(){
  const allInputs = document.querySelector(".infoContainer");
  title = allInputs.querySelector("input:nth-child(1)").value;
  url = allInputs.querySelector("input:nth-child(2)").value;
  numberOfQuestions = allInputs.querySelector("input:nth-child(3)").value;
  numberOfLevels = allInputs.querySelector("input:nth-child(4)").value;
  container.innerHTML = null;
  container.innerHTML = `
    <div class="questionsQuizz">
      <h2>Crie suas perguntas</h2>
      <div class="maxiQuestion" onclick="hideOption(this)">
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
      </div>
      <div class="miniQuestion" onclick="hideOption(this)">
        <h3>Pergunta 2</h3>
        <ion-icon name="create-outline"></ion-icon>
      </div>
      <div class="miniQuestion" onclick="hideOption(this)">
        <h3>Pergunta 3</h3>
        <ion-icon name="create-outline"></ion-icon>
      </div>
      <button>Prosseguir para criar níveis</button>
    </div>`
}


function goToQuizz(){
  container.innerHTML = null;
  container.innerHTML = `
  <main>
    <div class="banner-quizz">
      <div class="opacity60">
        <p>O quão Potterhead é você?</p>
      </div>
      <img src="" alt="" />
    </div>
    <div class="play-quizz">
      <div class="banner-play-quizz">
        <p>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</p>
      </div>
      <div class="answers-quizz">
        <div class="answer">
          <img src="" alt="" />
          <p>Gatinho</p>
        </div>
        <div class="answer">
          <img src="" alt="" />
          <p>Gatinho</p>
        </div>
        <div class="answer">
          <img src="" alt="" />
          <p>Gatinho</p>
        </div>
        <div class="answer">
          <img src="" alt="" />
          <p>Gatinho</p>
        </div>
      </div>
    </div>
    <div class="finishing-quizz">
      <div class="banner-finishing-quizz">
        <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p>
      </div>
      <div class="finishing-quizz-content">
        <img src="" alt="" />
        <p>
          Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop
          infinito de comida e clique no botão abaixo para usar o vira-tempo
          e reiniciar este teste.
        </p>
      </div>
    </div>
    <button><p>Reiniciar Quizz</p></button>
    <p onclick="reload()">Voltar pra home</p>
  </main>`
}

function reload(){
  window.location.reload()
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


