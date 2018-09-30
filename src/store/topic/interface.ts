import { CNodeTopicDetail } from '@/interface';

export interface TopicState {
  topicDetail: CNodeTopicDetail | null;
  replyId: string | null;
}

export type TopicGetTopicDetail = (id: string) => Promise<boolean>;
export type TopicSetReplyId = (id: string) => void;
export type TopicDeleteReplyId = () => void;
export type TopicCollectOrDeCollect = () => void;
export type TopicNewReply = (content: string) => Promise<boolean>;
