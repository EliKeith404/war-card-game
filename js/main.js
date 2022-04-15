// DOM elements
const lblDeck = document.querySelector('.deckLabel');
const player1Card = document.querySelector('.imgCardP1');
const player2Card = document.querySelector('.imgCardP2');
const lblResult = document.querySelector('.result');

// If Draw button is clicked, generate cards
document.querySelector('.button').addEventListener('click', drawCards);

// On page load, generate deck
let deckID;
generateDeck();

function generateDeck(){
    const url = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            deckID = data.deck_id;
        })
        .catch(err => {
            console.log(`error: ${err}`);
        });
}

function drawCards(){
    const url = `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`;

    lblDeck.innerText = deckID;

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data);
            let player1 = convertValue(data.cards[0]);
            player1Card.src = player1.image;
            console.log(player1.value)
            let player2 = convertValue(data.cards[1]);
            player2Card.src = player2.image;
            console.log(player2.value)

            if(player1.value > player2.value){
                lblResult.innerText = 'Winner is: Player 1';
            }
            else if(player1.value < player2.value){
                lblResult.innerText = 'Winner is: Player 2';
            }
            else {
                lblResult.innerText = 'WARRRRRR';
            }
        })
        .catch(err => {
            console.log(`error: ${err}`);
        });

    function convertValue(player){
        if(player.value.toLowerCase() === 'ace' ){
            player.value = 14;
        }
        else if (player.value.toLowerCase() === 'king'){
            player.value = 13;
        }
        else if (player.value.toLowerCase() === 'queen'){
            player.value = 12;
        }
        else if (player.value.toLowerCase() === 'jack'){
            player.value = 11;
        }
        else{
            player.value = Number(player.value)
        }
        return player;
    }
}


