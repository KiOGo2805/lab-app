import './styles/main.scss';
import { renderApp } from './ui/render';
import { renderBookForm } from './ui/components/BookForm';
import { renderUserForm } from './ui/components/UserForm';
import { Library } from './services/Library';
import { Book } from './models/Book';
import { User } from './models/User';

export const bookLibrary = new Library<Book>('books_data');
export const userLibrary = new Library<User>('users_data');

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    renderBookForm();
    renderUserForm();
});