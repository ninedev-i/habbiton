import {makeAutoObservable} from 'mobx';
import {AxiosInstance} from 'axios';

export interface IHabit {
    _id: string;
    title: string;
    dateRange: string[];
    weekDays?: boolean[];
    countNumber: number;
}

export class Habits {
    service: AxiosInstance = null;

    habits: IHabit[] = [];

    constructor(service: AxiosInstance) {
        makeAutoObservable(this);
        this.service = service;
        this.getHabits();
    }

    getHabits(): Promise<void> {
        return this.service
            .get<IHabit[]>('/habits')
            .then(({data}) => {
                this.habits = data;
            });
    }

    saveHabit(habit: IHabit): Promise<void> {
        return this.service
            .post(`/habits/${habit._id || ''}`, habit)
            .then((res) => {
                this.habits = habit._id
                    ? this.habits.slice(0).map((item) => (item._id === habit._id ? res.data : item))
                    : [...this.habits, res.data];
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
