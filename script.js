import { conversionContainer } from "./conversion_container.js";
import { conversionTable } from "./conversion_table.js";
import { addSavingWindow } from "./saving_window.js";
import { library } from "./saved_collections.js";

const saveButton = document.getElementById("save_button");

let findedColors = [];

conversionTable.renderHeader(
    conversionContainer.convertFrom,
    conversionContainer.convertTo
);
conversionTable.renderBody();
conversionContainer.addEventListenerToConversionContainer(findedColors);
library.DOMElement.addEventListenerToLibraryElement();

saveButton.addEventListener("click", function () {
    if (!findedColors.length) return;
    addSavingWindow(findedColors, library.arrayOfCollections);
});
