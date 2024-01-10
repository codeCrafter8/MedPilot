import axios from 'axios';

const jsonServer = axios.create({
  baseURL: 'https://0cd6-91-210-239-10.ngrok-free.app', 
});

export default jsonServer;
