import { ShareActionTypes } from '../constants';
import { IShareApp } from '../../types/interfaces';

export const shareApp = (payload: IShareApp) => ({
  type: ShareActionTypes.SHARE_APP,
  payload,
});
