export const getHabits = (initHabit = []) => {
    const storage = localStorage.getItem('habits');
    return storage ? JSON.parse(storage) : initHabit;
};

export const saveHabits = (habits) => localStorage.setItem('habits', JSON.stringify(habits));

export const getTheme = () => localStorage.getItem('theme') || 'light';

export const saveTheme = (chosenTheme) => localStorage.setItem('theme', chosenTheme);
