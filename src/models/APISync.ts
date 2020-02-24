import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class APISync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    // User that already has ID, already has a server-side representation and is just being updated with PUT request. New user will need a POST request.
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(`${this.rootUrl}`, data);
    }
  }
}
