import axios from 'axios';
const axios = require('axios');
// import value from './index.js';

export default class NewApiServer {
  constructor() {
    this.valueInput = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fethApiServes() {
    const URL = 'https://pixabay.com/api/';
    const KEY = '29453019-5a69b6c7b2f01a070c80deb0c';

    const resp = await axios.get(`${URL}`, {
      params: {
        key: KEY,
        q: this.valueInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.per_page,
        page: this.page,
      },
    });
    this.nextPage();
    return resp.data;
  }
  nextPage() {
    this.page += 1;
  }

  resetPege() {
    this.page = 1;
  }

  get query() {
    return this.valueInput;
  }
  set query(neQuery) {
    this.valueInput = neQuery;
  }
}
