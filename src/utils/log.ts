class LogClass {
  public static getLog() {
    return new LogClass();
  }
  private development: boolean = process.env.NODE_ENV === 'development';
  private constructor() {}
  public log(...message: any[]) {
    if (this.development) {
      console.log(...message);
    }
  }
  public err(...message: any[]) {
    if (this.development) {
      console.error(...message);
    }
  }
  public get dev() {
    return this.development;
  }
}
export const Log = LogClass.getLog();
