import './styles/main.scss';
import { renderApp } from './ui/render';
import { renderBookForm } from './ui/components/BookForm';

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    renderBookForm();
});