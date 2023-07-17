import { savedCollections } from "./saved_collections.js";

export class Collection {
    constructor(name, listOfColors, convertFrom, convertTo) {
        this.name = name;
        this.listOfColors = listOfColors;
        this.isRendered = false;
        this.convertFrom = convertFrom;
        this.convertTo = convertTo;
    }

    render() {
        const collectionContainer = document.createElement("div");
        collectionContainer.id = "collection_container";
        collectionContainer.classList.add("container");
        collectionContainer.innerHTML = `
        <button class="close_button">
            <span class="material-symbols-outlined"> close </span>
        </button>
        <header>
            <h1>${this.name}</h1>
        </header>
        <table id="saved_collection_table" class="conversion_table">
        </table>
        <div id="buttons_container">
            <button class="button">                
                <img class="image" src="images/edit.svg" alt="edit" />
            </button>
            <button class="button">
                <img class="image" src="images/download.svg" alt="download" />
            </button>
        </div>
        `;

        document.getElementById("convert_container").style.display = "none";
        document.body.appendChild(collectionContainer);
        renderHeader(this.convertFrom, this.convertTo);
        renderBody(this.listOfColors);

        addEventListenerToCollection(collectionContainer);
        addEventListenerToTableHeader();
        addEventListenerToSortButton();

        return;
    }
}

function renderHeader(convertFrom, convertTo) {
    const table = document.getElementById("saved_collection_table");
    const tableHeader = document.createElement("thead");
    tableHeader.innerHTML = `
    <tr>
        <th id="table_header_convert_to" class="header">
            <div id="convert-from-container">
                ${convertFrom} 
                <button class="sort_button">
                    <img class="sort_image" src="images/arrow_down.svg" alt="Arrow down" />
                </button>
            </div>
        </th>
        <th class="header"></th>
        <th class="header">DMC Color</th>
        <th class="header">${convertTo}</th>
    </tr>
    `;
    table.appendChild(tableHeader);
}

function renderBody(listOfColors) {
    const table = document.getElementById("saved_collection_table");
    const tableBodyInnerHTML = listOfColors.reduce(
        (html, color) => html + color.render(),
        ""
    );

    const tableBody = document.createElement("tbody");
    tableBody.innerHTML = tableBodyInnerHTML;

    table.appendChild(tableBody);
}

function addEventListenerToTableHeader() {
    const tableHeaderConvertTo = document.getElementById(
        "table_header_convert_to"
    );
    const sortImage = tableHeaderConvertTo.querySelector("img");

    tableHeaderConvertTo.addEventListener("mouseenter", handleEvent);
    tableHeaderConvertTo.addEventListener("mouseleave", handleEvent);

    function handleEvent(event) {
        event.type === "mouseenter"
            ? (sortImage.style.visibility = "visible")
            : (sortImage.style.visibility = "hidden");
    }
}

function addEventListenerToSortButton() {
    const sortButton = document.querySelector(".sort_button");
    const currentSortType = {};
    const sortTypes = [];

    sortButton.addEventListener("click", function (event) {
        if (event.type === "click") {
            console.log("Click event triggered");
            return;
        }
    });
}

function addEventListenerToCloseButton() {
    const collectionContainer = document.getElementById("collection_container");
    const closeButton = collectionContainer.querySelector(".close_button");

    closeButton.addEventListener("click", function (event) {
        const collection = findCollectionByName(collectionContainer);
        collection.remove(collectionContainer);
    });
}

// function findCollectionByName(collectionContainer) {
//     const collectionName = collectionContainer.querySelector("h1").innerText;
//     return savedCollections.arrayOfCollections.find(
//         (collection) => collection.name === collectionName
//     );
// }

// function remove(collectionContainer) {
//     const collection = findCollectionByName(collectionContainer);
//     collection.isRendered = false;
//     collectionContainer.remove();
//     document.getElementById("convert_container").style.display = "flex";
// }

function remove(collectionContainer) {
    const collectionName = collectionContainer.querySelector("h1").innerText;
    const collection = savedCollections.arrayOfCollections.find(
        (collection) => collection.name === collectionName
    );

    if (collection) {
        collection.isRendered = false;
        collectionContainer.remove();
        document.getElementById("convert_container").style.display = "flex";
    }
}
