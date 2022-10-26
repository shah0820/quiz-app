const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let Question = {}
let correctAnswer = true
let score = 0
let questionCounter = 0
let allQuestions = []

let questions = [
    {
        question: 'Who won the first ever World Cup?',
        choice1: 'Uruguay',
        choice2: 'Argentina',
        choice3: 'England',
        choice4: 'Germany',
        answer: 1,
    },
    
    {
        question: 'Who is the highest goalscorer in World Cup history?',
        choice1: 'Miroslav Klose',
        choice2: 'Cristiano Ronaldo',
        choice3: 'Thomas Muller',
        choice4: 'Just Fontaine',
        answer: 1,
    },
    
    {
        question: 'Which country has the most World Cups?',
        choice1: 'Germany',
        choice2: 'Argentina',
        choice3: 'Brazil',
        choice4: 'Italy',
        answer: 3,
    },

    {
        question: 'Which Player has the most World Cup apperances?',
        choice1: 'Lothar Matthäus',
        choice2: 'Rafa Márquez',
        choice3: 'Lionel Messi',
        choice4: 'Bastian Schweinsteiger',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startQuiz = () => {
    questionCounter = 0
    score = 0
    allQuestions = [...questions]
    getNextQuestion()
}

getNextQuestion = () => {
    if(allQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * allQuestions.length)
    Question = allQuestions[questionsIndex]
    question.innerText = Question.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = Question['choice' + number]
    })

    allQuestions.splice(questionsIndex, 1)

    correctAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!correctAnswer) return

        correctAnswer = false
        const selecetedChoice = e.target
        const selectedAnswer = selecetedChoice.dataset['number']

        let classToApply = selectedAnswer == Question.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selecetedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selecetedChoice.parentElement.classList.remove(classToApply)
            getNextQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startQuiz()