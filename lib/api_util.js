const axios = require('axios');
const key = "a2a73e7b926c924fad7001ca3111acd55af2ff";

export const fetchRandomWord = () => {
  return axios({
  	method: 'get',
  	// url: "http://setgetgo.com/randomword/get.php"
    url: `http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${key}abf50eb4ae5`
  });
};


export const fetchRandomWords = (count) => {
  return axios({
  	method: 'get',
  	// url: "http://setgetgo.com/randomword/get.php"
    url: `http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=40&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=${count}&api_key=${key}abf50eb4ae5`
  });
};

export const fetchRelatedWords = (word) => {
  return axios({
    method: 'GET',
    url: `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=20&api_key=${key}abf50eb4ae5`
  });
};
