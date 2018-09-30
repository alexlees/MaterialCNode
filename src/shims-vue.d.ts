declare module '*.vue' {
  import Vue from 'vue';
  interface $style{
    [props: string]: any;
  }
  export default Vue;
}
