/* GAME RULES
- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls a 6 two consecutive times, all his score gets lost.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach the final score on his gobal score wins the game
- Players have the choice to fix the final score at the beginning of the game
*/

var scores, roundScore, lastDice, activePlayer, gamePlaying, finalScore;

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Générer un nombre aléatoire entre 1 et 6
        var dice1 = Math.floor(Math.random()* 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // Afficher le résultat
        showDice();
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        // Mise à jour du score si le nombre affiché = 1 OU si le joueur a obtenu un 6 deux fois de suite
        if (dice1 === 6 && dice2 === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            // Ajouter le score au joueur
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Passer au joueur suivant
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
         // Ajouter le score de manche au score global du joueur
        scores[activePlayer] += roundScore;
        // Mettre à jour le jeu
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check si le joueur a gagné le jeu sinon passer au joueur suivant
        if(scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    hideDice();
}

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    if (document.querySelector('.final-score').value){
        finalScore = document.querySelector('.final-score').value;
    } else {
        finalScore = 100;
    }
    hideDice();
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2'; 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function showDice() {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block'; 
}


