const state = {
    savedLists: JSON.parse(localStorage.getItem("savedLists")) ?? [],
};

export default state;
