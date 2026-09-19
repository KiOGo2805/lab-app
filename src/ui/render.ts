import { userLibrary } from '../index';
import { User } from '../models/User';

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    classes: string[] = [],
    attributes: Record<string, string> = {},
    textContent: string = ''
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    if (classes.length > 0) el.classList.add(...classes);
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    if (textContent) el.textContent = textContent;
    return el;
}

export function renderApp(): void {
    const app = document.getElementById('app');
    if (!app) return;

    const container = createElement('div', ['container', 'py-4']);
    container.style.maxWidth = '800px';

    const title = createElement('h2', ['text-center', 'mb-4', 'fw-bold'], {}, 'Система Управління Бібліотекою');

    const bookFormCard = createSectionCard('book-form-container', 'Додати Книгу');
    const userFormCard = createSectionCard('user-form-container', 'Додати Користувача');
    const bookListCard = createSectionCard('book-list-container', 'Список Книг');
    const userListCard = createSectionCard('user-list-container', 'Список Користувачів');

    container.append(title, bookFormCard, userFormCard, bookListCard, userListCard);
    app.appendChild(container);
}

function createSectionCard(id: string, titleText: string): HTMLDivElement {
    const card = createElement('div', ['card', 'mb-4', 'p-4', 'shadow-sm']);
    card.id = id;
    
    const title = createElement('h5', ['mb-3', 'fw-bold'], {}, titleText);
    card.appendChild(title);
    
    return card;
}

export function renderUserList(): void {
    const container = document.getElementById('user-list-container');
    if (!container) return;

    let listContainer = document.getElementById('user-list-items');
    if (!listContainer) {
        listContainer = createElement('div', ['d-flex', 'flex-column', 'gap-3', 'mt-3']);
        listContainer.id = 'user-list-items';
        container.appendChild(listContainer);
    }
    
    listContainer.innerHTML = '';
    const users = userLibrary.getAll();

    if (users.length === 0) {
        listContainer.appendChild(createElement('p', ['text-muted'], {}, 'Список користувачів порожній.'));
        return;
    }

    users.forEach((user: User) => {
        const item = createElement('div', ['d-flex', 'justify-content-between', 'align-items-center', 'border-bottom', 'pb-2']);
        
        const text = `${user.id} ${user.name} (${user.email})`;
        const textEl = createElement('span', [], {}, text);

        const deleteBtn = createElement('button', ['btn', 'btn-danger', 'btn-sm'], {}, 'Видалити');
        deleteBtn.addEventListener('click', () => {
            userLibrary.remove(user.id);
            renderUserList();
        });

        item.append(textEl, deleteBtn);
        listContainer.appendChild(item);
    });
}