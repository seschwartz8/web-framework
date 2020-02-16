import { User } from './models/User';

const user = new User({ age: 25 });

user.set({ age: 26 });
console.log(user.get('name'));
console.log(user.get('age'));

user.on('change', () => {
  console.log('hi 1');
});
user.on('change', () => {
  console.log('hi 2');
});
user.on('save', () => {
  console.log('save triggered');
});

user.trigger('save');
user.trigger('holla');
