import { IMainState } from '../reducers/main';

export const usersSelector = ({ main: { users } }: { main: IMainState }) => users;

