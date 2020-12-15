export const getHabits = (initHabit = []) => {
    const storage = localStorage.getItem('habits');
    return storage ? JSON.parse(storage) : initHabit;
};

export const saveHabits = (habits) => localStorage.setItem('habits', JSON.stringify(habits));

export const getTheme = () => localStorage.getItem('theme') || 'light';

export const saveTheme = (chosenTheme) => localStorage.setItem('theme', chosenTheme);

export const getProgress = () => {
    let progress = localStorage.getItem('progress');
    progress = progress ? new Map(JSON.parse(progress)) : new Map();
    return progress;
};

export const saveProgress = (progress) => {
    localStorage.setItem('progress', JSON.stringify(Array.from(progress.entries())));
};
