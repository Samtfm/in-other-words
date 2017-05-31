const axios = require('axios');
const key = "a2a73e7b926c924fad7001ca3111acd55af2ff";

export const fetchRandomWord = () => {
  return axios({
  	method: 'get',
  	url: "http://setgetgo.com/randomword/get.php"
  });
};

export const fetchRelatedWords = (word) => {
  return axios({
    method: 'GET',
    url: `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=${key}abf50eb4ae5`
  });
};
