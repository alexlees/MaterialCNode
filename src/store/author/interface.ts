import { UserInfo } from '@/store/interface';

export interface AuthorState {
  author: UserInfo | null;
}
export type ActionGetAuthor = (loginname: string) => Promise<void>;
