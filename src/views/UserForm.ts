import { User, UserProps } from '../models/User';
import { View } from './View';

type Callback = () => void;

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: Callback } {
    // 'event:thing event occurs to': selector for element to bind event handler to
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    };
  }

  onSaveClick = (): void => {
    this.model.save();
  };

  onSetAgeClick = (): void => {
    // Handler for random age button click
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    // Handler for change name button click
    // Get value of text input and update name to this value
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
    }
    this.model.set({ name: name });
  };

  template(): string {
    // Returns the HTML element to be appended
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
