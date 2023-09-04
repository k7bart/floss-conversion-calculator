import { library } from "./library.js";

export function addWarningWindow(collection) {
    renderWarningWindow(collection);
    addEventListenerToWarningWindow(collection);
}

function renderWarningWindow(collection) {
    const warningWindowElement = document.createElement("div");
    warningWindowElement.id = "warning_window";
    warningWindowElement.innerHTML = `
        <p>Are you sure you want to remove the ${collection.name} Collection from your Library?</p>
        <button class="close_button">
        <img class="close_image" src="images/close.svg" alt="close" />
        </button>
        <button class="button" type="submit">
            <img class="large_image favorite_image" src="images/heart_broken.svg" alt="" />
        </button>
        `;
    document.body.appendChild(warningWindowElement);
}
function addEventListenerToWarningWindow(collection) {
    const warningWindowElement = document.getElementById("warning_window");

    warningWindowElement.addEventListener("click", function (event) {
        const closeButton = event.target.closest(".close_button");
        const deleteButton = event.target.closest(".button");

        if (!closeButton && !deleteButton) return;

        if (closeButton) return warningWindowElement.remove();

        if (deleteButton) {
            // забрати з елементу library
            // може не забирати, а приховувати?
            library.DOMElement.removeCollectionListItemElement(collection.name);
            collection.isRemoved = true;
            //прибрати вікно
            warningWindowElement.remove();
        }
    });
}
