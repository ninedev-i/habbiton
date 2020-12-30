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
});

export interface IHabit extends Document {
    title: string;
    dateRange: string[];
    weekDays: boolean[];
    countNumber: number;
}

export default model<IHabit>('Habit', habitSchema);
