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
                    <th class="header">
                        <h4>${convertFrom}</h4>
                    </th>
                    <th class="header"></th>
                    <th class="header">
                        <h4>DMC Color</h4>
                    </th>
                    <th class="header">
                        <h4>${convertTo}</h4>
                    </th>
                    <th class="header small_th"></th>
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

    addEventListenerToTableBody(findedColors) {
        const tableBody = document.querySelector("tbody");

        tableBody.addEventListener("keypress", function (event) {
            const activeInput = event.target.closest("input");
            const tableRowWithActiveInput = event.target.closest("tr");

            if (!activeInput || event.key !== "Enter") return;

            const numberForSearch = parseInt(activeInput.value);

            const findedColor = findColor(
                numberForSearch,
                conversionContainer.convertFrom,
                arrayOfColors
            );

            if (!findedColor) return;

            if (findedColors.length === 0) {
                const selects = document.getElementById("selects_container");
                selects.remove();
            }

            const colorIsFound = checkIfColorIsFound(
                findedColors,
                numberForSearch,
                conversionContainer.convertFrom
            );

            if (colorIsFound) {
                highlightFoundColor(findedColor, findedColors, tableBody);
                return;
            }

            tableRowWithActiveInput.innerHTML = // відмалювали у рядок зі знайденим Кольором у пошуку
                findedColor.render(numberForSearch, "tableBody");

            // if there was a color - replace it
            if (activeInput.defaultValue) {
                const colorToRemove = findColor(
                    parseInt(activeInput.defaultValue),
                    conversionContainer.convertFrom,
                    findedColors
                );

                findedColors.splice(
                    findedColors.indexOf(colorToRemove),
                    1,
                    findedColor
                );

                return;
            }

            findedColors.push(findedColor);

            const inputElement = `<tr><td><input type="search" maxlength="5" value="" placeholder="Enter the number" name="ConvertFromCode"></td></tr>`;
            tableBody.innerHTML += inputElement;
        });
    },
};

function findColor(numberForSearch, convertFrom, array) {
    let findedColor;

    if (convertFrom === "DMC") {
        findedColor = array.find(
            (color) => color.DMCNumber === numberForSearch
        );
    }

    if (convertFrom === "Dimensions") {
        findedColor = findColorByDimensionsNumber(numberForSearch, array);
    }

    return findedColor;
}

function findColorByDimensionsNumber(numberForSearch, array) {
    let findedColor;

    for (const color of array) {
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

function checkIfColorIsFound(findedColors, numberForSearch, convertFrom) {
    const isColorFound = findedColors.some(
        (color) =>
            color[convertFrom === "DMC" ? "DMCNumber" : "searchedNumber"] ===
            numberForSearch
    );

    return isColorFound;
}

// change logic
function highlightFoundColor(findedColor, findedColors, tableBody) {
    const indexOfFindedColor = findedColors.indexOf(findedColor);

    tableBody.children[indexOfFindedColor].classList.add("animate-highlight");

    setTimeout(() => {
        tableBody.children[indexOfFindedColor].classList.remove(
            "animate-highlight"
        );
    }, 1000);
}
