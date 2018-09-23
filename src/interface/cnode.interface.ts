export interface CNodeTopic {
  id: string;
  author: CNodeAuthor;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: Date;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: boolean;
  create_at: boolean;
}

export interface CNodeTopicDetail extends CNodeTopic {
  replies: CNodeReply[];
  is_collect: boolean;
}

export interface CNodeReply {
  id: string;
  author: CNodeAuthor;
  content: string;
  ups: string[];
  create_at: Date;
  reply_id?: string;
  is_uped: boolean;
}

export interface CNodeAuthor {
  loginname: string;
  avatar_url: string;
}
