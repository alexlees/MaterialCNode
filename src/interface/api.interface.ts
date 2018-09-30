import { TopicTabs } from '@/enum';

export interface GetTopicsParams {
  page?: number;
  tab?: TopicTabs | string;
  limit?: number;
  mdrender?: boolean;
}

export interface GetTopicDetailParams {
  mdrender?: boolean;
  accesstoken?: string;
}
export interface PostAccessTokenData {
  accesstoken: string;
}
export interface PostCollect {
  accesstoken: string;
  topic_id: string;
}
export interface PostNewReplyData {
  accesstoken: string;
  content: string;
  reply_id?: string;
}
export interface GetUserMessagesParams {
  accesstoken: string;
  mdrender?: boolean;
}
