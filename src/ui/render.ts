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

let userCurrentPage = 1;
const USER_ITEMS_PER_PAGE = 5;

export function renderUserList(): void {
    const container = document.getElementById('user-list-container');
    if (!container) return;

    let listContainer = document.getElementById('user-list-items');
    if (!listContainer) {
        listContainer = createElement('div', ['d-flex', 'flex-column', 'gap-3', 'mt-3']);
        listContainer.id = 'user-list-items';
        container.appendChild(listContainer);
    }
    
    let paginationContainer = document.getElementById('user-pagination');
    if (!paginationContainer) {
        paginationContainer = createElement('div', ['d-flex', 'justify-content-center', 'gap-2', 'mt-3']);
        paginationContainer.id = 'user-pagination';
        container.appendChild(paginationContainer);
    }

    listContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    const users = userLibrary.getAll();
    const totalPages = Math.ceil(users.length / USER_ITEMS_PER_PAGE) || 1;
    if (userCurrentPage > totalPages) userCurrentPage = totalPages;

    const startIndex = (userCurrentPage - 1) * USER_ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(startIndex, startIndex + USER_ITEMS_PER_PAGE);

    if (paginatedUsers.length === 0) {
        listContainer.appendChild(createElement('p', ['text-muted'], {}, 'Список користувачів порожній.'));
        return;
    }

    paginatedUsers.forEach((user: User) => {
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

    if (totalPages > 1) {
        const prevBtn = createElement('button', ['btn', 'btn-outline-secondary', 'btn-sm'], {}, 'Попередня');
        prevBtn.disabled = userCurrentPage === 1;
        prevBtn.onclick = () => {
            userCurrentPage--;
            renderUserList();
        };

        const pageInfo = createElement('span', ['align-self-center', 'small'], {}, `Сторінка ${userCurrentPage} з ${totalPages}`);

        const nextBtn = createElement('button', ['btn', 'btn-outline-secondary', 'btn-sm'], {}, 'Наступна');
        nextBtn.disabled = userCurrentPage === totalPages;
        nextBtn.onclick = () => {
            userCurrentPage++;
            renderUserList();
        };

        paginationContainer.append(prevBtn, pageInfo, nextBtn);
    }
}