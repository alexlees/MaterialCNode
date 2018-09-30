import { CNodeTopic, CNodeReply } from '@/interface';

export interface RootState {
  showTabbar: boolean;
  user: UserInfo | null;
  accesstoken: null | string;
  snackBar: SnackBar;
  prefix: string;
  addPrefix: boolean;
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
export type RootMutationShowTabbar = () => void;
export type RootMutationHideTabbar = () => void;
export type RootActionLogin = (accesstoken: string) => Promise<boolean>;
export type RootActionLogOut = () => void;
export * from './home/interface';
export * from './topic/interface';
export * from './favorite/interface';
export * from './author/interface';
export * from './messages/interface';
