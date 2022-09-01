const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//seleciona todas as células
const cellElements = document.querySelectorAll('[data-cell]') 
//seleciona o tabuleiro
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')

let circleTurn

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    //dentro dos elementos, para cada um, ver se clickou e chamar a função handleclick APENAS UMA VEZ (once:true)
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

//e = evento
function handleClick(e) {
    //seleciona a div da célula clicada
    const cell = e.target
    //currentClass retorna 'x' ou 'circle' de acordo com as constantes no início da página
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //placemark
    placeMark(cell, currentClass)
 
    //checkwin
    if (checkWin(currentClass)){
        endGame(false)
    //checkdraw
    } else if (isDraw()) {
        endGame(true)
    } else {
        //switchturns
        swapTurns()
        //adiciona a marcação ao fazer hover
        setBoardHoverClass()
    }
}

 


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`    
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    //se todas as células possuem ou x ou o, retorna verdadeiro
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

//placemark
function placeMark(cell, currentClass) {
    //adiciona na lista de classes da div selecionada uma classe de acordo com X_CLASS ou CIRCLE_CLASS
    cell.classList.add(currentClass)
}

//torna a variável circleTurn em seu oposto
function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    //dependendo qual o turno, adiciona o ::before e ::after e lê como hover
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    //.some retorna verdadeiro se qualquer valor dentro do array for verdadeiro
    return WINNING_COMBINATIONS.some(combination =>{
        //every verifica se todos os elementos possuem a mesma classe
        return combination.every(index => {
            //verifica se, na lista de classes, cada elemento do index contém a currentClass
            return cellElements[index].classList.contains(currentClass)
        })
    })
}