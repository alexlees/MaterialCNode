export interface AxiosResponseCommon<T> {
  success: boolean;
  error_msg?: string;
  data?: T;
}
export interface AxiosResponseSuccess<T> extends AxiosResponseCommon<T> {
  success: true;
  data: T;
}
