import { conversionContainer } from "./conversion_container.js";
import { conversionTable } from "./conversion_table.js";
import { addSavingWindow } from "./saving_window.js";
import { savedCollections } from "./saved_collections.js";

const saveButton = document.getElementById("save_button");

let findedColors = [];

conversionTable.renderHeader(
    conversionContainer.convertFrom,
    conversionContainer.convertTo
);
conversionTable.renderBody();
conversionContainer.addEventListenerToConversionContainer(findedColors);
savedCollections.addEventListenerToSidebar();

saveButton.addEventListener("click", function () {
    if (!findedColors.length) return;
    addSavingWindow(findedColors, savedCollections.arrayOfCollections);
});
