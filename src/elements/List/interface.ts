import {IHabit, IProgress} from '../../storage';

export interface IList {
    items: IHabit[];
    progress: IProgress;
    currentDate: string;
    increaseProgress: Function;
}
