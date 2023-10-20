import addSavingWindow from "./saving_window.js";
import { conversionContainer } from "./conversion_table.js";
import { conversionTable } from "./conversion_table.js";
import { library } from "./library.js";

import state from "./state.js";
import { Collection } from "./collection.js";
import Color from "./colors.js";

// привʼязую прототипи
if (state.savedLists.length) {
    for (let list of state.savedLists) {
        Object.setPrototypeOf(list, Collection.prototype);

        for (let color of list.listOfColors) {
            Object.setPrototypeOf(color, Color.prototype);
        }
    }
}

let findedColors = [];

conversionTable.renderHeader(
    conversionContainer.convertFrom,
    conversionContainer.convertTo
);
conversionTable.renderBody();
conversionContainer.addEventListenerToConversionContainer(findedColors);

library.DOMElement.initializeEventListeners();

const saveButton = document.getElementById("save_button");
saveButton.addEventListener("click", function () {
    if (!findedColors.length) return;
    addSavingWindow(
        findedColors,
        conversionContainer.convertFrom,
        conversionContainer.convertTo
    );
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
