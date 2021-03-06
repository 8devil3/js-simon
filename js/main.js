/* Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi. (Cioè lasciate i numeri visibili per 30 secondi allo scadere dei quali li nascondete)
Dopo aver nascosto i numeri chiedete all'utente (con dei prompt) di inserirli in ordine, uno alla volta.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
I numeri da indovinare devono essere nello stesso ordine */

const divContainer = document.querySelector(".container");
const divScore = document.querySelector("#score");
const divTimer = document.querySelector("#timer");
const btnPlay = document.querySelector("#play");
const btnRePlay = document.querySelector("#replay");
const scoreMsg = document.querySelector("#score");

const qtaNum = 5; //quanti numeri generare
const maxNum = 20; //numero casuale massimo, il minimo è 1
const countdown = 5; //conto alla rovescia in secondi



btnPlay.addEventListener("click", play);

function play() {
    let timerCountdown = countdown;

    divContainer.innerHTML = ""; //reset container
    divScore.innerHTML = ""; //reset punteggio
    btnPlay.style.display = "none"; //nascondo il pulsante play

    divTimer.innerHTML = ""; //reset timer
    divTimer.style.display = "block";

    const arrRndmNum = genRandomNumbers(); //richiamo il generatore casuale di numeri e memorizzo il risultato in una variabile
    
    //stampo i numeri casuali
    let divNumber;
    for (let x = 0; x < arrRndmNum.length; x++) {
        divNumber = document.createElement("div");
        divNumber.innerHTML = arrRndmNum[x];
        divContainer.append(divNumber);
    }

    //richiamo il timer PRIMA del setInterval per iniziare immediatamente il conto alla rovescia, senza aspettare il "delay" del setInterval (in questo caso di 1000ms)
    timer();
    let timeInterval = setInterval(timer, 1000);

    //timer con conto alla rovescia   
    function timer() {
        if (timerCountdown == 0) {
            divContainer.innerHTML = "";
            divTimer.style.display = "none";
            checkNumbers(arrRndmNum);
            clearInterval(timeInterval);
        } else {
            //stampo il timer
            divTimer.innerHTML = "Timer: " + timerCountdown-- + " second" + pluralsM(timerCountdown + 1);
        }

    }
    
}



//controllo dei numeri
function checkNumbers(arrRndmNum) {
    let askNum;
    let arrChecked = [];

    //imposto il timeout per aggirare il blocco esecuzione dei prompt
    setTimeout(() => {
        for (let i = 0; i < qtaNum; i++) {
            askNum = parseInt(prompt("Inserisci un numero"));
            if (askNum != arrRndmNum[i]) {
                //niente
            } else {
                //controllo di inserimento singolo
                while (!arrChecked.includes(askNum)) {
                    arrChecked.push(askNum);
                }
            }
        }

        //stampo il risultato
        if (arrChecked.length == arrRndmNum.length) {
        scoreMsg.innerHTML = `<p class="win">Complimenti!</p><p>Hai individuato tutti i numeri!</p><p>La sequenza completa è ${arrRndmNum}</p>`;
        } else if (arrChecked.length < qtaNum && arrChecked.length > 0) {
            scoreMsg.innerHTML = `<p>Hai individuato ${arrChecked.length} numer${pluralsM(arrChecked.length)}: ${arrChecked}</p><p>La sequenza completa è ${arrRndmNum}</p>`;
        } else {
            scoreMsg.innerHTML = `<p>Non hai individuato alcun numero.</p><p>La sequenza completa è ${arrRndmNum}</p>`;
        }
        
        //abilito il pulsante per il replay
        btnPlay.style.display = "block";
    }, 1);
}



//generatore casuale di numeri
function genRandomNumbers(){
    const arrRndmNum = [];
    let rndmNum;

    for (let i = 0; i < qtaNum; i++) {
        rndmNum = Math.floor(Math.random() * maxNum) + 1;
        
        //numeri univoci
        while (arrRndmNum.includes(rndmNum)) {
            rndmNum = Math.floor(Math.random() * maxNum) + 1;
        }

        arrRndmNum.push(rndmNum);
    }

    return arrRndmNum;
}



//gestisco i plurali maschili
function pluralsM(qta) {
    if (qta == 1) {
        return "o";
    } else {
        return "i";
    }
}

//gestisco i plurali femminili
function pluralsF(qta) {
    if (qta == 1) {
        return "a";
    } else {
        return "e";
    }
}