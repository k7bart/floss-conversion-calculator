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
        return;
    }

    addEventListeners() {
        addEventListenerToTableHeader();
        addEventListenerToSortButton(this.listOfColors, this.convertFrom);
        addEventListenerToCloseButton();
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
                    <div id="images_container">
                        <img class="sort_image" src="images/list.svg" alt="" />
                        <img class="arrow_image" src="images/double_arrow.svg" alt=""/>
                    </div>
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

    let tableBody = document.querySelector("#saved_collection_table tbody");
    if (!tableBody) tableBody = document.createElement("tbody");

    tableBody.innerHTML = listOfColors.reduce(
        (html, color) => html + color.render(color.searchedNumber),
        ""
    );

    table.appendChild(tableBody);

    return;
}

function addEventListenerToTableHeader() {
    const imagesContainer = document.getElementById("images_container");
    const tableHeaderConvertTo = document.getElementById(
        "table_header_convert_to"
    );

    tableHeaderConvertTo.addEventListener("mouseenter", handleEvent);
    tableHeaderConvertTo.addEventListener("mouseleave", handleEvent);

    function handleEvent(event) {
        event.type === "mouseenter"
            ? (imagesContainer.style.visibility = "visible")
            : (imagesContainer.style.visibility = "hidden");
    }
}

function addEventListenerToSortButton(listOfColors, convertFrom) {
    const sortButton = document.querySelector(".sort_button");
    const imagesContainer = document.getElementById("images_container");

    const sortTypes = {
        default: {
            images: `                        
            <img class="sort_image" src="images/list.svg" alt="" />
            <img class="arrow_image" src="images/double_arrow.svg" alt=""/>`,
        },
        smallerToLarger: {
            images: `                        
            <img id="rotated_sort_image" class="sort_image" src="images/sort.svg" alt="" />
            <img class="arrow_image" src="images/arrow.svg" alt=""/>`,
            sort() {
                let sortedList;
                sortedList = listOfColors.slice().sort(function (a, b) {
                    return a[convertFrom] - b[convertFrom];
                });
                return sortedList;
            },
        },
        largerToSmaller: {
            images: `                        
            <img class="sort_image" src="images/sort.svg" alt="" />
            <img id="arrow_down_image" class="arrow_image" src="images/arrow.svg" alt=""/>`,
            sort() {
                let sortedList;
                sortedList = listOfColors.slice().sort(function (a, b) {
                    return b[convertFrom] - a[convertFrom];
                });
                return sortedList;
            },
        },
    };

    if (convertFrom === "DMC") convertFrom = "DMCNumber";
    if (convertFrom === "Dimensions") convertFrom = "searchedNumber";
    let nextSortType = sortTypes.smallerToLarger;
    let sortedListOfColors;

    sortButton.addEventListener("click", function () {
        switch (nextSortType) {
            case sortTypes.smallerToLarger:
                sortedListOfColors = sortTypes.smallerToLarger.sort();
                renderBody(sortedListOfColors);
                imagesContainer.innerHTML = sortTypes.smallerToLarger.images;
                nextSortType = sortTypes.largerToSmaller;
                break;
            case sortTypes.largerToSmaller:
                sortedListOfColors = sortTypes.largerToSmaller.sort();
                renderBody(sortedListOfColors);
                imagesContainer.innerHTML = sortTypes.largerToSmaller.images;
                nextSortType = "default";
                break;
            default:
                sortedListOfColors = sortTypes.smallerToLarger.sort();
                renderBody(listOfColors);
                imagesContainer.innerHTML = sortTypes.default.images;
                nextSortType = sortTypes.smallerToLarger;
                break;
        }
    });
}

function addEventListenerToCloseButton() {
    const collectionContainer = document.getElementById("collection_container");
    const closeButton = collectionContainer.querySelector(".close_button");

    closeButton.addEventListener("click", function (event) {
        remove(collectionContainer);
    });
}

export function remove(collectionContainer) {
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
