const axios = require('axios');
import { randomWordStrings } from './starter_words';

export const fetchRandomWord = () => {
  return axios({
  	method: 'get',
  	url: "http://setgetgo.com/randomword/get.php"
    // url: `http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${key}abf50eb4ae5`
  });
};


export const fetchRandomWords = (count) => {
  return axios({
  	method: 'get',
  	// url: "https://setgetgo.com/randomword/get.php"
    url: `http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=40&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=${count}&api_key=${key}abf50eb4ae5`
  });
};

export const fetchRelatedWords = (word) => {
  // return axios({
  //   method: 'GET',
  //   url: `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=20&api_key=${key}abf50eb4ae5`
  // });
  return axios({
    method: 'GET',
    url: `https://words.bighugelabs.com/api/2/ed2424f86e18055fe691eeab030ac337/${word}/json`
  });
};

export const requestRandomWords = (count, callback) => {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(randomWordStrings[Math.floor(Math.random()*randomWordStrings.length)]);
  }
  callback(words);
};

export const requestRelatedWords = (word, callback) => {
  fetchRelatedWords(word).then(res => {
    const words = [];
    for (let partOfSpeech in res.data) {
      const syns = res.data[partOfSpeech].syn;
      if (syns) {
        words.push(...syns.filter(text => text.split(' ').length === 1));
      }
    }
    callback(words);
  }, (err) => {
    callback([]);
  }
);
};
