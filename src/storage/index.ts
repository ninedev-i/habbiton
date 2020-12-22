export interface IHabit {
    key: number;
    title: string;
    dateRange: string[];
    weekDays?: boolean[];
    countNumber: number;
}

export const getHabits = (initHabit: IHabit[] = []): IHabit[] => {
    const storage = localStorage.getItem('habits');
    return storage ? JSON.parse(storage) : initHabit;
};

export const saveHabits = (habits: IHabit[]): void => localStorage.setItem('habits', JSON.stringify(habits));

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
