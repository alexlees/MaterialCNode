import { CNodeTopic, CNodeReply, PostNewTopicData, CNodeNewTopic } from '@/interface';

export interface RootState {
  showTabbar: boolean;
  user: UserInfo | null;
  accesstoken: null | string;
  snackBar: SnackBar;
  prefix: string;
  addPrefix: boolean;
  myFavorites: CNodeTopic[];
  dialog: Dialog;
}
export interface UserInfo {
  loginname: string;
  avatar_url: string;
  githubUsername: string;
  create_at: Date;
  score: number;
  recent_topics: CNodeTopic[];
  recent_replies: CNodeReply[];
}
export interface SnackBar {
  timeout?: number;
  value?: boolean;
  message?: string;
  color?: 'success' | 'info' | 'error' | 'cyan darjen-2';
}
export interface Dialog {
  value?: boolean;
  title?: string;
  content?: string;
  failCb?: () => void;
  successCb?: () => void;
}
export type RootMutationShowTabbar = () => void;
export type RootMutationHideTabbar = () => void;
export type RootActionLogin = (accesstoken: string) => Promise<boolean>;
export type RootActionLogOut = () => void;
export type RootActionGetFavor = () => void;
export type RootActionCreateTopic = (topic: PostNewTopicData) => Promise<CNodeNewTopic | null>;
export type RootMutationShowDialog = (dialog: Dialog) => void;
export type RootMutationHideDialog = () => void;
export * from './home/interface';
export * from './topic/interface';
export * from './author/interface';
export * from './messages/interface';
