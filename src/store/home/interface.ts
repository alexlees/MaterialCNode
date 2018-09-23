import { TopicTabs } from '@/enum';

interface Pages {
  ask: number;
  share: number;
  all: number;
  good: number;
  job: number;
  dev: number;
}

export interface HomeState {
  selectTab: TopicTabs;
  pages: Pages;
}

export type TabName = 'ask' | 'share' | 'good' | 'all' | 'job' | 'dev';

export type HomeMutationSetTab = (tab: TopicTabs) => void;
export type HomeGetterCurrentPage = (tab: TopicTabs) => number;
export type HomeActionPrevPage = (tab: TopicTabs) => Promise<boolean>;
export type HomeActionNextPage = (tab: TopicTabs) => Promise<boolean>;
