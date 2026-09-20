import { expect } from 'chai';
import { Validation } from '../src/utils/validators.ts';

describe('Validation Module', () => {
    it('isRequired має повертати true для заповненого рядка', () => {
        expect(Validation.isRequired('Clean Code')).to.be.true;
    });

    it('isRequired має повертати false для порожнього рядка або пробілів', () => {
        expect(Validation.isRequired('   ')).to.be.false;
        expect(Validation.isRequired('')).to.be.false;
    });

    it('isValidYear має приймати коректний рік', () => {
        expect(Validation.isValidYear('2008')).to.be.true;
        expect(Validation.isValidYear('1999')).to.be.true;
    });

    it('isValidYear має відхиляти нереалістичний рік', () => {
        expect(Validation.isValidYear('999')).to.be.false;
        expect(Validation.isValidYear('2100')).to.be.false;
        expect(Validation.isValidYear('abc')).to.be.false;
    });

    it('isValidUserId має приймати виключно цифри', () => {
        expect(Validation.isValidUserId('1725533394038')).to.be.true;
        expect(Validation.isValidUserId('12345')).to.be.true;
        expect(Validation.isValidUserId('123abc')).to.be.false;
    });
});