/* Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi. (Cioè lasciate i numeri visibili per 30 secondi allo scadere dei quali li nascondete)
Dopo aver nascosto i numeri chiedete all'utente (con dei prompt) di inserirli in ordine, uno alla volta.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

const divContainer = document.querySelector(".container");
const divScore = document.querySelector("#score");
const divTimer = document.querySelector("#timer");
const btnPlay = document.querySelector("#play");
const btnRePlay = document.querySelector("#replay");
const scoreMsg = document.querySelector('#score');

const qtaNum = 5; //quanti numeri generare
const maxNum = 20; //numero casuale massimo, il minimo è 1




btnRePlay.style.display = 'none'; //nascondo il pulsante replay
btnPlay.addEventListener('click', play);


function play() { //generatore casuale di numeri, arg -> int

    let countdown = 10; //conto alla rovescia in secondi
    divContainer.innerHTML = ''; //reset container
    divScore.innerHTML = ''; //reset punteggio
    btnPlay.style.display = 'none'; //nascondo il pulsante play
    btnRePlay.style.display = 'none'; //nascondo il pulsante replay

    divTimer.innerHTML = ''; //reset timer
    divTimer.style.display = 'block';
    

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
    
    for (let x = 0; x < arrRndmNum.length; x++) { //stampo i numeri casuali
        divNumber = document.createElement('div');
        divNumber.innerHTML = arrRndmNum[x];
        divContainer.append(divNumber);
    }



    let timeInterval = setInterval(timer, 1000);

    function timer(){ //timer con conto alla rovescia
        if (countdown == 0) {
            divContainer.innerHTML = '';
            divTimer.style.display = 'none';
            checkNumbers();
            clearInterval(timeInterval);
        } else {
            if (countdown == 1) { //distinguo singolare/plurale della parola "secondi"
                divTimer.innerHTML = 'Timer: ' + countdown-- + ' secondo';
            } else {
                divTimer.innerHTML = 'Timer: ' + countdown-- + ' secondi';
            }
        }
    }

  

    function checkNumbers() { //controllo i numeri  
        let askNum;
        let arrChecked = [];

        setTimeout(() => {
            for (let i = 0; i < qtaNum; i++) {
            askNum = parseInt(prompt('Inserisci un numero'));
            if (!arrRndmNum.includes(askNum)) {
            } else {
                while (!arrChecked.includes(askNum)) { //controllo di inserimento singolo
                    arrChecked.push(askNum);
                }
            }
        }
        scoreMsg.innerHTML = `<p>Hai individuato ${arrChecked.length} numeri:  ${arrChecked}</p><p>La sequenza completa è ${arrRndmNum}</p>`;

        btnRePlay.style.display = 'block'; //abilito il pulsante replay
        btnRePlay.addEventListener('click', play);
        }, 1);

        
    }
}













