import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    // Use a specific view to render the model into the given parent element
    new UserShow(itemParent, model).render();
  }
}
