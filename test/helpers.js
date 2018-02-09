import { assert } from 'chai';
import { JSDOM } from 'jsdom'; // DOM
import 'babel-polyfill'; // Emulate a full ES2015+ environment
import helpers from '../js/helpers';

describe('showElement()', () => {
  const dom = new JSDOM('<p>Todo-app</p>');
  const element = dom.window.document.querySelector('p');

  it('changes elements display value to \'none\'', () => {
    helpers.hideElement(element);
    assert.strictEqual(element.style.display, 'none');
  });

  it('changes elements display value to \'block\'', () => {
    helpers.showElement(element);
    assert.strictEqual(element.style.display, 'block');
  });
});

describe('getCurrentDay()', () => {
  it('returns Monday 1st', () => {
    let actual = helpers.getCurrentDay(new Date(2018, 2, 1, 1, 0, 0, 0));
    assert.deepEqual(['Thursday', '1st'], actual);
  });

  it('returns Tuesday 2nd', () => {
    let actual = helpers.getCurrentDay(new Date(2018, 2, 2, 1, 0, 0, 0));
    assert.deepEqual(['Friday', '2nd'], actual);
  });

  it('returns Wednesday 3rd', () => {
    let actual = helpers.getCurrentDay(new Date(2018, 2, 3, 1, 0, 0, 0));
    assert.deepEqual(['Saturday', '3rd'], actual);
  });

  it('returns Friday 9th', () => {
    let actual = helpers.getCurrentDay(new Date(2018, 2, 4, 1, 0, 0, 0));
    assert.deepEqual(['Sunday', '4th'], actual);
  });
});

describe('getCurrentMonth()', () => {
  it('returns January', () => {
    let actual = helpers.getCurrentMonth(new Date(2018, 0, 1, 1, 0, 0, 0));
    assert.deepEqual('January', actual);
  });

  it('returns February', () => {
    let actual = helpers.getCurrentMonth(new Date(2018, 1, 1, 1, 0, 0, 0));
    assert.deepEqual('February', actual);
  });
});
