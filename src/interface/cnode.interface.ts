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
export interface CNodeUserInfo {
  loginname: string;
  avatar_url: string;
  githubUsername: string;
  create_at: Date;
  score: number;
  recent_topics: CNodeTopic[];
  recent_replies: CNodeReply[];
}
export interface CNodeMessage {
  id: string;
  type: 'at' | 'reply';
  has_read: boolean;
  author: CNodeAuthor;
  topic: {
    id: string;
    title: string;
    last_reply_at: Date;
  };
  reply: {
    id: string;
    content: string;
    ups: [];
    create_at: Date;
  };
}
export interface CNodeNewTopic {
  success: boolean;
  topic_id?: string;
  error_msg?: string;
}
export interface CNodeMessages {
  has_read_messages: CNodeMessage[];
  hasnot_read_messages: CNodeMessage[];
}
export interface MarkMessageRes {
  success: boolean;
  marked_msg_id: string;
}
