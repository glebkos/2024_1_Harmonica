import {View} from '../../../app/View.js';
import chatTemplate from './chat.handlebars';
import './chat.scss';
import {ChatList} from '../../../widgets/chatList/index.js';
import {ChatWindow} from '../../../widgets/chatWindow/index.js';
import {API} from '../../../shared/api/API.js';

export class ChatView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async render() {
        this.root.innerHTML = chatTemplate({});

        const api = new API('/chats');
        const response = await api.get();
        const body = response.body;

        const follow = body.subscriptions_users ? body.subscriptions_users: [];
        const other = body.other_users;

        const chats = follow.concat(other);

        const list = new ChatList('chat-list');
        list.render(chats);
        const window = new ChatWindow('chat-window');
        window.render();
    }
}
