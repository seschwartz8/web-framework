export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    // K can only ever be one of the different keys of T
    // The return type is the value at the key K when K is looked up in interface T
    // Using an arrow function to always keep "this" bound to the instance of attribute we create
    return this.data[key];
  };

  set(update: T): void {
    // Override current data values with update object
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
