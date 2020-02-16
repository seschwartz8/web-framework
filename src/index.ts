import { User } from './models/User';
import axios from 'axios';

axios.post('http://localhost:3000/users/1', {
  name: 'myname',
  age: 20
});

axios.get('http://localhost:3000/users/1', {});
