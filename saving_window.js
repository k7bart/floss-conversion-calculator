import { Collection } from "./collection.js";
import { conversionContainer } from "./conversion_container.js";
import { savedCollections } from "./saved_collections.js";

export function addSavingWindow(findedColors, savedLists) {
    renderSavingWindow();
    addEventListenerToSavingWindow(findedColors, savedLists);
}

function renderSavingWindow() {
    const savingWindowElement = document.createElement("div");
    savingWindowElement.id = "saving_window";
    savingWindowElement.innerHTML = `
    <button class="close_button">
    <img class="close_image" src="images/close.svg" alt="close" />
    </button>
    <input
        id="enter_name_input"
        maxlength="100"
        placeholder="Enter the name of the list"
        name="ConvertFromCode"
    />
    <button class="button" type="submit">
        <img class="image favorite_image" src="images/favorite.svg" alt="" />
    </button>`;
    document.body.appendChild(savingWindowElement);
}

function addEventListenerToSavingWindow(findedColors, savedLists) {
    const savingWindowElement = document.getElementById("saving_window");

    savingWindowElement.addEventListener("click", function (event) {
        let listOfColorsToSave = [...findedColors];

        const enterNameInput =
            savingWindowElement.querySelector("#enter_name_input");

        const closeButton = event.target.closest(".close_button");
        const saveButton = event.target.closest(".button");

        if (!closeButton && !saveButton) return;

        if (closeButton) return savingWindowElement.remove();

        if (saveButton) {
            const collection = new Collection(
                enterNameInput.value,
                listOfColorsToSave,
                conversionContainer.convertFrom,
                conversionContainer.convertTo
            );
            savedLists.push(collection);

            savedCollections.render(collection);

            savingWindowElement.remove();
            return;
        }
    });
}
