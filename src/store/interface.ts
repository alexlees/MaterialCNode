export interface RootState {
  showTabbar: boolean;
}
export type RootMutationShowTabbar = () => void;
export type RootMutationHideTabbar = () => void;
export * from './home/interface';
export * from './topic/interface';
