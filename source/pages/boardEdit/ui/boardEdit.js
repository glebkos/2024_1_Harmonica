import boardEditTemplate from './boardEdit.handlebars';
import './boardEdit.scss';
import {View} from '../../../app/View.js';
import {Profile} from '../../profile/ui/profile.js';
import {BoardEditAPI} from '../api/api.js';
import {BoardView} from '../../board/ui/boardView.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';

/**
 * Handle board create and update page
 */
export class BoardEdit extends View {
    /**
     * Initialize values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Render update board page
     * @function renderUpdateBoard
     * @param {json} board – board info
     */
    renderUpdateBoard(board) {
        this.root.innerHTML = boardEditTemplate({board});

        console.log(board);

        const backButton = document.querySelector('#board-back-button');
        backButton.addEventListener('click', (event) => {

            const user = JSON.parse(localStorage.getItem('user'));
            window.location.pathname = '/boards/' + board.board_id;
        });

        const boardAPI = new BoardEditAPI(board.board_id);
        const continueButton = document.querySelector('#board-save-button');
        const boardCreated = new BoardView();
        continueButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.querySelector('#board-title').value;
            const description = document.querySelector('#board-description').value;

            const formData = new FormData();
            const boardInfo = {title, description};
            boardInfo.visibility_type = 'public';
            formData.append('board', JSON.stringify(boardInfo));

            const response = await boardAPI.api(formData);

            if (response.code) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const newBoard = response.body.board;

            window.location.pathname = '/boards/' + newBoard.board_id;
        });
    }

    /**
     * Render create board page
     * @function renderCreateBoard
     */
    renderCreateBoard() {
        this.root.innerHTML = boardEditTemplate({});

        const backButton = document.querySelector('#board-back-button');
        backButton.addEventListener('click', (event) => {
            const user = JSON.parse(localStorage.getItem('user'));
            window.location.pathname = '/profile/' + user.nickname;
        });

        const boardAPI = new BoardEditAPI(null);
        const continueButton = document.querySelector('#board-save-button');
        const boardCreated = new BoardView();
        continueButton.addEventListener('click', async (event) => {
            const title = document.querySelector('#board-title').value;
            const description = document.querySelector('#board-description').value;
            const boardInfo = {title, description};
            const response = await boardAPI.api(JSON.stringify(boardInfo));

            if (response.code) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const board = response.body;

            window.location.pathname = '/boards/' + board.board.board_id;
        });
    }
}
