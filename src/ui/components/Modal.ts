import { createElement } from '../render';

export class Modal {
    private static createBaseModal(): { overlay: HTMLDivElement, content: HTMLDivElement } {
        const overlay = createElement('div', ['position-fixed', 'top-0', 'start-0', 'w-100', 'h-100', 'd-flex', 'justify-content-center', 'align-items-center'], { style: 'background: rgba(0,0,0,0.5); z-index: 1050;' });
        const dialog = createElement('div', ['bg-white', 'p-4', 'rounded', 'shadow'], { style: 'max-width: 500px; width: 100%;' });
        overlay.appendChild(dialog);
        return { overlay, content: dialog };
    }

    public static prompt(message: string, onConfirm: (value: string) => void): void {
        const { overlay, content } = this.createBaseModal();

        const header = createElement('div', ['d-flex', 'justify-content-between', 'align-items-center', 'mb-3']);
        const title = createElement('h5', ['m-0'], {}, message);
        const closeBtn = createElement('button', ['btn-close']);
        closeBtn.onclick = () => document.body.removeChild(overlay);
        header.append(title, closeBtn);

        const input = createElement('input', ['form-control', 'mb-3']) as HTMLInputElement;
        input.placeholder = 'ID';

        const footer = createElement('div', ['d-flex', 'justify-content-end', 'gap-2']);
        const cancelBtn = createElement('button', ['btn', 'btn-secondary'], {}, 'Скасувати');
        cancelBtn.onclick = () => document.body.removeChild(overlay);
        
        const saveBtn = createElement('button', ['btn', 'btn-primary'], {}, 'Зберегти');
        saveBtn.onclick = () => {
            if (input.value.trim()) {
                onConfirm(input.value.trim());
                document.body.removeChild(overlay);
            }
        };

        footer.append(cancelBtn, saveBtn);
        content.append(header, input, footer);
        document.body.appendChild(overlay);
    }

    public static alert(message: string, btnText: string = 'Зрозуміло!'): void {
        const { overlay, content } = this.createBaseModal();

        const text = createElement('p', ['mb-4', 'fs-6'], {}, message);

        const footer = createElement('div', ['d-flex', 'justify-content-end']);
        const okBtn = createElement('button', ['btn', 'btn-primary'], {}, btnText);
        okBtn.onclick = () => document.body.removeChild(overlay);
        
        footer.appendChild(okBtn);
        content.append(text, footer);
        document.body.appendChild(overlay);
    }
}