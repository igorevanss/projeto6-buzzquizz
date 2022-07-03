const container = document.querySelector('.DOMcontainer')
let myQuizzesArray = []
welcome()
const quizzesContainer = document.querySelector('.quizzes-container')
let APIQuizzes
let title
let url
let numberOfQuestions
let numberOfLevels
let questionDataStorage = []
let questionObject = []
let levelDataStorage = []
let levelObject = []
let objectQuizz = []
let valueQuizz
let correctAnswer

function welcome() {
  const container = document.querySelector('.DOMcontainer')
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

  if (localStorage.length !== 0) {
    container.innerHTML = null
    container.innerHTML += `
    <main>
      <div class="myQuizzes">
        <div class="myQuizzesHeader">
          <h2>Seus Quizzes</h2>
          <ion-icon name="add-circle-sharp" onclick="initialInfoQuizz()"></ion-icon>
        </div>
        <div class="myQuizzesContainer"></div>
      </div>
      <div class="all-quizzes">
        <h2>Todos os Quizzes</h2>
        <div class="quizzes-container"></div>
      </div>
    </main>`
    getMyQuizzes()
  }
}

function getMyQuizzes() {
  for (let i = 0; i < localStorage.length; i++) {
    const getLocal = localStorage.getItem(localStorage.key(i))
    const myQuizz = JSON.parse(getLocal)
    myQuizzesArray.push(myQuizz)
  }
  renderMyQuizzes()
}

function renderMyQuizzes() {
  let myQuizzesContainer = document.querySelector('.myQuizzesContainer')
  myQuizzesContainer.innerHTML = null
  for (let i = 0; i < myQuizzesArray.length; i++) {
    myQuizzesContainer.innerHTML += `
    <div onclick="goToQuizz(this)" id="${myQuizzesArray[i].id}">
      <img src=${myQuizzesArray[i].image}>
      <h3>${myQuizzesArray[i].title}</h3>
      <div class="opacity"></div>
    </div>`
  }
}

function getQuizzes() {
  const promise = axios.get(
    'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
  )
  promise.catch(error => {
    alert('Ocorreu um erro inesperado. A página será recarregada.')
    window.location.reload()
  })
  promise.then(renderQuizzes)
}

function renderQuizzes(success) {
  APIQuizzes = success.data
  quizzesContainer.innerHTML = null
  for (let i = 0; i < APIQuizzes.length; i++) {
    quizzesContainer.innerHTML += `
    <div onclick="goToQuizz(this)" id="${APIQuizzes[i].id}">
      <img src=${APIQuizzes[i].image}>
      <h3>${APIQuizzes[i].title}</h3>
      <div class="opacity"></div>
    </div>
    `
  }
}

