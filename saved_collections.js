import { remove } from "./collection.js";

export const library = {
    arrayOfCollections: [],

    DOMElement: {
        renderNameOfCollection(nameOfCollection) {
            const listOfCollectionsElement = document.querySelector(
                "#saved_collections_container ul"
            );

            const listItemWithNameOfCollection = document.createElement("li");
            listItemWithNameOfCollection.innerText = nameOfCollection;

            listOfCollectionsElement.append(listItemWithNameOfCollection);
        },

        removeNameOfCollection(name) {
            const listItem = findListItemInTheList(name);
            listItem.remove();
        },

        addEventListenerToLibraryElement() {
            const libraryElement = document.getElementById(
                // знайти елемент контейнеру з збереженими колекціями
                "saved_collections_container"
            );

            libraryElement.addEventListener("click", (event) => {
                if (!library.arrayOfCollections.length) return; // якщо немає збережених колекцій повернутись

                const renderedCollectionContainer = document.getElementById(
                    // знайти контейнер колекції
                    "collection_container"
                );

                const clickedCollectionListItemElement =
                    event.target.closest("li"); // елемент тицьнутої колекції
                const clickedCollection = library.arrayOfCollections.find(
                    (collection) =>
                        collection.name ===
                        clickedCollectionListItemElement.innerText // шукає обʼєкт колекції в масиві колекцій за допомогою тексту тицьнутої колекції
                );
                const alreadyRenderedCollection =
                    library.arrayOfCollections.find(
                        (collection) => collection.isRendered // шукає відмальовану коллекцію в масиві колекцій
                    );

                const renderedCollectionBackgroundColor = "rgb(232 221 218)";
                const defaultBackgroundColor = "rgb(245 236 233)";

                if (clickedCollection.isRendered) {
                    clickedCollectionListItemElement.style.backgroundColor =
                        defaultBackgroundColor;

                    remove(renderedCollectionContainer);
                    clickedCollection.isRendered = false;
                    return;
                }

                // якщо є якась відмальована колекція
                if (alreadyRenderedCollection) {
                    if (!alreadyRenderedCollection.isRemoved) {
                        // alreadyRenderedCollectionListItem
                        const listItem = findListItemInTheList(
                            alreadyRenderedCollection.name
                        );
                        listItem.style.backgroundColor = defaultBackgroundColor;
                    }

                    remove(renderedCollectionContainer);
                    alreadyRenderedCollection.isRendered = false;
                }

                clickedCollectionListItemElement.style.backgroundColor =
                    renderedCollectionBackgroundColor;
                clickedCollection.render();
                clickedCollection.addEventListeners();
                clickedCollection.isRendered = true;
            });
        },
    },
};

function findListItemInTheList(name) {
    const listOfCollectionsElement = document.querySelector(
        "#saved_collections_container ul"
    );
    const listItems = listOfCollectionsElement.querySelectorAll("li");

    let listItem;

    listItems.forEach((item) => {
        if (item.innerText === name) {
            listItem = item;
            return;
        }
    });

    return listItem;
}
