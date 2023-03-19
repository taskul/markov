/** Command-line tool to generate Markov text. */
// import is working because I added "type": "module", to package.json
// otherwise I would need to use require, although require did not allow me to import MarkovMachine class, 
// and once I set "type": "module", in package.json require did not work, so I changed it all to import
const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');


async function processData() {
    if (process.argv[2]) {
        let filePath = process.argv[2];
        if (filePath.startsWith('http')) {
            await getUrlData(filePath)
        } else {
            readTextData(filePath)
        }
    }
}

function readTextData(filePath) {
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            console.log('ERROR: unable to locate file ', filePath)
        } else {
            createNewData(data, filePath)
        }
    })
    return data
}

async function getUrlData(filePath) {
    let result;
    try {
        result = await axios.get(filePath)
    } catch (err) {
        console.log(`Error: ${filePath} returned in error ${err}`)
    }
    createNewData(result.data)
}

function createNewData(content, filePath) {
    const newMarkov = new markov.MarkovMachine(content)
    let newText = newMarkov.makeText();
    fs.writeFile('./newData.txt', newText, 'utf8', function(err) {
        if (err) {
            console.log(`Unable to save contents of ${filePath} to newData.txt`)
        } else {
            console.log(`... generated text from file ${filePath} ...`)
        }
    })
}

processData()

module.exports = { readTextData, getUrlData, createNewData }
