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



btnPlay.addEventListener("click", play);

function play() {
    let countdown = 2; //conto alla rovescia in secondi

    divContainer.innerHTML = ""; //reset container
    divScore.innerHTML = ""; //reset punteggio
    btnPlay.style.display = "none"; //nascondo il pulsante play

    divTimer.innerHTML = ""; //reset timer
    divTimer.style.display = "block";

    const arrRndmNum = [];
    let rndmNum;
    let divNumber;

    //generatore casuale di numeri, arg -> int
    for (let i = 0; i < qtaNum; i++) {
        rndmNum = Math.floor(Math.random() * maxNum) + 1;

        //numeri univoci
        while (arrRndmNum.includes(rndmNum)) {
            rndmNum = Math.floor(Math.random() * maxNum) + 1;
        }

        arrRndmNum.push(rndmNum);
    }

    for (let x = 0; x < arrRndmNum.length; x++) {
        //stampo i numeri casuali
        divNumber = document.createElement("div");
        divNumber.innerHTML = arrRndmNum[x];
        divContainer.append(divNumber);
    }


    let timeInterval = setInterval(timer, 1000);

    //timer con conto alla rovescia
    function timer() {
        if (countdown == 0) {
            divContainer.innerHTML = "";
            divTimer.style.display = "none";
            checkNumbers();
            clearInterval(timeInterval);
        } else {
            //gestisco i plurali
            if (countdown == 1) {
                divTimer.innerHTML = "Timer: " + countdown-- + " secondo";
            } else {
                divTimer.innerHTML = "Timer: " + countdown-- + " secondi";
            }
        }
    }
    

    //controllo i numeri
    function checkNumbers() {
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

            //gestisco i plurali
            let numPlural;
            if (arrChecked.length == 1) {
                numPlural = "numero";
            } else {
                numPlural = "numeri";
            }
    
            //stampo il risultato
            scoreMsg.innerHTML = `<p>Hai individuato ${arrChecked.length} ${numPlural}:  ${arrChecked}</p><p>La sequenza completa è ${arrRndmNum}</p>`;
            
            //abilito il pulsante per il replay
            btnPlay.style.display = "block";
            btnPlay.addEventListener("click", play);
        }, 1);
    }
}
