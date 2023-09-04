import { conversionContainer } from "./conversion_container.js";
import { conversionTable } from "./conversion_table.js";
import { addSavingWindow } from "./saving_window.js";
import { library } from "./library.js";
import { Collection } from "./collection.js";
import { Color } from "./colors.js";

let findedColors = [];

let savedLists = JSON.parse(localStorage.getItem("savedLists"));

conversionTable.renderHeader(
    conversionContainer.convertFrom,
    conversionContainer.convertTo
);
conversionTable.renderBody();
conversionContainer.addEventListenerToConversionContainer(findedColors);

if (savedLists) {
    for (let list of savedLists) {
        library.DOMElement.renderNameOfCollection(list);
        Object.setPrototypeOf(list, Collection.prototype);

        for (let color of list.listOfColors) {
            Object.setPrototypeOf(color, Color.prototype);
        }
    }
}

if (!savedLists) savedLists = [];

library.DOMElement.initializeEventListeners();

const saveButton = document.getElementById("save_button");
saveButton.addEventListener("click", function () {
    if (!findedColors.length) return;
    addSavingWindow(findedColors, library.arrayOfCollections);
});

const restartButton = document.getElementById("restart_button");
restartButton.addEventListener("click", () => {
    const tbody = document.querySelector("tbody");
    const trows = document.querySelectorAll("tbody tr");

    if (trows.length === 1) return;

    findedColors = [];

    trows.forEach((row) => {
        if (row !== tbody.lastChild) {
            tbody.removeChild(row);
        }
    });
});

export { savedLists };
