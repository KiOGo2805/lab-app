import { createElement } from '../render';

export function renderUserForm(): void {
    const container = document.getElementById('user-form-container');
    if (!container) return;

    const form = createElement('form', ['d-flex', 'flex-column', 'gap-3']);
    form.id = 'user-form';

    const nameInput = createInput('text', 'user-name', "Ім'я");
    const emailInput = createInput('email', 'user-email', 'Email');
    
    const submitBtn = createElement('button', ['btn', 'btn-success', 'align-self-start'], {}, 'Додати Користувача');
    submitBtn.type = 'submit';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Форма користувача відправлена!');
    });

    form.append(nameInput, emailInput, submitBtn);
    container.appendChild(form);
}

function createInput(type: string, id: string, placeholder: string): HTMLInputElement {
    const input = createElement('input', ['form-control']) as HTMLInputElement;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
}