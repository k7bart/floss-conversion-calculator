import state from "./state.js";

export const library = {
    DOMElement: {
        renderNameOfCollection(collection) {
            const listOfCollectionsElement = document.querySelector(
                "#library_container ul"
            );

            const listItemWithNameOfCollection = document.createElement("li");

            const nameContainer = document.createElement("p");
            nameContainer.innerText = collection.name;
            nameContainer.classList.add("name_container");

            const conversionDataContainer = document.createElement("p");
            conversionDataContainer.innerHTML = `
            ${collection.convertFrom} <img class="arrow_forward_image" src="images/arrow_forward.svg" alt="" /> ${collection.convertTo}
            `;
            conversionDataContainer.classList.add("conversion_data_container");

            listItemWithNameOfCollection.append(
                nameContainer,
                conversionDataContainer
            );

            listOfCollectionsElement.append(listItemWithNameOfCollection);
        },

        removeCollectionListItemElement(name) {
            const listItem = findListItemElementInTheListElement(name);
            listItem.remove();
        },

        initializeEventListeners() {
            // знайти елемент бібліотеки
            const libraryElement = document.getElementById("library_container");

            libraryElement.addEventListener("click", (event) => {
                // контейнер відмальованої колекції
                const renderedCollectionContainer = document.getElementById(
                    "collection_container"
                );

                // обʼєкт відмальованої колекції
                const renderedCollection = state.savedLists.find(
                    (collection) => collection.isRendered
                );

                // елемент тицьнутої колекції в списку
                const clickedCollectionListItemElement =
                    event.target.closest("li");

                // обʼєкт тицьнутої колекції
                const clickedCollection = state.savedLists.find(
                    (collection) =>
                        collection.name ===
                        clickedCollectionListItemElement.querySelector(
                            ".name_container"
                        ).innerText
                );

                if (!clickedCollectionListItemElement) return; // якщо тицьнули на порожнє

                if (renderedCollection) {
                    // якщо відмальована та, на яку натиснули
                    if (clickedCollection.isRendered) {
                        clickedCollectionListItemElement.classList.remove(
                            "active-background"
                        );
                        renderedCollection.remove(renderedCollectionContainer);
                        clickedCollection.isRendered = false;
                        return;
                    }

                    if (clickedCollection != renderedCollection) {
                        if (renderedCollection.isRemoved) {
                            // забрати з кешу
                            state.savedLists = state.savedLists.filter(
                                (list) => list.name !== renderedCollection.name
                            );

                            localStorage.setItem(
                                `savedLists`,
                                JSON.stringify(state.savedLists)
                            );
                        }

                        if (!renderedCollection.isRemoved) {
                            const listItem =
                                findListItemElementInTheListElement(
                                    renderedCollection.name
                                );
                            listItem.classList.remove("active-background");
                            renderedCollection.isRendered = false;
                        }

                        renderedCollectionContainer.remove();
                    }
                }

                clickedCollectionListItemElement.classList.add(
                    "active-background"
                );
                clickedCollection.render();
                clickedCollection.addEventListeners();
                clickedCollection.isRendered = true;
            });
        },
    },
};

// TODO: rename?
function findListItemElementInTheListElement(name) {
    const listOfCollectionsElement = document.querySelector(
        "#library_container ul"
    );
    const listItems = listOfCollectionsElement.querySelectorAll("li");

    let listItemElement;

    listItems.forEach((item) => {
        let itemName = item.querySelector(".name_container").innerText;
        if (itemName === name) {
            listItemElement = item;
            return;
        }
    });

    return listItemElement;
}

if (state.savedLists.length) {
    for (let list of state.savedLists) {
        library.DOMElement.renderNameOfCollection(list);
    }
}
