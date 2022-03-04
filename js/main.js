/* Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi. (Cioè lasciate i numeri visibili per 30 secondi allo scadere dei quali li nascondete)
Dopo aver nascosto i numeri chiedete all'utente (con dei prompt) di inserirli in ordine, uno alla volta.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

const divContainer = document.querySelector(".container");
const divScore = document.querySelector("#score");

const divTimer = document.querySelector("#timer");
// const btnPlay = document.querySelector("#play");
// const btnReset = document.querySelector("#reset");
// const scoreMsg = document.querySelector('#score');

let timeInSeconds = 4; //tempo in secondi
const qtaNum = 5; //quanti numeri generare
const maxNum = 20; //numero casuale massimo, il minimo è uno di default



divContainer.innerHTML = ""; //reset container
divScore.innerHTML = ""; //reset punteggio

numGenerator();
timer();


function hideNum(){
    divContainer.innerHTML = "";

    let input;
    
    for (let i = 0; i < qtaNum; i++) {
        input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Numero da 1 a ' + maxNum;
        divContainer.appendChild(input);
    }

}


function numGenerator() { //generatore casuale di numeri, arg -> int
    const arrRndmNum = [];
    let rndmNum;
    let divNumber;

    for (let i = 0; i < qtaNum; i++) {
        rndmNum = Math.floor(Math.random() * maxNum) + 1;

        while (arrRndmNum.includes(rndmNum)) { //numeri univoci
            rndmNum = Math.floor(Math.random() * maxNum) + 1;
        }

        arrRndmNum.push(rndmNum);
    }
    
    for (let x = 0; x < arrRndmNum.length; x++) { //stampo i numeri
        divNumber = document.createElement('div');
        divNumber.innerHTML = arrRndmNum[x];
        divContainer.append(divNumber);
    }

    
    
}

let timeStop = setInterval(timer, 1000); //timer con conto alla rovescia

function timer(){
    if (timeInSeconds == 0) {
        hideNum();
        divTimer.style.display = 'none';
        clearInterval(timeStop);
    } else {
        divTimer.innerHTML = 'Timer: ' + timeInSeconds-- + ' secondi';
    }
}