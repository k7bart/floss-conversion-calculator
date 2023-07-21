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
        addEventListenerToTableHeaderConverts();
        // addEventListenerToSortButton(this.listOfColors, this.convertFrom);
        addEventListenerToSortButtonConvertFrom(
            this.listOfColors,
            this.convertFrom
        );
        addEventListenerToSortButtonConvertTo(
            this.listOfColors,
            this.convertTo
        );

        addEventListenerToCloseButton();
    }
}

function renderHeader(convertFrom, convertTo) {
    const table = document.getElementById("saved_collection_table");
    const tableHeader = document.createElement("thead");
    tableHeader.id = "saved_collection_table_header";
    tableHeader.innerHTML = `
    <tr>
    <col>
    <col>
    <col>
    <col>
        <th id="convert_from_table_header" class="header">
            <div id="convert_from_container">
                ${convertFrom} 
                <button class="sort_button">
                    <div class="images_container">
                        <img class="sort_image" src="images/list.svg" alt="" />
                        <img class="arrow_image" src="images/double_arrow.svg" alt=""/>
                    </div>
                </button>
            </div>
        </th>
        <th class="header"></th>
        <th class="header">DMC Color</th>
        <th id="convert_to_table_header" class="header">
            <div id="convert_to_container">
                ${convertTo} 
                <button class="sort_button">
                    <div class="images_container">
                        <img class="sort_image" src="images/list.svg" alt="" />
                        <img class="arrow_image" src="images/double_arrow.svg" alt=""/>
                    </div>
                </button>
            </div>
        </th>
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

function addEventListenerToTableHeaderConverts() {
    const tableHeaderConvertFrom = document.getElementById(
        "convert_from_table_header"
    );
    const tableHeaderConvertTo = document.getElementById(
        "convert_to_table_header"
    );

    addEventListenerToTableHeaderConvert(tableHeaderConvertFrom);
    addEventListenerToTableHeaderConvert(tableHeaderConvertTo);

    function addEventListenerToTableHeaderConvert(tableHeaderElement) {
        if (
            tableHeaderElement === tableHeaderConvertTo &&
            tableHeaderElement.innerText !== "DMC"
        )
            return;

        tableHeaderElement.addEventListener("mouseenter", handleEvent);
        tableHeaderElement.addEventListener("mouseleave", handleEvent);

        function handleEvent(event) {
            const imagesContainer =
                tableHeaderElement.querySelector(".images_container");

            event.type === "mouseenter"
                ? (imagesContainer.style.visibility = "visible")
                : (imagesContainer.style.visibility = "hidden");
        }
    }
}

function addEventListenerToSortButtonConvertFrom(listOfColors, convertFrom) {
    if (convertFrom === "DMC") convertFrom = "DMCNumber";
    if (convertFrom === "Dimensions") convertFrom = "searchedNumber";

    const convertFromContainer = document.getElementById(
        "convert_from_container"
    );
    const sortButton = convertFromContainer.querySelector(".sort_button");
    const imagesContainer = sortButton.querySelector(".images_container");
    const imagesContainerConvertTo = document.querySelector(
        "#convert_to_container .images_container"
    );

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

    let nextSortType = sortTypes.smallerToLarger;
    let sortedListOfColors;

    sortButton.addEventListener("click", function () {
        imagesContainerConvertTo.innerHTML = sortTypes.default.images;

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

function addEventListenerToSortButtonConvertTo(listOfColors, convertTo) {
    if (convertTo === "Dimensions") return;
    if (convertTo === "DMC") convertTo = "DMCNumber";

    const convertToContainer = document.getElementById("convert_to_container");
    const sortButton = convertToContainer.querySelector(".sort_button");
    const imagesContainer = sortButton.querySelector(".images_container");
    const imagesContainerConvertFrom = document.querySelector(
        "#convert_from_container .images_container"
    );

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
                    return a[convertTo] - b[convertTo];
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
                    return b[convertTo] - a[convertTo];
                });
                return sortedList;
            },
        },
    };

    let nextSortType = sortTypes.smallerToLarger;
    let sortedListOfColors;

    sortButton.addEventListener("click", function () {
        imagesContainerConvertFrom.innerHTML = sortTypes.default.images;

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
