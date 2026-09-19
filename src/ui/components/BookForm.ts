import { createElement } from '../render';
import { Validation } from '../../utils/validators';
import { Book } from '../../models/Book';
import { generateId } from '../../utils/idGenerator';
import { bookLibrary } from '../../index';

export function renderBookForm(): void {
    const container = document.getElementById('book-form-container');
    if (!container) return;

    const form = createElement('form', ['d-flex', 'flex-column', 'gap-3']);
    form.id = 'book-form';

    const titleInput = createInput('text', 'book-title', 'Назва книги');
    const authorInput = createInput('text', 'book-author', 'Автор');
    const yearInput = createInput('number', 'book-year', 'Рік видання');
    
    const errorDiv = createElement('div', ['text-danger', 'small', 'd-none']);

    const submitBtn = createElement('button', ['btn', 'btn-success', 'align-self-start'], {}, 'Додати Книгу');
    submitBtn.type = 'submit';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorDiv.classList.add('d-none');

        const title = titleInput.value;
        const author = authorInput.value;
        const year = yearInput.value;

        if (!Validation.isRequired(title) || !Validation.isRequired(author) || !Validation.isRequired(year)) {
            errorDiv.textContent = "Усі поля є обов'язковими для заповнення.";
            errorDiv.classList.remove('d-none');
            return;
        }

        if (!Validation.isValidYear(year)) {
            errorDiv.textContent = "Введіть коректний рік (наприклад, 2024).";
            errorDiv.classList.remove('d-none');
            return;
        }

        const newBook = new Book(generateId(), title, author, parseInt(year));
        bookLibrary.add(newBook);

        form.reset();
        
        // TODO: Тут ми пізніше додамо виклик функції оновлення списку книг
    });

    form.append(titleInput, authorInput, yearInput, errorDiv, submitBtn);
    container.appendChild(form);
}

function createInput(type: string, id: string, placeholder: string): HTMLInputElement {
    const input = createElement('input', ['form-control']) as HTMLInputElement;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
}