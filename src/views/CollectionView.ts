import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    // Iterate over every model in collection and render it to the screen
    // clear out old HTML for re-renders
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    for (let model of this.collection.models) {
      // Build up parent element and pass it to renderItem
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
