import { GetTopicsParams, GetTopicDetailParams } from '@/interface';
import { TopicTabs } from '@/enum';
import { request } from '@/utils';
import { CNodeTopic, CNodeTopicDetail } from '@/interface/cnode.interface';
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
export async function getTopicDetail(id: string, params: GetTopicDetailParams = {}) {
  // TODO 检查参数
  const url = `/topic/${id}`;
  const { data } = await request.get(url, {params});
  if (data.data) {
    return data.data as CNodeTopicDetail[];
  } else {
    // TODO 全局数据错误提示
    return Promise.reject('数据错误');
  }
}
