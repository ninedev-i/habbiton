import axios from 'axios';
import {IProgressData} from '../../service/models/Progress';

const data = axios.create({
    baseURL: 'http://localhost:3000',
});

export interface IHabit {
    _id: string;
    title: string;
    dateRange: string[];
    weekDays?: boolean[];
    countNumber: number;
}

export const getHabits = (): Promise<IHabit[]> => {
    return data
        .get<IHabit[]>('/habits')
        .then((res) => res.data);
};

export const saveHabits = (habit: IHabit): Promise<IHabit> => {
    return data
        .post(`/habits/${habit._id || ''}`, habit)
        .then((res) => res.data);
};

type ITheme = 'light'|'dark';
export const getTheme = (): ITheme => localStorage.getItem('theme') as ITheme || 'light';

export const saveTheme = (chosenTheme: ITheme) => localStorage.setItem('theme', chosenTheme);

export type IProgress = Map<string, {[habitNumber: string]: number }>;

export const getProgress = (date: string): Promise<IProgress> => {
    return data
        .get(`/progress/${date}`)
        .then((res) => {
            const output = new Map();
            res.data.forEach((item: IProgressData) => output.set(item.habitId, item));

            return output;
        });
};

export const saveProgress = (progress: IProgressData) => {
    return data
        .post(`/progress/${progress._id || ''}`, progress)
        .then((res) => res.data);
};
