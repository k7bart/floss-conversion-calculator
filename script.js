import { library } from "./library.js";
import { conversionContainer } from "./conversion_container.js";
import { conversionTable } from "./conversion_table.js";
import { addSavingWindow } from "./saving_window.js";

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
