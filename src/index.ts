import { UserForm } from './views/UserForm';
import { User } from './models/User';

const user = User.buildUser({ name: 'Sasa', age: 20 });
const root = document.getElementById('root');
if (root) {
  const userForm = new UserForm(root, user);
} else {
  throw new Error('Root element not found');
}
