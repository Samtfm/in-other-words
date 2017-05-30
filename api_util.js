const axios = require('axios');

export const fetchRandomWord = () => {
  return axios({
  	method: 'get',
  	url: "http://setgetgo.com/randomword/get.php"
  });
};
