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