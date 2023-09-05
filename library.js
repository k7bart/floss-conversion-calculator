import { remove } from "./collection.js";
import { savedLists } from "./script.js";

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
            const libraryElement = document.getElementById(
                // знайти елемент контейнеру з збереженими колекціями
                "library_container"
            );

            libraryElement.addEventListener("click", (event) => {
                if (!savedLists.length) return; // якщо немає збережених колекцій повернутись

                const renderedCollectionContainer = document.getElementById(
                    // знайти контейнер колекції
                    "collection_container"
                );

                const clickedCollectionListItemElement =
                    event.target.closest("li"); // елемент тицьнутої колекції

                if (!clickedCollectionListItemElement) return; // якщо тицьнули на порожнє

                const clickedCollection = savedLists.find(
                    (collection) =>
                        collection.name ===
                        clickedCollectionListItemElement.querySelector(
                            ".name_container"
                        ).innerText // шукає обʼєкт колекції в масиві колекцій за допомогою тексту тицьнутої колекції
                );
                const alreadyRenderedCollection = savedLists.find(
                    (collection) => collection.isRendered // шукає відмальовану коллекцію в масиві колекцій
                );

                const renderedCollectionBackgroundColor = "rgb(35 35 35)";

                if (clickedCollection.isRendered) {
                    clickedCollectionListItemElement.style.backgroundColor =
                        "transparent";

                    remove(renderedCollectionContainer);
                    clickedCollection.isRendered = false;
                    return;
                }

                // якщо є якась відмальована колекція
                if (alreadyRenderedCollection) {
                    if (!alreadyRenderedCollection.isRemoved) {
                        // alreadyRenderedCollectionListItem
                        const listItem = findListItemElementInTheListElement(
                            alreadyRenderedCollection.name
                        );
                        listItem.style.backgroundColor = "transparent";
                    }

                    remove(renderedCollectionContainer);
                    alreadyRenderedCollection.isRendered = false;
                }

                if (!clickedCollection.isRendered) {
                    clickedCollectionListItemElement.style.backgroundColor =
                        renderedCollectionBackgroundColor;
                    clickedCollection.render();
                    clickedCollection.addEventListeners();
                    clickedCollection.isRendered = true;
                }
            });
        },
    },
};

// TODO: rename?
export function findListItemElementInTheListElement(name) {
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
