import { FeedbackActionTypes } from '../constants';
import { IFeedback } from '../../types/interfaces';

export const sendFeedback = (payload: IFeedback) => ({
  type: FeedbackActionTypes.SEND_FEEDBACK,
  payload,
});
