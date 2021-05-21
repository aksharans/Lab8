/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';

 // page loaded in new tab returns length 1
describe('length for states to be 2, 3, 4', () => {
    test('length after push root to equal 2', () => {
        expect(pushToHistory().length).toBe(2);
    });
    test('length after push settings to equal 3', () => {
        expect(pushToHistory('settings').length).toBe(3);
    });
    test('length after push entry # to equal 4', () => {
        expect(pushToHistory('entry', 1).length).toBe(4);
    });    
})

describe('state for root, settings, entry to have respective pages', () => {
    test('push settings to equal settings state', () => {
        expect(pushToHistory('settings').state).toEqual({page: "settings"});
    }); 
    test('push root to equal root state', () => {
        expect(pushToHistory().state).toEqual({});
    });
    test('push entry # to equal entry # state', () => {
        expect(pushToHistory('entry', 1).state).toEqual({page: "entry1"});
    });  
})
