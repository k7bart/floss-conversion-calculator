import { arrayOfColors } from "./colors.js";
import { conversionContainer } from "./conversion_container.js";

export const conversionTable = {
    DOMElement: document.querySelector("table"),

    renderHeader(convertFrom, convertTo) {
        let tableHeader = document.querySelector("thead");

        if (!tableHeader) tableHeader = document.createElement("thead");

        tableHeader.innerHTML = `                
            <thead>
                <tr>
                    <th class="header">${convertFrom}</th>
                    <th class="header"></th>
                    <th class="header">DMC Color</th>
                    <th class="header">${convertTo}</th>
                </tr>
            </thead>`;

        this.DOMElement.appendChild(tableHeader);
    },

    renderBody() {
        const tableBody = document.createElement("tbody");
        tableBody.innerHTML = `
            <tbody>
                <tr>
                    <td class="input">
                        <input
                            type="search"
                            maxlength="5"
                            placeholder="Enter the number"
                            name="ConvertFromCode"
                        />
                    </td>
                </tr>
            </tbody>
        `;
        this.DOMElement.appendChild(tableBody);
    },

    addEventListenerToTableHeader() {
        const tableHeader = document.querySelector("thead");

        tableHeader.addEventListener("click", function (event) {});
    },

    addEventListenerToTableBody(findedColors) {
        const tableBody = document.querySelector("tbody");

        tableBody.addEventListener("keypress", function (event) {
            const activeInput = event.target.closest("input");
            const tableRowWithActiveInput = event.target.closest("tr");

            if (!activeInput || event.key !== "Enter") return;

            const numberForSearch = parseInt(activeInput.value);

            let findedColor;

            if (conversionContainer.convertFrom === "DMC") {
                findedColor = arrayOfColors.find(
                    (color) => color.DMCNumber === numberForSearch
                );

                if (!findedColor) return;

                if (
                    findedColors.some(
                        (color) => color.DMCNumber === numberForSearch
                    )
                ) {
                    //change
                    tableBody.children[findedColor.position].classList.add(
                        "animate-highlight"
                    );
                    setTimeout(() => {
                        tableBody.children[
                            findedColor.position
                        ].classList.remove("animate-highlight");
                    }, 1000);
                    return;
                }
            }

            if (conversionContainer.convertFrom === "Dimensions") {
                findedColor = findColorByDimensionsNumber(numberForSearch);
            }
            findedColor.position = findedColors.length; // come up with something else
            findedColors.push(findedColor);

            tableRowWithActiveInput.innerHTML = // відмалювали у рядок зі знайденим Кольором у пошуку
                findedColor.render(numberForSearch);

            if (!tableRowWithActiveInput.nextElementSibling) {
                const inputElement = `<tr><td><input type="search" maxlength="20" value="" placeholder="Enter the number" name="ConvertFromCode"></td></tr>`;
                tableBody.innerHTML += inputElement;
            }
        });
    },
};

function findColorByDimensionsNumber(numberForSearch) {
    let findedColor;

    for (const color of arrayOfColors) {
        const foundNumber = color.dimensionsNumber.find(
            (number) => number === numberForSearch
        );

        if (foundNumber) {
            color.searchedNumber = numberForSearch;
            findedColor = color;
            return findedColor;
        }
    }

    if (!findedColor) return;
}
