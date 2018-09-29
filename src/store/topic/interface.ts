import { CNodeTopicDetail } from '@/interface';

export interface TopicState {
  topicDetail: CNodeTopicDetail | null;
}

export type TopicGetTopicDetail = (id: string) => Promise<boolean>;
export type TopicCollectOrDeCollect = () => void;
export type TopicNewReply = (content: string) => Promise<boolean>;
