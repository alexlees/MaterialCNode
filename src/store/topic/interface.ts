import { CNodeTopicDetail } from '@/interface';

export interface TopicState {
  topicDetail: CNodeTopicDetail | null;
  topicDetails: CNodeTopicDetail[];
  replyId: string | null;
}
export interface AddDetailsParmas {
  id: string;
  topicDetail: CNodeTopicDetail;
}

export type GetTopicDetail = (id: string) => Promise<boolean>;
export type SetReplyId = (id: string) => void;
export type DeleteReplyId = () => void;
export type CollectOrDeCollect = () => void;
export type NewReply = (content: string) => Promise<boolean>;
export type InitTopicDetail = GetTopicDetail;
export type DetailGetter = (id: string) => CNodeTopicDetail;
