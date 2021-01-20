import {model, Schema, Document} from 'mongoose';

const habitSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    countNumber: {
        type: Number,
        required: true,
    },
    dateRange: [{
        type: String,
    }],
    weekDays: [{
        type: Boolean,
    }],
    notifications: [{
        type: String,
    }],
});

export interface IHabit extends Document {
    title: string;
    dateRange: string[];
    weekDays: boolean[];
    countNumber: number;
    notifications: string[];
}

export default model<IHabit>('Habit', habitSchema);
