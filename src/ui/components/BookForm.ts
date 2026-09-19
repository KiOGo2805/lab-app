import { createElement } from '../render';

export function renderBookForm(): void {
    const container = document.getElementById('book-form-container');
    if (!container) return;

    const form = createElement('form', ['d-flex', 'flex-column', 'gap-3']);
    form.id = 'book-form';

    const titleInput = createInput('text', 'book-title', 'Назва книги');
    const authorInput = createInput('text', 'book-author', 'Автор');
    const yearInput = createInput('number', 'book-year', 'Рік видання');
    
    const submitBtn = createElement('button', ['btn', 'btn-success', 'align-self-start'], {}, 'Додати Книгу');
    submitBtn.type = 'submit';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Форма відправлена!');
    });

    form.append(titleInput, authorInput, yearInput, submitBtn);
    container.appendChild(form);
}

function createInput(type: string, id: string, placeholder: string): HTMLInputElement {
    const input = createElement('input', ['form-control']) as HTMLInputElement;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
}