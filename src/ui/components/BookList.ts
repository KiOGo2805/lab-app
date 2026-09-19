import { createElement } from '../render';
import { bookLibrary, userLibrary } from '../../index';
import { Book } from '../../models/Book';
import { NotificationService } from '../../services/NotificationService';

export function renderBookList(): void {
    const container = document.getElementById('book-list-container');
    if (!container) return;

    let listContainer = document.getElementById('book-list-items');
    if (!listContainer) {
        listContainer = createElement('div', ['d-flex', 'flex-column', 'gap-3', 'mt-3']);
        listContainer.id = 'book-list-items';
        container.appendChild(listContainer);
    }
    
    listContainer.innerHTML = '';
    const books = bookLibrary.getAll();

    if (books.length === 0) {
        listContainer.appendChild(createElement('p', ['text-muted'], {}, 'Список книг порожній.'));
        return;
    }

    books.forEach((book: Book) => {
        const item = createElement('div', ['d-flex', 'justify-content-between', 'align-items-center', 'border-bottom', 'pb-2']);
        const text = `${book.title} by ${book.author} (${book.year})`;
        const textEl = createElement('span', [], {}, text);

        const btnContainer = createElement('div', ['d-flex', 'gap-2']);
        let actionBtn: HTMLElement;

        if (book.isBorrowed) {
            actionBtn = createElement('button', ['btn', 'btn-warning', 'btn-sm'], {}, 'Повернути');
            actionBtn.addEventListener('click', () => {
                // Знаходимо юзера, який позичив книгу, і забираємо її з його масиву
                const user = userLibrary.getAll().find(u => u.borrowedBooks.includes(book.id));
                if (user) {
                    user.borrowedBooks = user.borrowedBooks.filter(id => id !== book.id);
                    userLibrary.update(user);
                }
                
                book.isBorrowed = false;
                bookLibrary.update(book);
                
                NotificationService.notifyInfo(`${book.title} by ${book.author} (${book.year}) has been returned.`);
                renderBookList(); 
            });
        } else {
            actionBtn = createElement('button', ['btn', 'btn-primary', 'btn-sm'], {}, 'Позичити');
            actionBtn.addEventListener('click', () => {
                NotificationService.promptUserId((userId) => {
                    const user = userLibrary.findById(userId);
                    
                    if (!user) {
                        NotificationService.notifyError('Користувача з таким ID не знайдено!');
                        return;
                    }
                    
                    // Перевірка ліміту (п. 14)
                    if (user.borrowedBooks.length >= 3) {
                        NotificationService.notifyError('Цей користувач вже позичив максимальну кількість книг (3)!');
                        return;
                    }

                    // Оновлюємо користувача
                    user.borrowedBooks.push(book.id);
                    userLibrary.update(user);
                    
                    // Оновлюємо книгу
                    book.isBorrowed = true;
                    bookLibrary.update(book);
                    
                    NotificationService.notifySuccess(`${book.title} by ${book.author} (${book.year}) has been borrowed by ${user.id} ${user.name} (${user.email}).`);
                    renderBookList();
                });
            });
        }

        const deleteBtn = createElement('button', ['btn', 'btn-danger', 'btn-sm'], {}, 'Видалити');
        deleteBtn.addEventListener('click', () => {
            bookLibrary.remove(book.id);
            renderBookList(); 
        });

        btnContainer.append(actionBtn, deleteBtn);
        item.append(textEl, btnContainer);
        listContainer.appendChild(item);
    });
}