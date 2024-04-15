import {View} from '../../../app/View.js';
import BoardPinFeedTemplate from './boardPin.handlebars';
import './boardPin.scss';
import {API} from '../../../shared/api/API.js';

/**
 * Board pin feed view.
 */
export class BoardPinFeedView extends View {
    /**
    * Board pin feed view.
    * @constructor
    * @param {Element} root - Element in which to paste.
    * @param {...any} args - args for constructor of view.
    */
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    /**
    * On click function.
    * @param {int} pinID - Id of pin to go.
    */
    onClick(pinID) {
        window.location.pathname = '/pin/' + pinID;
    }

    /**
    * Renders view by pin and board.
    * @param {object} pin - Pin entity.
    * @param {object} board - Board entity.
    */
    render(pin, board) {
        console.log(pin, board);
        this.root.innerHTML = BoardPinFeedTemplate({pin, owner: board.is_owner});

        const eventRoot = document.querySelector('#pin-' + pin.pin_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(pin.pin_id);
        });

        const delBtn = document.querySelector('#pin-del-' + pin.pin_id);
        delBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const api = new API('/boards/' + board.board_id + '/pins/' + pin.pin_id);
            await api.DELETE();
            window.location.pathname = '/board/' + board.board_id;
        });
    }
}
