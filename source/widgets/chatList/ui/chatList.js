import {View} from '../../../app/View.js';
import chatListTemplate from './chatList.handlebars';
import './chatList.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {API} from '../../../shared/api/API.js';

export class ChatList extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    async render(avatarUrl) {
        const api = new API('/chats');
        const response = await api.get();
        const body = response.body;

        const follow = body.subscriptions_users ? body.subscriptions_users: [];
        const other = body.other_users;

        const chats = follow.concat(other);
        this.root.innerHTML = chatListTemplate({chats});
        for (const chat of chats) {
            const avatar = new Avatar(`chat__avatar-${chat.user_id}`);
            avatar.render(chat.avatar_url);
        }
    }
}
