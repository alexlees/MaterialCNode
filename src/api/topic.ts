import { GetTopicsParams, GetTopicDetailParams, PostCollect, PostNewTopicData, CNodeNewTopic } from '@/interface';
import { TopicTabs } from '@/enum';
import { request, getAccessToken, Log } from '@/utils';
import { CNodeTopic, CNodeTopicDetail, PostNewReplyData } from '@/interface';
const defaultGetTopicsParams: GetTopicsParams = {
  limit: 20,
};
/**
 * get /topics 主题
 * @param getTopicsParams
 * @author Alexlees
 */
export async function getTopics(getTopicsParams: GetTopicsParams = {}) {
  // TODO 检查参数
  // 合并参数
  const params: GetTopicsParams = {};
  Object.assign(params, defaultGetTopicsParams, getTopicsParams);
  // 转化Tab
  if (typeof params.tab === 'number') {
    params.tab = TopicTabs[params.tab as TopicTabs];
  }
  const { data } = await request.get('/topics', {params});
  if (data.data) {
    return data.data as CNodeTopic[];
  } else {
    // TODO 全局数据错误提示
    return Promise.reject('数据错误');
  }
}
/**
 * get /topic/:id 主题详情
 * @param id string 主题ID
 * @param params
 */
export async function getTopicDetail(
  id: string,
  {accesstoken = getAccessToken(), mdrender = true}: GetTopicDetailParams = {},
) {
  // TODO 检查参数
  const url = `/topic/${id}`;
  const { data } = await request.get(url, {params: {accesstoken, mdrender}});
  if (data.data) {
    return data.data as CNodeTopicDetail;
  } else {
    // TODO 全局数据错误提示
    return Promise.reject('数据错误');
  }
}
/**
 * post /topic_collect/collect 收藏主题
 * @param params
 */
export async function postCollect(params: PostCollect) {
  const {data} = await request.post('/topic_collect/collect', params);
  Log.log(data);
  return data;
}
/**
 * post /topic_collect/de_collect 取消主题
 * @param params
 */
export async function postDeCollect(params: PostCollect) {
  const {data} = await request.post('/topic_collect/de_collect', params);
  Log.log(data);
  return data;
}
/**
 * post /reply/:reply_id/ups 为评论点赞
 * @param replyId  评论id
 */
export async function postReplyUps(replyId: string, params: {accesstoken: string}) {
  const {data} = await request.post(`/reply/${replyId}/ups`, params);
  Log.log(data);
  return data;
}
/**
 * post /topic/:topic_id/replies 新建评论
 * @param topicId 主题Id
 * @param newReplyData 回复内容、token等
 */
export async function postNewReply(topicId: string, newReplyData: PostNewReplyData) {
  const { data} = await request.post(`/topic/${topicId}/replies`, newReplyData);
  return data;
}
/**
 * post /topics 新建主题
 * @param newTopic PostNewTopicData
 */
export async function postNewTopic(newTopic: PostNewTopicData) {
  const { data} = await request.post(`/topics`, newTopic);
  return data as CNodeNewTopic;
}
