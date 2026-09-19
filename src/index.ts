import './styles/main.scss';
import { renderApp } from './ui/render';
import { renderBookForm } from './ui/components/BookForm';
import { renderUserForm } from './ui/components/UserForm';

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    renderBookForm();
    renderUserForm();
});