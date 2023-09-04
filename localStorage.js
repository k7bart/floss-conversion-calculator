export let savedLists = getSavedLists();

function getSavedLists() {
    let savedLists = JSON.parse(localStorage.getItem("savedLists"));

    if (savedLists) {
        for (let list of savedLists) {
            library.DOMElement.renderNameOfCollection(list);
            Object.setPrototypeOf(list, Collection.prototype);

            for (let color of list.listOfColors) {
                Object.setPrototypeOf(color);
            }
        }
    }

    if (!savedLists) savedLists = [];

    return savedLists;
}

//знайти список кольорів
// для кожного кольору поставити прототайп
