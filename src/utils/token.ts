class Store {
  public static getInstace() {
    return new Store();
  }
  private store = window.localStorage;
  public setItem(key: string, value: any) {
    this.store.setItem(key, JSON.stringify(value));
  }
  public getItem(key: string) {
    const data = this.store.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  public clear() {
    this.store.clear();
  }
  public remove(key: string) {
    this.store.removeItem(key);
  }
}

const store = Store.getInstace();
const ACCESSTOKEN_KEY = `ACCESSTOKEN_KEY`;

export function setAccessToken(accesstoken: string) {
  store.setItem(ACCESSTOKEN_KEY, accesstoken);
}

export function getAccessToken() {
  return store.getItem(ACCESSTOKEN_KEY);
}
export function removeAccessToken() {
  store.remove(ACCESSTOKEN_KEY);
}
