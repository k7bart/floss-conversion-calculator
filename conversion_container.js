import { conversionTable } from "./conversion_table.js";

export const conversionContainer = {
    convertFrom: "DMC",
    convertTo: "Dimensions", //change to default?
    addEventListenerToConversionContainer(findedColors) {
        this.addEventListenerToDropdowns(); // може занести всередину?
        conversionTable.addEventListenerToTableBody(findedColors);
    },
    addEventListenerToDropdowns() {
        const convertFromDropdown = document.getElementById(
            "select_convert_from"
        );
        const convertToDropdown = document.getElementById("select_convert_to");

        convertFromDropdown.addEventListener("change", function () {
            handleDropdownChange(convertFromDropdown, "convertFrom");
        });

        convertToDropdown.addEventListener("change", function () {
            handleDropdownChange(convertToDropdown, "convertTo");
        });

        function handleDropdownChange(dropdown, property) {
            conversionContainer[property] = dropdown.value;
            conversionTable.renderHeader(
                conversionContainer.convertFrom,
                conversionContainer.convertTo
            );
        }
    },
};
