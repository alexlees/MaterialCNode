export const rootMutations = {
  SHOW_TABBAR: 'SHOW_TABBAR',
  HIDE_TABBAR: 'HIDE_TABBAR',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  DELETE_ACCESS_TOKEN: 'DELETE_ACCESS_TOKEN',
  SHOW_SNACK_BAR: 'SHOW_SNACK_BAR',
  HIDE_SNACK_BAR: 'HIDE_SNACK_BAR',
  TOGGLE_ADD_PREFIX: 'TOGGLE_ADD_PREFIX',
};

export const rootActions = {
  LOGIN: 'LOGIN',
  GET_USER_INFO: 'GET_USER_INFO',
  LOGOUT: 'LOGOUT',
};
export * from './home/types';
export * from './topic/types';
export * from './favorite/types';
export * from './author/types';
export * from './messages/types';
