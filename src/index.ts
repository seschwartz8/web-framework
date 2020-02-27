import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';

// Make new collection of users
const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

// Event handler to watch for change event
users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserList(root, users).render();
  }
});

// Fetch the different users from json server endpoint (see the db.json file to see the database contents)
users.fetch();
