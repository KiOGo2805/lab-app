import { Modal } from '../ui/components/Modal';

export class NotificationService {
    static notifySuccess(message: string): void {
        Modal.alert(message, 'Зрозуміло!');
    }
    
    static notifyInfo(message: string): void {
        Modal.alert(message, 'Закрити');
    }

    static notifyError(message: string): void {
        Modal.alert(message, 'ОК');
    }

    static promptUserId(onConfirm: (id: string) => void): void {
        Modal.prompt('Введіть ID користувача для позичення книги:', onConfirm);
    }
}