import {IHabit} from '../../storage/habits';

export interface IList {
    items: IHabit[];
    currentDate: string;
}
