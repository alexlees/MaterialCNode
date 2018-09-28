import { request } from '@/utils';
import { AxiosResponseCommon, CNodeUserInfo, CNodeTopic } from '@/interface';
import { Log } from '@/utils';
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

