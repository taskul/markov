const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');
const { beforeEach } = require('node:test');
const {readTextData, getUrlData, createNewData} = require('./makeText');

describe('markov text', function() {
    let newObj = new markov.MarkovMachine('Hi my name is Peter')

    test('makeChains', function(){
        expect(newObj.wordChain).toEqual({
            'Hi my' : ['name'],
            'my name':['is'],
            'name is':['Peter'],
            'is Peter':[undefined],
            'Peter undefined':[undefined]
        })
    })
    test('randomArrIndex', function() {
        const newArr = ['new', 'word', 'combo', 'is', undefined];
        const randNum = newObj.randomArrIndex(newArr);
        expect(randNum).toEqual(expect.any(Number));
        expect(randNum).toBeGreaterThanOrEqual(0);
        expect(randNum).toBeLessThanOrEqual(5);
    })

    test('makeText', function() {
        const res = newObj.makeText(10);
        expect(res.endsWith('.')).toBeTruthy();
        expect(res).toEqual(expect.any(String));
    })

})

