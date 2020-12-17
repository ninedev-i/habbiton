export const getFormattedDate = (date = new Date()) => `
    ${date.getFullYear()}-
    ${date.getMonth() + 1}-
    ${date.getDate()}
    `;
