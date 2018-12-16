import { request } from '@/utils';
import {
  AxiosResponseCommon,
  CNodeUserInfo,
  CNodeTopic,
  GetUserMessagesParams,
  CNodeMessages,
  MarkMessageRes,
} from '@/interface';
/**
 * post /accesstoken 验证 accessToken 的正确性
 * @param data
 */
export async function postAccessToken(accesstoken: string) {
  // TODO 检查 AccessToken
  const {data} = await request.post('/accesstoken', {accesstoken});
  return data as {success: true, loginname: string, id: string, avatar_url: string};
}
/**
 * get /user/:loginname 用户详情
 * @param loginname
 */
export async function getUserInfo(loginname: string) {
  const res = await request.get(`/user/${loginname}`);
  const data: AxiosResponseCommon<CNodeUserInfo> = res.data;
  if (data.data) {
    return data.data;
  }
  return Promise.reject('网络未知错误，请重试');
}
/**
 * get /topic_collect/:loginname 用户所收藏的主题
 * @param loginname
 */
export async function getUserFavorite(loginname: string) {
  const {data} = await request.get(`/topic_collect/${loginname}`);
  const res: CNodeTopic[] = data.data;
  return res;
}
/**
 * get /messages 获取已读和未读消息
 * @param getUserMessagesParams
 */
export async function getUserMessages(getUserMessagesParams: GetUserMessagesParams) {
  const { data } = await request.get('/messages', {params: getUserMessagesParams});
  return data.data as CNodeMessages;
}


/**
 * post /message/mark_one/:msg_id 标记单个消息为已读
 * @param messageId
 * @param accesstoken
 */
export async function postMarkMessage(messageId: string, accesstoken: string) {
  const {data} = await request.post(`/message/mark_one/${messageId}`, {accesstoken});
  return data.data as MarkMessageRes;
}
