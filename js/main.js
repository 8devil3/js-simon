/* Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi. (Cioè lasciate i numeri visibili per 30 secondi allo scadere dei quali li nascondete)
Dopo aver nascosto i numeri chiedete all'utente (con dei prompt) di inserirli in ordine, uno alla volta.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */


const qtaNum = 5;
const maxNum = 20;


function numGenerator() { //generatore casuale di numeri, arg -> int
    const arrRndmNum = [];
    let rndmNum;

    for (let i = 0; i < qtaNum; i++) {
        rndmNum = Math.floor(Math.random() * maxNum) + 1;
        
        while (arrRndmNum.includes(rndmNum)) { //numeri univoci
            rndmNum = Math.floor(Math.random() * maxNum) + 1;
        }

        arrRndmNum.push(rndmNum);
    }
    
    // console.log(arrRndmNum);
    return arrRndmNum;
}
