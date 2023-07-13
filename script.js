import { arrayOfColors } from "./colors.js";
import { savingWindow } from "./saving_window.js";
import { savedCollections } from "./saved_collections.js";

const tableBody = document.querySelector("tbody");
const saveButton = document.getElementById("save_button");
const collectionsButton = document.getElementById("collections_button");

let collectionsButtonIsClicked = false;

let findedColors = [];
let savedCollections = [];

const inputElement = `<tr><td><input type="search" maxlength="5" value="" placeholder="Enter the number" name="ConvertFromCode"></td></tr>`;

tableBody.addEventListener("keypress", function (event) {
    const activeInput = event.target.closest("input");
    const tableRowWithActiveInput = event.target.closest("tr");

    if (!activeInput) return;
    if (event.key !== "Enter") return;

    const numberForSearch = parseInt(activeInput.value); // витягли номер з інпуту

    const findedColor = arrayOfColors.find(
        (color) => color.DMCNumber === numberForSearch
    );

    if (!findedColor) return;

    if (findedColors.some((color) => color.DMCNumber === numberForSearch)) {
        tableBody.children[findedColor.position].classList.add(
            "animate-highlight"
        );
        setTimeout(() => {
            tableBody.children[findedColor.position].classList.remove(
                "animate-highlight"
            );
        }, 1000);
        return;
    }

    findedColor.position = findedColors.length; // rename

    findedColors.push(findedColor);

    tableRowWithActiveInput.innerHTML = findedColor.render();

    if (!tableRowWithActiveInput.nextElementSibling)
        tableBody.innerHTML += inputElement;
});

saveButton.addEventListener("click", function () {
    savingWindow.render();
    savingWindow.addEventListenerToSavingWindow(findedColors, savedCollections);
});

collectionsButton.addEventListener("click", function () {
    if (collectionsButtonIsClicked) {
        savedCollections.remove();
        collectionsButtonIsClicked = false;
        return;
    }

    savedCollections.render(savedCollections);
    savedCollections.addEventListenerToSidebar(savedCollections);
    collectionsButtonIsClicked = true;
});

// зробити щоб можна було перемикати виробників

// зробити щоб можна було зберігати палітру:
// зʼявляється вікно у вікна:
// 1. хрестик щоб закрити
// 2. інпут шоб ввести назву
// 3. галочка щоб впорядкувати
// 4. кнопка save
