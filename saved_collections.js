import { remove } from "./collection.js";

export const savedCollections = {
    arrayOfCollections: [],

    render(collection) {
        const collectionsListElement = document.querySelector(
            "#saved_collections_container ul"
        );

        const collectionsListItem = document.createElement("li");
        collectionsListItem.innerText = collection.name;

        collectionsListElement.append(collectionsListItem);
    },

    addEventListenerToSidebar() {
        if (!savedCollections.arrayOfCollections) return;

        const container = document.getElementById(
            "saved_collections_container"
        );

        container.addEventListener("click", (event) => {
            const collectionContainer = document.getElementById(
                "collection_container"
            );

            const clickedCollection = event.target.closest("li");
            const findedCollection = savedCollections.arrayOfCollections.find(
                (collection) => collection.name === clickedCollection.innerText
            );
            const renderedCollection = savedCollections.arrayOfCollections.find(
                (collection) => collection.isRendered
            );

            const colorOfBackground = "rgb(232 221 218)";
            const activeCollectionColor = "rgb(245 236 233)";

            if (findedCollection.isRendered) {
                clickedCollection.style.backgroundColor = activeCollectionColor;
                remove(collectionContainer);
                findedCollection.isRendered = false;
                return;
            }

            if (renderedCollection) {
                const listItems = container.querySelectorAll("li");
                listItems.forEach((collection) => {
                    if (collection.innerText === renderedCollection.name) {
                        collection.style.backgroundColor =
                            activeCollectionColor;
                    }
                });

                remove(collectionContainer);
                renderedCollection.isRendered = false;
            }

            clickedCollection.style.backgroundColor = colorOfBackground;
            findedCollection.render();
            findedCollection.addEventListeners();
            findedCollection.isRendered = true;
        });
    },
};
