import { TopicTabs } from '@/enum';

export interface GetTopicsParams{
  page?: number;
  tab?: TopicTabs | string;
  limit?: number;
  mdrender?: boolean;
}

export interface GetTopicDetailParams{
  mdrender?: boolean;
  accesstoken?: string;
}
