import { Log } from '@/utils/log';

interface PhotoswipeItem {
  id: string;
  src: string;
  w: number;
  h: number;
}

type PhotoswipeItems = PhotoswipeItem [][];

class Store {
  public DATA_SRC_ATTRIBUTE_NAME = 'data-src';
  private DATA_ID_ATTRIBUTE_NAME = 'data-id';
  private nodes: PhotoswipeItems = [];
  private INDEX = 0;
  private INDEX_ATTRIBUTE_NAME = 'data-index';

  public add(el: HTMLElement) {
    this.nodes[this.INDEX] = [];
    el.setAttribute(this.INDEX_ATTRIBUTE_NAME, `${this.INDEX++}`);
  }
  public set(el: HTMLElement) {
    const index = parseInt(el.getAttribute(this.INDEX_ATTRIBUTE_NAME)!, 10);
    this.nodes[index] = this.getPhotoswipeItems(el);
  }
  public get(el: HTMLElement) {
    const index = parseInt(el.getAttribute(this.INDEX_ATTRIBUTE_NAME)!, 10);
    return this.nodes[index] || [];
  }
  public findIndex(el: HTMLElement, img: HTMLImageElement) {
    const id = img.getAttribute(this.DATA_ID_ATTRIBUTE_NAME);
    Log.log('id', id);
    const index = this.get(el).findIndex((i) => i.id === id);
    Log.log('index', index);
    return index === -1 ? 0 : index;
  }
  public remove(el: HTMLElement) {
    const index = parseInt(el.getAttribute(this.INDEX_ATTRIBUTE_NAME)!, 10);
    this.nodes.splice(index);
  }
  public getPhotoswipeItems(el: HTMLElement) {
    const imgs = [...el.querySelectorAll('img')]!;
    const w = window.screen.width;
    const items = imgs.map((img, index) => {
      const src = img.getAttribute(this.DATA_SRC_ATTRIBUTE_NAME) || img.src || '';
      const id = `${src}+${index}`;
      img.setAttribute(this.DATA_ID_ATTRIBUTE_NAME, id);
      return {
        id,
        src,
        w,
        h: img.naturalHeight * (w / img.naturalWidth),
      };
    });
    Log.log('getPhotoswipeItems', items);
    return items;
  }
}

export default new Store();
