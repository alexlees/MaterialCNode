import { CNodeMessages } from '@/interface';

export interface MessageState {
  message: CNodeMessages;
}
export type MarkMessage = (messageId: string) => void;
