import { CNodeTopicDetail } from '@/interface';

export interface TopicState {
  topicDetail: CNodeTopicDetail | null;
}

export type TopicGetTopicDetail = (id: string) => Promise<boolean>;
