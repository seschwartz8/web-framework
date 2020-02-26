import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
  // T is the type of model (e.g. User) and K is the structure of JSON data we expect to get (e.g. UserProps interface)
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    // Deseralize is a fx that takes in data of type K and builds an object of type T
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      // For every object on the response, deserialize the data, build an object from it, add it to the Collection's models array
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger('change');
    });
  }
}
