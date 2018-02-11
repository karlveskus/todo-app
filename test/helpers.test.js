import { assert } from 'chai';
import { JSDOM } from 'jsdom'; // DOM
import 'babel-polyfill'; // Emulate a full ES2015+ environment
import Helpers from '../js/helpers';

describe('showElement()', () => {
  const dom = new JSDOM('<p>Todo-app</p>');
  const element = dom.window.document.querySelector('p');

  it('changes elements display value to \'none\'', () => {
    Helpers.hideElement(element);
    assert.strictEqual(element.style.display, 'none');
  });

  it('changes elements display value to \'block\'', () => {
    Helpers.showElement(element);
    assert.strictEqual(element.style.display, 'block');
  });
});

describe('getCurrentDay()', () => {
  it('returns Thursday', () => {
    let actual = Helpers.getCurrentDay(new Date(2018, 2, 1, 1, 0, 0, 0));
    assert.equal('Thursday', actual);
  });

  it('returns Friday', () => {
    let actual = Helpers.getCurrentDay(new Date(2018, 2, 2, 1, 0, 0, 0));
    assert.equal('Friday', actual);
  });
});

describe('getCurrentDate()', () => {
  it('returns 1st', () => {
    let actual = Helpers.getCurrentDate(new Date(2018, 2, 1, 1, 0, 0, 0));
    assert.equal('1st', actual);
  });

  it('returns 2nd', () => {
    let actual = Helpers.getCurrentDate(new Date(2018, 2, 2, 1, 0, 0, 0));
    assert.equal('2nd', actual);
  });

  it('returns 3rd', () => {
    let actual = Helpers.getCurrentDate(new Date(2018, 2, 3, 1, 0, 0, 0));
    assert.equal('3rd', actual);
  });

  it('returns 4th', () => {
    let actual = Helpers.getCurrentDate(new Date(2018, 2, 4, 1, 0, 0, 0));
    assert.equal('4th', actual);
  });
});

describe('getCurrentMonth()', () => {
  it('returns January', () => {
    let actual = Helpers.getCurrentMonth(new Date(2018, 0, 1, 1, 0, 0, 0));
    assert.deepEqual('January', actual);
  });

  it('returns February', () => {
    let actual = Helpers.getCurrentMonth(new Date(2018, 1, 1, 1, 0, 0, 0));
    assert.deepEqual('February', actual);
  });
});
