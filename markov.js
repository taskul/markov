/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.wordChain = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.words.forEach((word, i) => {
      if (word in this.wordChain) {
        this.wordChain[`${word} ${this.words[i+1]}`].push(this.words[i+2])
      } else {
        this.wordChain[`${word} ${this.words[i+1]}`] = [];
        this.wordChain[`${word} ${this.words[i+1]}`].push(this.words[i+2])
      }
    });
  }

  randomArrIndex(arr) {
    if (arr) {
      return Math.floor(Math.random() * arr.length);
    }
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let wordCount = 0;
    let largeString = '';
    const allKeys = Object.keys(this.wordChain);
    const doNotCount = ['.', ',', '(', ')', '”','“']
    // we divide numWords by 2 because we are producing two words potent
    while (wordCount <= numWords) {
    // for (let i=0; i < numWords/2;i++) {
      let startingWord;
      let wordCombo;
      let firstWord = allKeys[this.randomArrIndex(allKeys)]
      // try to avoid repeating words in a sequence.
      if (largeString.endsWith(allKeys[this.randomArrIndex(allKeys)])) {
        firstWord = allKeys[this.randomArrIndex(allKeys)];
      }
      // capitalize first letter of the word if it is a first word in a sentence
      if (largeString.length === 0 | largeString.endsWith('.')) {
        startingWord = ' '+firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      }
      // if the key returns a value of undefined, turn that into a comma or a period
      const valueArr = this.wordChain[firstWord][0] != undefined ? this.wordChain[firstWord] : ['.',','];
      // every key returns an array, and we want to pick a random word from that array
      let secondWord = valueArr[this.randomArrIndex(valueArr)];
      secondWord = secondWord === '.' ? secondWord : ' '+secondWord+' '
      // word combo if startingWord exists then it is a new sentence so we'll start with a capitalized word
      // else we'll start with lower case word
      wordCombo = startingWord ? `${startingWord}${secondWord}`: `${firstWord}${secondWord}`
      largeString += wordCombo;
      // count startingWord or firstWord
      wordCount +=1;
      if (!doNotCount.includes(secondWord)) {
        // count second word if it is a word
        wordCount += 1;
      }
      // end last sentence with a period
      // if (i+1 === numWords/2) {
      if (wordCount >= numWords){
        if (largeString.endsWith(', ')) {
          largeString = largeString.slice(0, -2) + '.'
        } else if (largeString.endsWith(' ')) {
          largeString = largeString.slice(0, -1) + '.'
        }
      }
    }
    return largeString;
  }
}

module.exports = {
  MarkovMachine,
};