import pinControlBlockTemplate from './pinControllerBlock.handlebars';
import './pinControllerBlock.css';
import {View} from '../../../app/View.js';
import {PinView} from '../../../pages/pinView/ui/pinView.js';
import {PinAPI} from '../../../pages/pinView/api/api.js';
import {Feed} from '../../../components/pages/feed/feed.js';

/**
 * Class to render and handle edit and like buttons on pin
 */
export class PinControllerBlock extends View {
    /**
     * Initialize start values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-block-bottom');
    }

    /**
     * Function to render pins control buttons
     * @function render
     * @param {json} pin – pin information
     */
    render(pin) {
        this.root.innerHTML = pinControlBlockTemplate({pin});
        if (pin.is_owner) {
            const updateInput = document.querySelector('#pin-update');
            updateInput.addEventListener('click', (event) => {
                event.preventDefault();
                const updateView = new PinView();
                updateView.renderPinUpdate(pin);
            });

            const deleteButton = this.root.querySelector('#pin-delete');
            deleteButton.addEventListener('click', async (event) => {
                event.preventDefault();

                const api = new PinAPI(pin.pin_id);
                await api.apiDELETE();

                Feed();
            });
        }
    }
}
