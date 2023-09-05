import { Collection } from "./collection.js";
import { conversionContainer } from "./conversion_container.js";
import { library } from "./library.js";
import { findListItemElementInTheListElement } from "./library.js";
import { savedLists } from "./script.js";

export function addSavingWindow(findedColors) {
    renderSavingWindow();
    initializeEventListener(findedColors);
}

function renderSavingWindow() {
    const savingWindowElement = document.createElement("div");
    savingWindowElement.id = "saving_window";
    savingWindowElement.innerHTML = `
    <button class="transparent_button small_button close_button">
    <img class="close_image" src="images/close.svg" alt="close" />
    </button>
    <input
        id="enter_name_input"
        maxlength="100"
        placeholder="Enter the name of the list"
        name="ConvertFromCode"
    />
    <button class="button" type="submit">
        <img class="large_image favorite_image" src="images/favorite.svg" alt="" />
    </button>`;
    document.body.appendChild(savingWindowElement);
}

function initializeEventListener(findedColors) {
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
            if (!enterNameInput.value) {
                // TODO: change highlight
                // enterNameInput.classList.add("animate-highlight");
                // setTimeout(() => {
                //     enterNameInput.classList.remove("animate-highlight");
                // }, 1000);
                return;
            }

            const existCollectionWithSameName = savedLists.find(
                (collection) => collection.name === enterNameInput.value
            );

            if (existCollectionWithSameName) {
                const existCollectionWithSameNameElement =
                    findListItemElementInTheListElement(
                        existCollectionWithSameName.name
                    );
                // TODO: add highlight
                return;
            }

            const collection = new Collection(
                enterNameInput.value,
                listOfColorsToSave,
                conversionContainer.convertFrom,
                conversionContainer.convertTo
            );

            savedLists.push(collection);
            localStorage.setItem(`savedLists`, JSON.stringify(savedLists));
            library.DOMElement.renderNameOfCollection(collection);

            savingWindowElement.remove();
            return;
        }
    });
}