function initialInfoQuizz() {
  container.innerHTML = null
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
  </div>
  `
}

function createQuestions() {
  const allInputs = document.querySelector('.infoContainer')
  title = allInputs.querySelector('input:nth-of-type(1)').value
  url = allInputs.querySelector('input:nth-of-type(2)').value
  numberOfQuestions = allInputs.querySelector('input:nth-of-type(3)').value
  numberOfLevels = allInputs.querySelector('input:nth-of-type(4)').value
  if (titleValidation() || urlQuizzValidation() || questionNumberValidation() || levelNumberValidation()) {
    titleValidation()
    urlQuizzValidation()
    questionNumberValidation()
    levelNumberValidation()
  } else {
    container.innerHTML = null
    container.innerHTML = `
      <div class="questionsQuizz">
        <h2>Crie suas perguntas</h2>
      </div>
      `
    const questionsContainer = document.querySelector('.questionsQuizz')
    for (let i = 1; i <= numberOfQuestions; i++) {
      questionsContainer.innerHTML += `<div class="questionSizes">
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
              <div class="hidden">Você não pode deixar essa resposta vazia. :(</div>
              <input placeholder="URL da imagem" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
            </div>
            <div class="wrongAnswers">
              <h3>Respostas incorretas</h3>
              <input placeholder="Resposta incorreta 1" class="answer">
              <div class="hidden">Você não pode deixar essa resposta vazia. :(</div>
              <input placeholder="URL da imagem 1" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <div></div>
              <input placeholder="Resposta incorreta 2" class="answer">
              <div class="hidden">Você não pode deixar essa resposta vazia. :(</div>
              <input placeholder="URL da imagem 2" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <div></div>
              <input placeholder="Resposta incorreta 3" class="answer">
              <div class="hidden">Você não pode deixar essa resposta vazia. :(</div>
              <input placeholder="URL da imagem 3" class="url">
              <div class="hidden">O valor informado não é uma URL válida. :(</div>
              <div></div>
            </div>
          </div>
        </div>
        `
    }
    questionsContainer.innerHTML += `<button onclick="createLevels()">Prosseguir para criar níveis</button>`
  }
}

function titleValidation() {
  let bool
  let allTitleInput = document.querySelectorAll('.title')
  for (let i = 0; i < allTitleInput.length; i++) {
    if (allTitleInput[i].value.length < 20) {
      allTitleInput[i].nextElementSibling.classList.remove('hidden')
      allTitleInput[i].nextElementSibling.classList.add('validation')
      allTitleInput[i].classList.add('invalidInput')
      if (bool === true || bool === undefined){
        bool = true;
      } else {bool = true}
    } else {
      allTitleInput[i].nextElementSibling.classList.add('hidden')
      allTitleInput[i].nextElementSibling.classList.remove('validation')
      allTitleInput[i].classList.remove('invalidInput')
      if (bool === true){
        bool = true;
      } else {bool = false}
    }
  }
  return bool
}

function urlQuizzValidation() {
  let urlMessage = document.querySelector('.infoContainer > div:nth-of-type(2)')
  let input = document.querySelector('.infoContainer > input:nth-of-type(2)')
  let pattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$','i')
  if (pattern.test(url)) {
    urlMessage.classList.add('hidden')
    urlMessage.classList.remove('validation')
    input.classList.remove('invalidInput')
    return false
  } else {
    urlMessage.classList.remove('hidden')
    urlMessage.classList.add('validation')
    input.classList.add('invalidInput')
    return true
  }
}

function questionNumberValidation() {
  let questionsMessage = document.querySelector('.infoContainer > div:nth-of-type(3)')
  let input = document.querySelector('.infoContainer > input:nth-of-type(3)')
  if (numberOfQuestions < 3) {
    questionsMessage.classList.remove('hidden')
    questionsMessage.classList.add('validation')
    input.classList.add('invalidInput')
    return true
  } else {
    questionsMessage.classList.add('hidden')
    questionsMessage.classList.remove('validation')
    input.classList.remove('invalidInput')
    return false
  }
}

function levelNumberValidation() {
  let levelsMessage = document.querySelector(
    '.infoContainer > div:nth-of-type(4)'
  )
  let input = document.querySelector('.infoContainer > input:nth-of-type(4)')
  if (numberOfLevels < 2) {
    levelsMessage.classList.remove('hidden')
    levelsMessage.classList.add('validation')
    input.classList.add('invalidInput')
    return true
  } else {
    levelsMessage.classList.add('hidden')
    levelsMessage.classList.remove('validation')
    input.classList.remove('invalidInput')
    return false
  }
}

function colorValidation() {
  let bool
  let allColorInput = document.querySelectorAll('.color')
  for (let i = 0; i < allColorInput.length; i++) {
    let patternColor = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    if (patternColor.test(allColorInput[i].value)) {
      allColorInput[i].nextElementSibling.classList.add('hidden')
      allColorInput[i].nextElementSibling.classList.remove('validation')
      allColorInput[i].classList.remove('invalidInput')
      if (bool === true){
        bool = true;
      } else {bool = false}
    } else {
      allColorInput[i].nextElementSibling.classList.remove('hidden')
      allColorInput[i].nextElementSibling.classList.add('validation')
      allColorInput[i].classList.add('invalidInput')
      if (bool === true || bool === undefined){
        bool = true;
      } else {bool = true}
    }
  }
  return bool
}

function questionURLValidation(){
  let bool;
  let allMaxi = document.querySelectorAll(".maxiQuestion")
  let cont = 0;
  let pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
  for (let i=0; i < allMaxi.length; i++){
    while (cont < questionObject[i].answers.length){
      if (pattern.test(allMaxi[i].querySelectorAll(".url")[cont].value) || allMaxi[i].querySelectorAll(".url")[cont].value !== "") {
        allMaxi[i].querySelectorAll(".url")[cont].nextElementSibling.classList.add("hidden");
        allMaxi[i].querySelectorAll(".url")[cont].nextElementSibling.classList.remove("validation");
        allMaxi[i].querySelectorAll(".url")[cont].classList.remove("invalidInput");
        if (bool === true){
          bool = true;
        } else {bool = false}
      } else {
        allMaxi[i].querySelectorAll(".url")[cont].nextElementSibling.classList.remove("hidden");
        allMaxi[i].querySelectorAll(".url")[cont].nextElementSibling.classList.add("validation");
        allMaxi[i].querySelectorAll(".url")[cont].classList.add("invalidInput");
        if (bool === true || bool === undefined){
          bool = true;
        } else {bool = true}
      }
      cont++
    }
    cont = 0
  }
  return bool
}



function questionTitleValidation(){
  let bool;
  let allMaxi = document.querySelectorAll(".maxiQuestion")
  let cont = 0;
  for (let i=0; i < allMaxi.length; i++){
    while (cont < questionObject[i].answers.length){
      if (allMaxi[i].querySelectorAll(".answer")[cont].value !== "") {
        allMaxi[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.add("hidden");
        allMaxi[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.remove("validation");
        allMaxi[i].querySelectorAll(".answer")[cont].classList.remove("invalidInput");
        if (bool === true){
          bool = true;
        } else {bool = false}
      } else {
        allMaxi[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.remove("hidden");
        allMaxi[i].querySelectorAll(".answer")[cont].nextElementSibling.classList.add("validation");
        allMaxi[i].querySelectorAll(".answer")[cont].classList.add("invalidInput");
        if (bool === true || bool === undefined){
          bool = true;
        } else {bool = true}
      }
      cont++
    }
    cont = 0
  }
  return bool
}

function levelTitleValidation() {
  let bool
  let allTitleInput = document.querySelectorAll('.title')
  for (let i = 0; i < allTitleInput.length; i++) {
    if (allTitleInput[i].value.length < 10) {
      allTitleInput[i].nextElementSibling.classList.remove('hidden')
      allTitleInput[i].nextElementSibling.classList.add('validation')
      allTitleInput[i].classList.add('invalidInput')
      if (bool === true || bool === undefined){
        bool = true;
      } else {bool = true}
    } else {
      allTitleInput[i].nextElementSibling.classList.add('hidden')
      allTitleInput[i].nextElementSibling.classList.remove('validation')
      allTitleInput[i].classList.remove('invalidInput')
      if (bool === true){
        bool = true;
      } else {bool = false}
    }
  }
  return bool
}

function levelUrlValidation() {
  let bool
  let totalMaxi = document.querySelectorAll('.url')
  let pattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$','i')
  for (let i = 0; i < totalMaxi.length; i++) {
    if (pattern.test(totalMaxi[i].value)) {
      totalMaxi[i].nextElementSibling.classList.add('hidden')
      totalMaxi[i].nextElementSibling.classList.remove('validation')
      totalMaxi[i].classList.remove('invalidInput')
      if (bool === true){
        bool = true;
      } else {bool = false}
    } else {
      totalMaxi[i].nextElementSibling.classList.remove('hidden')
      totalMaxi[i].nextElementSibling.classList.add('validation')
      totalMaxi[i].classList.add('invalidInput')
      if (bool === true || bool === undefined){
        bool = true;
      } else {bool = true}
    }
  }
  return bool
}

function levelDescriptionValidation() {
  let bool
  let allDescriptionInput = document.querySelectorAll('.description')
  for (let i = 0; i < allDescriptionInput.length; i++) {
    if (allDescriptionInput[i].value.length < 30) {
      allDescriptionInput[i].nextElementSibling.classList.remove('hidden')
      allDescriptionInput[i].nextElementSibling.classList.add('validation')
      allDescriptionInput[i].classList.add('invalidInput')
      if (bool === true || bool === undefined){
        bool = true;
      } else {bool = true}
    } else {
      allDescriptionInput[i].nextElementSibling.classList.add('hidden')
      allDescriptionInput[i].nextElementSibling.classList.remove('validation')
      allDescriptionInput[i].classList.remove('invalidInput')
      if (bool === true){
        bool = true;
      } else {bool = false}
    }
  }
  return bool
}

function levelPercentValidation() {
  let bool
  let allPercentInput = document.querySelectorAll('.minPercent')
  for (let i = 0; i < allPercentInput.length; i++) {
    if (allPercentInput[i].value < 0 || allPercentInput[i].value > 100 || allPercentInput[i].value === '') {
      allPercentInput[i].nextElementSibling.classList.remove('hidden')
      allPercentInput[i].nextElementSibling.classList.add('validation')
      allPercentInput[i].classList.add('invalidInput')
      if (bool === true || bool === undefined){
        bool = true;
      } else {bool = true}
    } else {
      allPercentInput[i].nextElementSibling.classList.add('hidden')
      allPercentInput[i].nextElementSibling.classList.remove('validation')
      allPercentInput[i].classList.remove('invalidInput')
      if (bool === true){
        bool = true;
      } else {bool = false}
    }
  }
  return bool
}

function without0Percent() {
  let zeroPercentInput = document.querySelectorAll('.minPercent')
  for (let i = 0; i < zeroPercentInput.length; i++) {
    if (zeroPercentInput[i].value == 0) {
      return false
    }
  }
  return true
}

function hideOption(element) {
  const optionSizes = element.parentNode
  const removeMaximizedQuestion = document.querySelector('.maxiQuestion:not(.hidden)')
  const removeMaximizedLevel = document.querySelector('.maxiLevel:not(.hidden)')
  const defaultMinimizedQuestion = document.querySelector('.miniQuestion.hidden')
  const defaultMinimizedLevel = document.querySelector('.miniLevel.hidden')
  const maximizedQuestion = optionSizes.querySelector('.maxiQuestion')
  const maximizedLevel = optionSizes.querySelector('.maxiLevel')
  if (optionSizes.classList.contains('questionSizes')) {
    if (removeMaximizedQuestion != null) {
      removeMaximizedQuestion.classList.add('hidden')
      defaultMinimizedQuestion.classList.remove('hidden')
    }
    element.classList.add('hidden')
    maximizedQuestion.classList.remove('hidden')
  } else {
    if (removeMaximizedLevel != null) {
      removeMaximizedLevel.classList.add('hidden')
      defaultMinimizedLevel.classList.remove('hidden')
    }
    element.classList.add('hidden')
    maximizedLevel.classList.remove('hidden')
  }
}

function createLevels() {
  storageQuestionInfos()
  if (titleValidation() || questionURLValidation() || colorValidation() || questionTitleValidation()){
    titleValidation()
    questionURLValidation()
    colorValidation()
    questionTitleValidation()
  } else {
    container.innerHTML = null
    container.innerHTML = `
      <div class="quizzLevels">
        <h2>Agora, decida os níveis!</h2>
      </div>`
    const levelsContainer = document.querySelector('.quizzLevels')
    for (let i = 1; i <= numberOfLevels; i++) {
      levelsContainer.innerHTML += `
      <div class="levelSizes">
        <div class="miniLevel" onclick="hideOption(this)">
          <h3>Nível ${i}</h3>
          <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="maxiLevel hidden">
          <h3>Nível ${i}</h3>
          <input placeholder="Título do nível" class="title">
          <div class="hidden">O título deve ter, pelo menos, 10 caracteres. :(</div>
          <input placeholder="% de acerto mínima"  class="minPercent" type="number">
          <div class="hidden">Insira um valor de 0 a 100. :(</div>
          <input placeholder="URL da imagem do nível" class="url">
          <div class="hidden">O valor informado não é uma URL válida. :(</div>
          <input placeholder="Descrição do nível"  class="description">
          <div class="hidden">A descrição deve ter, pelo menos, 30 caracteres. :(</div>
        </div>
      </div>
      `
    }
    levelsContainer.innerHTML += `<button onclick="successQuizz()">Finalizar Quizz</button>`
  }
}

function storageQuestionInfos() {
  const question = document.querySelectorAll('.maxiQuestion')
  questionDataStorage = []
  let questionInfo = []
  let correct = []
  let wrong = []
  for (let i = 0; i < question.length; i++) {
    let isValidAnswer2 = question[i].querySelector('.wrongAnswers > input:nth-of-type(3)').value
    let isValidAnswer3 = question[i].querySelector('.wrongAnswers > input:nth-of-type(5)').value
    let isValidURL2 = question[i].querySelector('.wrongAnswers > input:nth-of-type(4)').value
    let isValidURL3 = question[i].querySelector('.wrongAnswers > input:nth-of-type(6)').value
    questionInfo.push(question[i].querySelector('.questionDescription > input:nth-of-type(1)').value)
    questionInfo.push(question[i].querySelector('.questionDescription > input:nth-of-type(2)').value)
    correct.push(question[i].querySelector('.correctAnswer > input:nth-of-type(1)').value)
    correct.push(question[i].querySelector('.correctAnswer > input:nth-of-type(2)').value)
    wrong.push(question[i].querySelector('.wrongAnswers > input:nth-of-type(1)').value)
    wrong.push(question[i].querySelector('.wrongAnswers > input:nth-of-type(2)').value)
    if (isValidAnswer2 != '' || isValidURL2 !== '') {
      wrong.push(question[i].querySelector('.wrongAnswers > input:nth-of-type(3)').value)
      wrong.push(question[i].querySelector('.wrongAnswers > input:nth-of-type(4)').value)
    }
    if (isValidAnswer3 != '' || isValidURL3 !== '') {
      wrong.push(question[i].querySelector('.wrongAnswers > input:nth-of-type(5)').value)
      wrong.push(question[i].querySelector('.wrongAnswers > input:nth-of-type(6)').value)
    }
    questionDataStorage.push([questionInfo, correct, wrong])
    questionInfo = []
    correct = []
    wrong = []
  }
  createQuestionObject()
}

function createQuestionObject() {
  questionObject = []
  let urlPosition = 1
  let wrongPosition = 0
  for (let i = 0; i < questionDataStorage.length; i++) {
    questionObject.push({
      title: questionDataStorage[i][0][0],
      color: questionDataStorage[i][0][1],
      answers: [
        {
          text: questionDataStorage[i][1][0],
          image: questionDataStorage[i][1][1],
          isCorrectAnswer: true
        }
      ]
    })
  }
  for (let i = 0; i < questionDataStorage.length; i++) {
    for (
      let ansNum = 0;
      ansNum < questionDataStorage[i][2].length / 2;
      ansNum++
    ) {
      questionObject[i].answers.push({
        text: questionDataStorage[i][2][wrongPosition],
        image: questionDataStorage[i][2][urlPosition],
        isCorrectAnswer: false
      })
      wrongPosition += 2
      urlPosition += 2
    }
    wrongPosition = 0
    urlPosition = 1
  }
}

function successQuizz() {
  storageLevelInfos()
  if (levelTitleValidation() || levelUrlValidation() || levelPercentValidation() || levelDescriptionValidation()) {
    levelTitleValidation()
    levelUrlValidation()
    levelPercentValidation()
    levelDescriptionValidation()
  } else if (without0Percent()) {
    alert('Você precisa definir pelo menos um nível com porcentagem 0!!!')
    return
  } else {
    container.innerHTML = null
    container.innerHTML = `
    <div class="quizzFinished">
      <h2>Seu quizz está pronto!</h2>
      <div>
        <img src="${url}">
        <div class="opacity"></div>
        <p>${title}</p>
      </div>
      <button>Acessar Quizz</button>
      <span onclick="reload()">Voltar pra home</span>
    </div>
    `
  }
}

function storageLevelInfos() {
  const level = document.querySelectorAll('.maxiLevel')
  levelDataStorage = []
  let title
  let image
  let text
  let minValue

  for (let i = 0; i < level.length; i++) {
    title = level[i].querySelector('input:nth-of-type(1)').value
    minValue = level[i].querySelector('input:nth-of-type(2)').value
    image = level[i].querySelector('input:nth-of-type(3)').value
    text = level[i].querySelector('input:nth-of-type(4)').value
    levelDataStorage.push([title, image, text, minValue])
    title = null
    image = null
    text = null
    minValue = null
  }
  createLevelObject()
  objectDone()
}

function createLevelObject() {
  levelObject = []
  for (let i = 0; i < levelDataStorage.length; i++) {
    levelObject.push({
      title: levelDataStorage[i][0],
      image: levelDataStorage[i][1],
      text: levelDataStorage[i][2],
      minValue: levelDataStorage[i][3]
    })
  }
}

function objectDone() {
  objectQuizz = {
    title: title,
    image: url,
    questions: questionObject,
    levels: levelObject
  }
  const promise = axios.post(
    'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',
    objectQuizz
  )
  promise.catch(err => {
    erro = err.response.data
    console.log('erro')
  })
  promise.then(saveQuizz)
}

function saveQuizz(valor) {
  const newQuizz = valor.data
  const newQuizzSerializado = JSON.stringify(newQuizz)
  localStorage.setItem(`${newQuizz.id}`, newQuizzSerializado)
}

function goToQuizz(element) {
  console.log(element.id)
  const promise = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element.id}`
  )
  promise.catch(error => {
    alert('Ocorreu um erro inesperado. A página será recarregada.')
    reload()
  })
  promise.then(injectQuizz)
}

function injectQuizz(header) {
  valueQuizz = header.data

  container.innerHTML = null
  container.innerHTML += `
  <main>
    <div class="banner-quizz">
      <div class="opacity60">
        <p>${valueQuizz.title}</p>
      </div>
      <img src="${valueQuizz.image}" alt="" />
    </div>

    <div class="play-quizz hidden">

    </div>
  </main>
  `
  showquestions()
  questionsQuizz()
}

function showquestions() {
  document.querySelector('.hidden').classList.remove('hidden')
}

function answers() {
  document.querySelector('.answers-quizz').innerHTML = `
  <div class="answer" onclick="ifTrue(this)">
    <img src="${valueQuizz.questions[0].answers[0].image}" alt="" />
    <p>${valueQuizz.questions[0].answers[0].text}</p>
  </div>
  <div class="answer" onclick="ifTrue(this)">
    <img src="${valueQuizz.questions[1].answers[1].image}" alt="" />
    <p>${valueQuizz.questions[1].answers[1].text}</p>
  </div>
  <div class="answer" onclick="ifTrue(this)">
    <img src="${valueQuizz.questions[1].answers[1].image}" alt="" />
    <p>${valueQuizz.questions[1].answers[1].text}</p>
  </div>
  <div class="answer" onclick="ifTrue(this)">
    <img src="${valueQuizz.questions[0].answers[0].image}" alt="" />
    <p>${valueQuizz.questions[0].answers[0].text}</p>
  </div>
  `
}

function ifTrue(clicked) {
  const ifNull = document.querySelector('.selected')
  if (ifNull !== null) {
    ifNull.classList.remove('selected')
  }
  clicked.classList.add('selected')

  console.log(valueQuizz.questions[1].answers[1].isCorrectAnswer)

  correctAnswer = valueQuizz.questions[1].answers[1].isCorrectAnswer;

}

function questionsQuizz() {
  document.querySelector('.play-quizz').innerHTML = `
    <div class="banner-play-quizz">
        <p>${valueQuizz.questions[0].title}</p>
      </div>
      <div class="answers-quizz">
      
      </div>

      <div class="conclusion hidden">
      
    </div>
  `
  answers()
}

function finishQuizz() {
  showquestions()
  document.querySelector('.conclusion').innerHTML = `
    <div class="finishing-quizz">
      <div class="banner-finishing-quizz">
        <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p>
      </div>
      <div class="finishing-quizz-content">
        <img src="" alt="" />
        <p>
          Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop
          infinito de comida e clique no botão abaixo para usar o
          vira-tempo e reiniciar este teste.
        </p>
      </div>
    </div>
    <button onclick=""><p>Reiniciar Quizz</p></button>
    <p onclick="reload()">Voltar pra home</p>
  `
}

function reload() {
  window.location.reload()
}