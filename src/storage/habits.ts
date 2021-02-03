import {makeAutoObservable, runInAction} from 'mobx';
import {AxiosInstance} from 'axios';

export interface IHabit {
    _id?: string;
    title: string;
    dateRange: (string|null)[];
    weekDays: boolean[];
    countNumber: number;
    notifications: string[];
}

export class Habits {
    service: AxiosInstance;

    habits: IHabit[] = [];

    constructor(service: AxiosInstance) {
        makeAutoObservable(this);
        this.service = service;
    }

    async getHabits(): Promise<void> {
        const habits = await this.service
            .get<IHabit[]>('/habits')
            .then(({data}) => data);

        runInAction(() => {
            this.habits = habits;
        });
    }

    async saveHabit(habit: IHabit): Promise<void> {
        const habits = await this.service
            .post(`/habits/${habit._id || ''}`, habit)
            .then(({data}) => data);

        runInAction(() => {
            this.habits = habit._id
                ? this.habits.slice(0).map((item) => (item._id === habit._id ? habits : item))
                : [...this.habits, habits];
        });
    }

    deleteHabit(key: string): Promise<void> {
        return this.service
            .delete(`/habits/${key}`)
            .then(() => {
                this.habits = this.habits.filter((item) => item._id !== key);
            });
    }
}
