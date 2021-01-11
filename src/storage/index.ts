import axios from 'axios';

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

export const getProgress = (): IProgress => {
    const progress = localStorage.getItem('progress');
    return progress ? new Map(JSON.parse(progress)) : new Map();
};

export const saveProgress = (progress: IProgress) => {
    localStorage.setItem('progress', JSON.stringify(Array.from(progress.entries())));
};
