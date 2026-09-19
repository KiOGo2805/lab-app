import { createElement } from '../render';
import { bookLibrary, userLibrary } from '../../index';
import { Book } from '../../models/Book';
import { NotificationService } from '../../services/NotificationService';

export function renderBookList(): void {
    const container = document.getElementById('book-list-container');
    if (!container) return;

    let searchInput = document.getElementById('book-search') as HTMLInputElement;
    if (!searchInput) {
        searchInput = createElement('input', ['form-control', 'mb-3']) as HTMLInputElement;
        searchInput.id = 'book-search';
        searchInput.placeholder = 'Пошук за назвою або автором...';
        
        searchInput.addEventListener('input', () => {
            renderListItems(searchInput.value.trim().toLowerCase());
        });
        
        container.appendChild(searchInput);
    }

    let listContainer = document.getElementById('book-list-items');
    if (!listContainer) {
        listContainer = createElement('div', ['d-flex', 'flex-column', 'gap-3']);
        listContainer.id = 'book-list-items';
        container.appendChild(listContainer);
    }

    renderListItems(searchInput.value.trim().toLowerCase());
}

function renderListItems(searchQuery: string): void {
    const listContainer = document.getElementById('book-list-items');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    let books = bookLibrary.getAll();

    if (searchQuery) {
        books = books.filter(book => 
            book.title.toLowerCase().includes(searchQuery) || 
            book.author.toLowerCase().includes(searchQuery)
        );
    }

    if (books.length === 0) {
        listContainer.appendChild(createElement('p', ['text-muted'], {}, 'Книг не знайдено.'));
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
                const user = userLibrary.getAll().find(u => u.borrowedBooks.includes(book.id));
                if (user) {
                    user.borrowedBooks = user.borrowedBooks.filter(id => id !== book.id);
                    userLibrary.update(user);
                }
                book.isBorrowed = false;
                bookLibrary.update(book);
                NotificationService.notifyInfo(`${book.title} has been returned.`);
                renderListItems(searchQuery); // Перемальовуємо зі збереженням пошуку
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
                    if (user.borrowedBooks.length >= 3) {
                        NotificationService.notifyError('Перевищено ліміт (макс. 3 книги)!');
                        return;
                    }
                    user.borrowedBooks.push(book.id);
                    userLibrary.update(user);
                    
                    book.isBorrowed = true;
                    bookLibrary.update(book);
                    NotificationService.notifySuccess(`${book.title} borrowed by ${user.name}.`);
                    renderListItems(searchQuery);
                });
            });
        }

        const deleteBtn = createElement('button', ['btn', 'btn-danger', 'btn-sm'], {}, 'Видалити');
        deleteBtn.addEventListener('click', () => {
            bookLibrary.remove(book.id);
            renderListItems(searchQuery);
        });

        btnContainer.append(actionBtn, deleteBtn);
        item.append(textEl, btnContainer);
        listContainer.appendChild(item);
    });
}