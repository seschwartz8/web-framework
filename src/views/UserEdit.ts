import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    // Override the default, empty regionsMap with the views we want to nest
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    };
  }

  onRender(): void {
    // Accomplish the nesting
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    // Nest UserForm and UserShow in this view
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
