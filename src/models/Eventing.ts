type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    // Add eventListener callbacks to events property
    // Using an arrow function to always keep "this" bound to the instance of Eventing we create
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    // Using an arrow function to always keep "this" bound to the instance of Eventing we create
    const handlers = this.events[eventName];
    // If there are no handlers, return early
    if (!handlers || handlers.length === 0) {
      return;
    }
    // For every handler in the array, call it
    handlers.forEach(callback => {
      callback();
    });
  };
}
