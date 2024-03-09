import {Pins} from '../../widget/pins/pins.js';
import {API} from '../../../modules/API.js';
import {Error} from '../error/error.js';

export const Feed = async () => {
    const template = Handlebars.templates.feed;
    const root = document.getElementById('root');
    root.innerHTML = template({});

    const api = new API();
    const response = await api.feed();
    if (response.status >= 400) {
        Error(response);
        return;
    }
    Pins(response.pins);
};
