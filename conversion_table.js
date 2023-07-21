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

    addEventListenerToTableBody(findedColors) {
        const tableBody = document.querySelector("tbody");

        tableBody.addEventListener("keypress", function (event) {
            const activeInput = event.target.closest("input");
            const tableRowWithActiveInput = event.target.closest("tr");

            if (!activeInput || event.key !== "Enter") return;

            const numberForSearch = parseInt(activeInput.value);

            let findedColor = findColor(
                numberForSearch,
                conversionContainer.convertFrom
            );

            let colorIsFound = checkIfColorIsFound(
                findedColors,
                numberForSearch,
                conversionContainer.convertFrom
            );

            if (colorIsFound) {
                highlightFoundColor(findedColor, tableBody);
                return;
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

function findColor(numberForSearch, convertFrom) {
    let findedColor;

    if (convertFrom === "DMC") {
        findedColor = arrayOfColors.find(
            (color) => color.DMCNumber === numberForSearch
        );
    }

    if (convertFrom === "Dimensions") {
        findedColor = findColorByDimensionsNumber(numberForSearch);
    }

    if (!findedColor) return;

    return findedColor;
}

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

function checkIfColorIsFound(findedColors, numberForSearch, convertFrom) {
    const isColorFound = findedColors.some(
        (color) =>
            color[convertFrom === "DMC" ? "DMCNumber" : "searchedNumber"] ===
            numberForSearch
    );

    return isColorFound;
}

// change logic
function highlightFoundColor(findedColor, tableBody) {
    tableBody.children[findedColor.position].classList.add("animate-highlight");

    setTimeout(() => {
        tableBody.children[findedColor.position].classList.remove(
            "animate-highlight"
        );
    }, 1000);
}
