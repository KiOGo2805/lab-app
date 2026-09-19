import { createElement, renderUserList } from '../render';
import { Validation } from '../../utils/validators';
import { User } from '../../models/User';
import { generateId } from '../../utils/idGenerator';
import { userLibrary } from '../../index';

export function renderUserForm(): void {
    const container = document.getElementById('user-form-container');
    if (!container) return;

    const form = createElement('form', ['d-flex', 'flex-column', 'gap-3']);
    form.id = 'user-form';

    const nameInput = createInput('text', 'user-name', "Ім'я");
    const emailInput = createInput('email', 'user-email', 'Email');
    
    const errorDiv = createElement('div', ['text-danger', 'small', 'd-none']);

    const submitBtn = createElement('button', ['btn', 'btn-success', 'align-self-start'], {}, 'Додати Користувача');
    submitBtn.type = 'submit';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorDiv.classList.add('d-none');

        const name = nameInput.value;
        const email = emailInput.value;

        if (!Validation.isRequired(name) || !Validation.isRequired(email)) {
            errorDiv.textContent = "Всі поля є обов'язковими для заповнення.";
            errorDiv.classList.remove('d-none');
            return;
        }

        const newUser = new User(generateId(), name, email);
        userLibrary.add(newUser);

        form.reset();
        
        renderUserList();
    });

    form.append(nameInput, emailInput, errorDiv, submitBtn);
    container.appendChild(form);
}

function createInput(type: string, id: string, placeholder: string): HTMLInputElement {
    const input = createElement('input', ['form-control']) as HTMLInputElement;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
}