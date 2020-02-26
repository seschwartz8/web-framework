import { Model } from '../models/Model';

type Callback = () => void;

// Abstract, because it will only ever be used to extend (since it doesn't have access to the needed info directly to template and eventsMap)
// T is the type of model, and K is the type of properties Model needs to receive (e.g. UserProps) since it is also generic
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    // Default implementation
    // regionsMap in use will return the page regions and the selectors for each region's HTML element
    return {};
  }

  eventsMap(): { [key: string]: Callback } {
    // Default implementation of eventsMap for all views, so that you don't have to manually implement it if you don't want any events
    return {};
  }

  bindModel(): void {
    // Re-render if any changes/updates in the model occur
    this.model.on('change', () => {
      this.render();
    });
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

  mapRegions(fragment: DocumentFragment): void {
    // Loop through regions/selectors and add the different regions to our regions property in the form (viewRegion: parentElementToNestIn)
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
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
    // Map each page region to the corresponding selectors
    this.mapRegions(templateElement.content);
    // Appends the HTML created in template as a child of the parent element designated in the parent property
    this.parent.append(templateElement.content);
  }
}
