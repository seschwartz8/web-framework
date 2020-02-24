import { User } from './models/User';
// import axios from 'axios';

const user = new User({ id: 1, name: 'newer', age: 110 });

user.on('save', () => {
  console.log(user);
});

user.save();
