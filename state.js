export const state = {
    savedLists: JSON.parse(localStorage.getItem("savedLists")),
};
export const savedListsCopy = [...state.savedLists];
