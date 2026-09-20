import { expect } from 'chai';
import { Library } from '../src/services/Library';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value.toString(); },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();

global.localStorage = localStorageMock as any;

describe('Library Class', () => {
    let library: Library<{ id: string; title: string }>;

    beforeEach(() => {
        localStorage.clear();
        library = new Library('test-collection');
    });

    it('має успішно додавати об\'єкт до колекції', () => {
        library.add({ id: '1', title: 'Code Complete' });
        expect(library.getAll().length).to.equal(1);
        expect(library.getAll()[0].title).to.equal('Code Complete');
    });

    it('має знаходити об\'єкт за ID', () => {
        library.add({ id: '1', title: 'Code Complete' });
        library.add({ id: '2', title: 'Clean Code' });
        
        const found = library.findById('2');
        expect(found).to.not.be.undefined;
        expect(found?.title).to.equal('Clean Code');
    });

    it('має видаляти об\'єкт за ID', () => {
        library.add({ id: '1', title: 'Code Complete' });
        library.remove('1');
        
        expect(library.getAll().length).to.equal(0);
    });

    it('має коректно оновлювати об\'єкт', () => {
        library.add({ id: '1', title: 'Old Title' });
        library.update({ id: '1', title: 'New Title' });
        
        const updated = library.findById('1');
        expect(updated?.title).to.equal('New Title');
    });
});