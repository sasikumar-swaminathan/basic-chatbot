

var input   = document.getElementById('robot-text')
var button  = document.getElementById('talk-button')

var intentResponse = {
    greeting: ['Hello', 'How are you'],
    bye: ['Bye', 'See you later'],
    identity: ['I am the terminator', 'I don\'t know yet who I am'],
    film: ['I like films', 'My favourite movie is Shawshank redemption'],
    default: ['Can you rephrase your question?']
}

var userInputArray = ['Hello', 'what', 'is', 'your', 'favourite', 'film']

function robotResponse(intention) {
    var randomResponse = intentResponse[intention][Math.floor(Math.random() * intentResponse[intention].length)]
    console.log(randomResponse)
    responsiveVoice.speak(`${randomResponse}`, 'UK English Male')
}

function robotLogic(userInput) {
    
    var userArray = userInput.split(' ')

    var scoreObject = {
        greeting : 0,
        bye : 0,
        identity : 0,
        film : 0,
        default : 0
    }

    // 1. Figure the intent of the user input
    userArray.forEach((el) => {
        var element = el
        if (element === 'hello' || element === 'hi') {
            scoreObject.greeting++
        } else if (element === 'bye' || element === 'goodbye' || element === 'you') {
            scoreObject.bye++;
        } else if (element === 'what' || element === 'are' || element === 'you') {
            scoreObject.identity++
        } else if (element === 'film' || element === 'movie' || element === 'films' || element === 'movies') {
            scoreObject.film = scoreObject.film + 10
        } else if (element === 'like') {
            scoreObject.film++    
        } else {
            scoreObject.default++
        }
    })
    // Which intent has the highest score?
    var max = Math.max(scoreObject.greeting, scoreObject.bye,  scoreObject.identity, scoreObject.film, scoreObject.default)

    var intention = ''

    for (var key in scoreObject) {
        if (scoreObject[key] === max) {
            console.log(`key -> ${key}`)
            intention = key
        }    
    }
    
    // 2. respond based on the intent
    robotResponse(intention)

}

button.addEventListener('click', () => {
    // talk(input.value)
    robotLogic(input.value)
});

function talk(param) {
    if (param === 'sasi') {
        responsiveVoice.speak(`Hello ${param}! How are you doing?` , 'UK English Male')
    } else if (param === 'good evening') {
        responsiveVoice.speak(`${param}`, 'UK English Male')
    }
}

