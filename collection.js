import { library } from "./library.js";

export class Collection {
    constructor(name, listOfColors, convertFrom, convertTo) {
        this.name = name;
        this.listOfColors = listOfColors;
        this.isRendered = false;
        this.convertFrom = convertFrom;
        this.convertTo = convertTo;
    }

    // element:{}
    render() {
        const collectionContainer = document.createElement("div");
        collectionContainer.id = "collection_container";
        collectionContainer.classList.add("container");
        collectionContainer.innerHTML = `
        <button class="small_button transparent_button close_button">
            <img class="close_image" src="images/close.svg" alt="" />
        </button>
        <button class="manage_button">
            <img class="favorite_image" src="images/favorite.svg" alt="" />
            <img class="heart_broken_image" src="images/heart_broken.svg" alt="" />
        </button>
        <header>
            <h1>${this.name}</h1>
        </header>
        <table id="saved_collection_table" class="conversion_table">
        </table>
        <div id="buttons_container">
            <button class="button">                
                <img class="large_image" src="images/edit.svg" alt="edit" />
            </button>
            <button class="button">
                <img class="large_image" src="images/download.svg" alt="download" />
            </button>
        </div>
        `;

        document.getElementById("convert_container").style.display = "none";
        document.querySelector("main").appendChild(collectionContainer);
        renderHeader(this.convertFrom, this.convertTo);
        renderBody(this.listOfColors);
        return;
    }

    addEventListeners() {
        addEventListenerToTableHeaderConverts();
        addEventListenerToSortButtonConvertFrom(
            this.listOfColors,
            this.convertFrom
        );
        addEventListenerToSortButtonConvertTo(
            this.listOfColors,
            this.convertTo
        );

        addEventListenerToManageButton(this);
        addEventListenerToCloseButton();
    }
}

function renderHeader(convertFrom, convertTo) {
    const table = document.getElementById("saved_collection_table");
    const tableHeader = document.createElement("thead");
    tableHeader.id = "saved_collection_table_header";
    tableHeader.innerHTML = `
    <col>
    <col>
    <col>
    <col>
        <th id="convert_from_table_header" class="header">
            <div id="convert_from_container">
                <h4>${convertFrom}</h4>
                <button class="sort_button">
                    <div class="images_container">
                        <img class="sort_image" src="images/list.svg" alt="" />
                        <img class="arrow_image" src="images/double_arrow.svg" alt=""/>
                    </div>
                </button>
            </div>
        </th>
        <th class="header"></th>
        <th class="header">
            <h4>DMC Color</h4>
        </th>
        <th id="convert_to_table_header" class="header">
            <div id="convert_to_container">
                <h4>${convertTo}</h4>
                <button class="sort_button">
                    <div class="images_container">
                        <img class="sort_image" src="images/list.svg" alt="" />
                        <img class="arrow_image" src="images/double_arrow.svg" alt=""/>
                    </div>
                </button>
            </div>
        </th>
    `;
    table.appendChild(tableHeader);
}

function renderBody(listOfColors) {
    const collectionContainer = document.getElementById("collection_container");
    const table = collectionContainer.querySelector("table");
    let tableBody = table.querySelector("tbody");

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

    closeButton.addEventListener("click", function () {
        // ??? if (collection.isDeleted) забрати зі списку колекцій ???
        remove(collectionContainer);
    });
}

export function remove(collectionContainer) {
    const collectionName = collectionContainer.querySelector("h1").innerText;
    const collection = library.arrayOfCollections.find(
        (collection) => collection.name === collectionName
    );

    if (collection) {
        collection.isRendered = false;
        collectionContainer.remove();
        document.getElementById("convert_container").style.display = "block";
    }
}

function addEventListenerToManageButton(collection) {
    const manageButton = document.querySelector(
        "#collection_container .manage_button"
    );
    const favoriteImage = manageButton.querySelector(".favorite_image");
    const heartBrokenImage = manageButton.querySelector(".heart_broken_image");

    manageButton.addEventListener("mouseenter", handleRemovingEvent);
    manageButton.addEventListener("mouseleave", handleRemovingEvent);
    manageButton.addEventListener("click", handleRemovingEvent);

    function handleSavingEvent(event) {
        favoriteImage.style.display =
            event.type === "mouseenter" ? "block" : "none";
        heartBrokenImage.style.display =
            event.type === "mouseenter" ? "none" : "block";

        if (event.type === "click") {
            library.DOMElement.renderNameOfCollection(collection);
            manageButton.addEventListener("mouseenter", handleRemovingEvent);
            manageButton.addEventListener("mouseleave", handleRemovingEvent);
            manageButton.addEventListener("click", handleRemovingEvent);

            manageButton.removeEventListener("mouseenter", handleSavingEvent);
            manageButton.removeEventListener("mouseleave", handleSavingEvent);
            manageButton.removeEventListener("click", handleSavingEvent);

            favoriteImage.style.display = "none";
            heartBrokenImage.style.display = "block";
            collection.isRemoved = false;
        }
    }

    function handleRemovingEvent(event) {
        favoriteImage.style.display =
            event.type === "mouseenter" ? "none" : "block";
        heartBrokenImage.style.display =
            event.type === "mouseenter" ? "block" : "none";

        if (event.type === "click") {
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
                const warningWindowElement =
                    document.getElementById("warning_window");

                warningWindowElement.addEventListener(
                    "click",
                    function (event) {
                        const closeButton =
                            event.target.closest(".close_button");
                        const deleteButton = event.target.closest(".button");

                        if (!closeButton && !deleteButton) return;

                        if (closeButton) return warningWindowElement.remove();

                        if (deleteButton) {
                            //перемалювати кнопку
                            favoriteImage.style.display = "none";
                            heartBrokenImage.style.display = "block";

                            manageButton.removeEventListener(
                                "mouseenter",
                                handleRemovingEvent
                            );
                            manageButton.removeEventListener(
                                "mouseleave",
                                handleRemovingEvent
                            );
                            manageButton.removeEventListener(
                                "click",
                                handleRemovingEvent
                            );

                            manageButton.addEventListener(
                                "mouseenter",
                                handleSavingEvent
                            );
                            manageButton.addEventListener(
                                "mouseleave",
                                handleSavingEvent
                            );
                            manageButton.addEventListener(
                                "click",
                                handleSavingEvent
                            );

                            // забрати з елементу library
                            // може не забирати, а приховувати?
                            library.DOMElement.removeCollectionListItemElement(
                                collection.name
                            );

                            //про всяк випадок:
                            collection.isRemoved = true;
                            //прибрати вікно
                            warningWindowElement.remove();
                        }
                    }
                );
            }

            renderWarningWindow(collection);
            addEventListenerToWarningWindow(collection);
        }
    }
}
