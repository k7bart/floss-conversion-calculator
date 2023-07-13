import { Collection } from "./collection.js";

export const savingWindow = {
    innerHTML: `
        <button class="close_button">
            <span class="material-symbols-outlined"> close </span>
        </button>
        <input
            id="enter_name_input"
            maxlength="100"
            placeholder="Enter the name of the list"
            name="ConvertFromCode"
        />
        <div id="arrange_checkbox_container">
            <input
                id="arrange_checkbox"
                type="checkbox"
                value=""
                checked="true"
            />
            Arrange the colors by number
        </div>
        <button class="save_button" type="submit">Save</button>`,

    render() {
        const savingWindowElement = document.createElement("div");
        savingWindowElement.id = "saving_window";
        savingWindowElement.innerHTML = savingWindow.innerHTML;
        document.body.appendChild(savingWindowElement);
    },

    addEventListenerToSavingWindow(findedColors, savedLists) {
        const savingWindowElement = document.getElementById("saving_window");

        savingWindowElement.addEventListener("click", function (event) {
            let listOfColorsToSave = [...findedColors];

            const enterNameInput =
                savingWindowElement.querySelector("#enter_name_input");
            const arrangeCheckbox =
                savingWindowElement.querySelector("#arrange_checkbox");

            const closeButton = event.target.closest(".close_button");
            const saveButton = event.target.closest(".save_button");

            if (!closeButton && !saveButton) return;

            if (closeButton) return savingWindowElement.remove();

            if (saveButton) {
                if (arrangeCheckbox.checked) {
                    listOfColorsToSave.sort(
                        (a, b) => a.DMCNumber - b.DMCNumber
                    );
                }
                savedLists.push(
                    new Collection(enterNameInput.value, listOfColorsToSave)
                );

                savingWindowElement.remove();
                return;
            }
        });
    },
};
