import '../styles/main.scss';
import OX from './tic-tac-toe';

document.addEventListener('DOMContentLoaded', () => {
    const game = new OX({
        player1: ['far', 'fa-circle'],
        player2: ['fas', 'fa-times'],
        game: document.querySelector('.game'),
        gameClass: 'game--start',
        gameFields: document.querySelectorAll('.game .game__field'),
        gameFieldClass: 'game__field'
    });

    const btn = document.querySelector('.start-btn');
    btn.addEventListener('click', game.init.bind(game));
});