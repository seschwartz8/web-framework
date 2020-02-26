import { User } from '../models/User';

type Callback = () => void;

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    // Re-render if any changes/updates in the model occur
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: Callback } {
    // 'event:thing event occurs to': selector for element to bind event handler to
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    };
  }

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
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    // Loop through our events map object, and bind handlers for events
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      // e.g. break apart 'click' and 'button' from 'click:button'
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    // Empty the parent element (necessary for re-renders)
    this.parent.innerHTML = '';
    // Turns string into an HTML element using templateElement
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // Bind event handlers to HTML
    this.bindEvents(templateElement.content);
    // Appends the HTML created in template as a child of the parent element designated in the parent property
    this.parent.append(templateElement.content);
  }
}
