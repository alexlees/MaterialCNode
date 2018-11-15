import { CNodeTopicDetail } from '@/interface';

export function findInArr(arr: CNodeTopicDetail[], id: string) {
  return arr.find((detail) => {
    return detail.id === id;
  }) || null;
}
