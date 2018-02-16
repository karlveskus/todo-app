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
  it('returns Monday', () => {
    let actual = Helpers.getCurrentDay(1518390000000);
    assert.equal('Monday', actual);
  });

  it('returns Tuesday', () => {
    let actual = Helpers.getCurrentDay(1518476400000);
    assert.equal('Tuesday', actual);
  });
});

describe('getCurrentDate()', () => {
  it('returns 1st', () => {
    let actual = Helpers.getCurrentDate(1519858800000);
    assert.equal('1st', actual);
  });

  it('returns 2nd', () => {
    let actual = Helpers.getCurrentDate(1519945200000);
    assert.equal('2nd', actual);
  });

  it('returns 3rd', () => {
    let actual = Helpers.getCurrentDate(1520031600000);
    assert.equal('3rd', actual);
  });

  it('returns 4th', () => {
    let actual = Helpers.getCurrentDate(1520118000000);
    assert.equal('4th', actual);
  });
});

describe('getCurrentMonth()', () => {
  it('returns January', () => {
    let actual = Helpers.getCurrentMonth(1514761200000);
    assert.deepEqual('January', actual);
  });

  it('returns February', () => {
    let actual = Helpers.getCurrentMonth(1517439600000);
    assert.deepEqual('February', actual);
  });
});
