import { RootState } from './interface';
import { getAccessToken } from '@/utils';

const state: RootState = {
  showTabbar: true,
  user: null,
  accesstoken: getAccessToken(),
  snackBar: {
    value: false,
    timeout: 6000,
    color: 'error',
    message: '',
  },
  prefix: `

------
来自[MaterialCNode](https://mcnode.alexlees.top/)
`,
  addPrefix: true,
  myFavorites: [],
  dialog: {
    value: false,
  },
};

export default state;
