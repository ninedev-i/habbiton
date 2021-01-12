import {model, Schema, Document} from 'mongoose';

const progressSchema: Schema = new Schema({
    date: {
        type: String,
        required: true,
    },
    habitId: {
        type: String,
    },
    progress: {
        type: Number,
    },
});

export interface IProgressData extends Document {
    date: string;
    habitId: string;
    progress: number;
}

export default model<IProgressData>('Progress', progressSchema);
