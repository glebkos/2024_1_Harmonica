import templateProfile from './profile.handlebars';
import './profile.css';
import {ProfileUserInfo} from '../../../widgets/profileUserInfo/ui/profileUserInfo.js';
import {ProfileFeed} from '../../../widgets/profileFeed/ui/profileFeed.js';
import {View} from '../../../app/View.js';
import {ProfileAPI} from '../api/api.js';
import {ProfileEdit} from '../../profileEdit/ui/profileEdit.js';
import {PinView} from '../../pinView/ui/pinView.js';
import {BoardEdit} from '../../boardEdit/ui/boardEdit.js';

/**
 * Handle profile page
 */
export class Profile extends View {
    /**
     * Define some properties for profile page
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Render profile page
     * @function render
     * @param {Array} nickname – User's nickname
     */
    async render(nickname) {
        const profileAPI = new ProfileAPI(nickname);
        const response = await profileAPI.api();
        const user = response.body;
        this.root.innerHTML = templateProfile();
        this.profileUserInfo = new ProfileUserInfo();
        this.profileFeed = new ProfileFeed();
        this.profileUserInfo.render(user);
        this.profileFeed.render([]);

        const pinAdd = document.querySelector('#profile-pin-add');
        pinAdd.addEventListener('click', (event) => {
            event.preventDefault();
            const pinCreate = new PinView();
            pinCreate.renderPinCreate();
        })

        const boardAdd = document.querySelector('#profile-board-add');
        boardAdd.addEventListener('click', (event) => {
            event.preventDefault();
            const boardCreate = new BoardEdit();
            boardCreate.renderCreateBoard();
        })
    };
}
