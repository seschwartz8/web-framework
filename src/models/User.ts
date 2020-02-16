interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    // Override values on this.data with update object
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    // Add eventListener callbacks to events property
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    // If there are no handlers, return early
    if (!handlers || handlers.length === 0) {
      return;
    }
    // For every handler in the array, call it
    handlers.forEach(callback => {
      callback();
    });
  }
}
