import {makeAutoObservable, runInAction} from 'mobx';
import {AxiosInstance} from 'axios';
import {IProgressData} from '../../service/models/Progress';
import {IHabit} from './habits';

export type IProgress = Map<string, {progress: number, date: string, habitId: string, _id?: string}>;

export class Progress {
    service: AxiosInstance;

    habits: IHabit[] = [];

    progress: IProgress = new Map();

    constructor(service: AxiosInstance) {
        makeAutoObservable(this);
        this.service = service;
    }

    async getProgress(date: string): Promise<void> {
        const progress = await this.service
            .get(`/progress/${date}`)
            .then((res) => res.data);

        runInAction(() => {
            const output = new Map();
            progress.forEach((item: IProgressData) => output.set(item.habitId, item));
            this.setProgress(output);
        });
    }

    setProgress(progress: IProgress): void {
        this.progress = progress;
    }

    async increaseProgress(habit: IHabit, day: string): Promise<void> {
        const clonedProgress = new Map(this.progress);
        const habitId = habit._id || '';
        const progressId = this.progress.get(habitId)?._id;

        if (!progressId) {
            clonedProgress.set(habitId, {progress: 0, date: day, habitId});
            this.progress = clonedProgress;
        }

        let habitProgress = clonedProgress.get(habitId)?.progress;
        if (!habitProgress || habitProgress < habit.countNumber) {
            habitProgress = habitProgress ? habitProgress + 1 : 1;
            clonedProgress.set(habitId, {
                ...(clonedProgress.get(habitId) || {progress: 0, date: '', habitId: '', _id: ''}),
                ...{progress: habitProgress},
            });

            const progress = await this.service
                .post(`/progress/${progressId || ''}`, clonedProgress.get(habitId))
                .then((res) => res.data);

            runInAction(() => {
                clonedProgress.set(habitId, progress);
                this.setProgress(clonedProgress);
            });
        }
    }
}
