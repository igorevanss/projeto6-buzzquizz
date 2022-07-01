const container = document.querySelector(".DOMcontainer");
welcome()
const quizzesContainer = document.querySelector(".quizzes-container");
let APIQuizzes;
let title;
let url;
let numberOfQuestions;
let numberOfLevels;
let questionDataStorage = [];
let questionObject = [];

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
  APIQuizzes = success.data;
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
      <input placeholder="Título do seu quizz" type="text" minlength="20" maxlength="65" class="title">
      <div class="hidden">O título deve ter entre 20 e 65 caracteres. :(</div>
      <input type="url" placeholder="URL da imagem do seu quizz" class="url">
      <div class="hidden">O valor informado não é uma URL válida. :(</div>
      <input placeholder="Quantidade de perguntas do quizz" type="number">
      <div class="hidden">O quizz deve ter no mínimo 3 perguntas. :(</div>
      <input placeholder="Quantidade de níveis do quizz" type="number">
      <div class="hidden">O quizz deve ter no mínimo 2 níveis. :(</div>
    </div>
    <button onclick="createQuestions()">Prosseguir para criar perguntas</button>
  </div>`

}

function createQuestions(){
  const allInputs = document.querySelector(".infoContainer");
  title = allInputs.querySelector("input:nth-of-type(1)").value;
  url = allInputs.querySelector("input:nth-of-type(2)").value;
  numberOfQuestions = allInputs.querySelector("input:nth-of-type(3)").value;
  numberOfLevels = allInputs.querySelector("input:nth-of-type(4)").value;
    // if (!titleValidation() || !urlQuizzValidation() || !questionNumberValidation() || !levelNumberValidation()){
    //   titleValidation()
    //   urlQuizzValidation()
    //   questionNumberValidation()
    //   levelNumberValidation()
    // } else{
    container.innerHTML = null;
    container.innerHTML = `
      <div class="questionsQuizz">
        <h2>Crie suas perguntas</h2>
      </div>`
    const questionsContainer = document.querySelector(".questionsQuizz")
    for(let i = 1; i <= numberOfQuestions; i++){
      questionsContainer.innerHTML += 
        `<div class="questionSizes">
          <div class="miniQuestion" onclick="hideOption(this)">
            <h3>Pergunta ${i}</h3>
            <ion-icon name="create-outline"></ion-icon>
          </div>
          <div class="maxiQuestion hidden">
            <div class="questionDescription">
              <h3>Pergunta ${i}</h3>
              <input placeholder="Texto da pergunta" class="title">
              <div class="hidden">O título deve ter, no mínimo, 20 caracteres. :(</div>
              <input placeholder="Cor de fundo da pergunta" class="color">
              <div class="hidden">A cor deve ter o formato hexadecimal, antecedido de '#'. :(</div>
            </div>
            <div class="correctAnswer">
              <h3>Resposta correta</h3>
              <input placeholder="Resposta correta" class="answer">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <input placeholder="URL da imagem" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
            </div>
            <div class="wrongAnswers">
              <h3>Respostas incorretas</h3>
              <input placeholder="Resposta incorreta 1" class="answer">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <input placeholder="URL da imagem 1" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <div></div>
              <input placeholder="Resposta incorreta 2" class="answer">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <input placeholder="URL da imagem 2" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <div></div>
              <input placeholder="Resposta incorreta 3" class="answer">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <input placeholder="URL da imagem 3" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <div></div>
            </div>
          </div>
        </div>` 
    }
    questionsContainer.innerHTML += `<button onclick="createLevels()">Prosseguir para criar níveis</button>`
  //}
}

function titleValidation(){
  let allTitleInput = document.querySelectorAll(".title");
  for (let i = 0; i < allTitleInput.length; i++){
    if(allTitleInput[i].value.length < 20){
      allTitleInput[i].nextElementSibling.classList.remove("hidden");
      allTitleInput[i].nextElementSibling.classList.add("validation");
    } else{
      allTitleInput[i].nextElementSibling.classList.add("hidden");
      allTitleInput[i].nextElementSibling.classList.remove("validation");
    }
  }
  return true
}

function urlQuizzValidation(){
  let urlMessage = document.querySelector(".infoContainer > div:nth-of-type(2)")
  let pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
  if (pattern.test(url)) {
    urlMessage.classList.add("hidden");
    urlMessage.classList.remove("validation");
    return true
  } else {
    urlMessage.classList.remove("hidden");
    urlMessage.classList.add("validation");
    return false
  }
}

function questionNumberValidation(){
  let questionsMessage = document.querySelector(".infoContainer > div:nth-of-type(3)")
  if(numberOfQuestions < 3){
    questionsMessage.classList.remove("hidden");
    questionsMessage.classList.add("validation");
    return false
  } else{
    questionsMessage.classList.add("hidden");
    questionsMessage.classList.remove("validation");
    return true
  }
}

function levelNumberValidation(){
  let levelsMessage = document.querySelector(".infoContainer > div:nth-of-type(4)")
  if(numberOfLevels < 2){
    levelsMessage.classList.remove("hidden");
    levelsMessage.classList.add("validation");
    return false
  } else{
    levelsMessage.classList.add("hidden");
    levelsMessage.classList.remove("validation");
    return true
  }
}

function colorValidation(){
  let allColorInput = document.querySelectorAll(".color");
  for (let i = 0; i < allColorInput.length; i++){
    let patternColor = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"); 
    if (patternColor.test(allColorInput[i].value)) {
      allColorInput[i].nextElementSibling.classList.add("hidden");
      allColorInput[i].nextElementSibling.classList.remove("validation");
    } else {
      allColorInput[i].nextElementSibling.classList.remove("hidden");
      allColorInput[i].nextElementSibling.classList.add("validation");
    }
  }
  return true
}

function generalURLValidation(){
  let allQuestions = document.querySelectorAll(".maxiQuestion")
  let cont = 0;
  let pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
  let answersArray = questionObject.map((value) => value = value.answers)
  for (let i=0; i < allQuestions.length; i++){
    while (cont < answersArray[i].length){
      if (pattern.test(allQuestions[i].querySelectorAll(".url")[cont].value)) {
        allQuestions[i].querySelectorAll(".url")[cont].nextElementSibling.classList.add("hidden");
        allQuestions[i].querySelectorAll(".url")[cont].nextElementSibling.classList.remove("validation");
      } else {
        allQuestions[i].querySelectorAll(".url")[cont].nextElementSibling.classList.remove("hidden");
        allQuestions[i].querySelectorAll(".url")[cont].nextElementSibling.classList.add("validation");
      }
      cont ++
    }
    cont = 0;
  }
  return true
}

function generalTitleValidation(){
  let allQuestions = document.querySelectorAll(".maxiQuestion")
  let cont = 0;
  let answersArray = questionObject.map((value) => value = value.answers)
  for (let i=0; i < allQuestions.length; i++){
    while (cont < answersArray[i].length){
      if (allQuestions[i].querySelectorAll(".answer")[cont].value !== "") {
        allQuestions[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.add("hidden");
        allQuestions[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.remove("validation");
      } else {
        allQuestions[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.remove("hidden");
        allQuestions[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.add("validation");
      }
      cont ++
    }
    cont = 0;
  }
  return true
}

  
function hideOption(element){
  const optionSizes = element.parentNode
  const removeMaximizedQuestion = document.querySelector(".maxiQuestion:not(.hidden)")
  const removeMaximizedLevel = document.querySelector(".maxiLevel:not(.hidden)")
  const defaultMinimizedQuestion = document.querySelector(".miniQuestion.hidden")
  const defaultMinimizedLevel = document.querySelector(".miniLevel.hidden")
  const maximizedQuestion = optionSizes.querySelector(".maxiQuestion");
  const maximizedLevel = optionSizes.querySelector(".maxiLevel");
  if(optionSizes.classList.contains("questionSizes")){
    if(removeMaximizedQuestion != null){
      removeMaximizedQuestion.classList.add("hidden")
      defaultMinimizedQuestion.classList.remove("hidden")
    }
    element.classList.add("hidden")
    maximizedQuestion.classList.remove("hidden")
  } else {
    if(removeMaximizedLevel != null){
      removeMaximizedLevel.classList.add("hidden")
      defaultMinimizedLevel.classList.remove("hidden")
    }
    element.classList.add("hidden")
    maximizedLevel.classList.remove("hidden")
  }
}

function createLevels(){
  const question = document.querySelectorAll(".maxiQuestion");
  questionDataStorage = [];
  let questionInfo = [];
  let correct = [];
  let wrong = [];

  for(let i = 0; i < question.length; i++){
    let isValidAnswer2 = question[i].querySelector(".wrongAnswers > input:nth-of-type(3)").value
    let isValidAnswer3 = question[i].querySelector(".wrongAnswers > input:nth-of-type(5)").value
    let isValidURL2 = question[i].querySelector(".wrongAnswers > input:nth-of-type(4)").value
    let isValidURL3 = question[i].querySelector(".wrongAnswers > input:nth-of-type(6)").value
    questionInfo.push(question[i].querySelector(".questionDescription > input:nth-of-type(1)").value);
    questionInfo.push(question[i].querySelector(".questionDescription > input:nth-of-type(2)").value);
    correct.push(question[i].querySelector(".correctAnswer > input:nth-of-type(1)").value);
    correct.push(question[i].querySelector(".correctAnswer > input:nth-of-type(2)").value);
    wrong.push(question[i].querySelector(".wrongAnswers > input:nth-of-type(1)").value);
    wrong.push(question[i].querySelector(".wrongAnswers > input:nth-of-type(2)").value);
    if (isValidAnswer2 != "" || isValidURL2 !== ""){
      wrong.push(question[i].querySelector(".wrongAnswers > input:nth-of-type(3)").value);
      wrong.push(question[i].querySelector(".wrongAnswers > input:nth-of-type(4)").value);
    } 
    if (isValidAnswer3 != "" || isValidURL3 !== ""){
      wrong.push(question[i].querySelector(".wrongAnswers > input:nth-of-type(5)").value);
      wrong.push(question[i].querySelector(".wrongAnswers > input:nth-of-type(6)").value);
    }
    questionDataStorage.push([questionInfo, correct, wrong])
    questionInfo = [];
    correct = [];
    wrong = [];
  }

  createQuestionObject()
    // if (!titleValidation() || !generalURLValidation() || !colorValidation() || !generalTitleValidation()){
    //   titleValidation()
    //   generalURLValidation()
    //   colorValidation();
    //   generalTitleValidation()
    //  } else{

      container.innerHTML = null;
      container.innerHTML = `
        <div class="quizzLevels">
          <h2>Agora, decida os níveis!</h2>
        </div>`
      const levelsContainer = document.querySelector(".quizzLevels")
      for(let i = 1; i <= numberOfLevels; i++){
        levelsContainer.innerHTML += `
        <div class="levelSizes">
          <div class="miniLevel" onclick="hideOption(this)">
            <h3>Nível ${i}</h3>
            <ion-icon name="create-outline"></ion-icon>
          </div>
          <div class="maxiLevel hidden">
            <h3>Nível ${i}</h3>
            <input placeholder="Título do nível">
            <input placeholder="% de acerto mínima">
            <input placeholder="URL da imagem do nível">
            <input placeholder="Descrição do nível">
          </div>
        </div>`
      }
      levelsContainer.innerHTML += `<button onclick="reload()">Finalizar Quizz</button>`
  }


function createQuestionObject(){
  questionObject = [];
  let urlPosition = 1
  let wrongPosition = 0
  for (let i = 0; i < questionDataStorage.length; i++){
    questionObject.push({
			title: questionDataStorage[i][0][0],
			color: questionDataStorage[i][0][1],
			answers: [
				{
					text: questionDataStorage[i][1][0],
					image: questionDataStorage[i][1][1],
					isCorrectAnswer: true
				},
			]
		})
  }
  for (let i = 0; i < questionDataStorage.length; i++){
    
    for(let ansNum = 0; ansNum < questionDataStorage[i][2].length/2 ;ansNum++){
      questionObject[i].answers.push({
        text: questionDataStorage[i][2][wrongPosition],
        image: questionDataStorage[i][2][urlPosition],
        isCorrectAnswer: false
      })
      wrongPosition += 2;
      urlPosition += 2;
    }
      wrongPosition = 0;
      urlPosition = 1;
  }
}


function goToQuizz(){
  container.innerHTML = null;
  container.innerHTML = `
  <main>
    <div class="banner-quizz">
      <div class="opacity60">
        <p>${APIQuizzes[1].title}</p>
      </div>
      <img src="${APIQuizzes[1].image}" alt="" />
    </div>
    <div class="play-quizz">
      <div class="banner-play-quizz">
        <p>${APIQuizzes[1].questions[0].title}</p>
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


