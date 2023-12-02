import axios from 'axios';

const jsonServer = axios.create({
  baseURL: 'https://d19a-91-210-239-10.ngrok.io', 
});

export default jsonServer;
