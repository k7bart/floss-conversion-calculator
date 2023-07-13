export const savedCollections = {
    render(savedCollections) {
        const returnInnerHTML = () => {
            let listItemsInnerHTML = ``;

            savedCollections.forEach((collection) => {
                listItemsInnerHTML += `<li>${collection.name}</li>`;
            });

            return `
            <h1>Saved Collections</h1>
            <ul>
              ${listItemsInnerHTML}
            </ul>`;
        };

        const savedCollectionsElement = document.createElement("div");
        savedCollectionsElement.id = "collections_container";
        savedCollectionsElement.classList.add("container", "slide-entrance");
        savedCollectionsElement.innerHTML = returnInnerHTML();
        document.body.appendChild(savedCollectionsElement);
    },

    remove() {
        const savedCollectionsElement = document.getElementById(
            "collections_container"
        );
        savedCollectionsElement.classList.remove("slide-entrance");

        savedCollectionsElement.classList.add("slide-exit");

        setTimeout(() => {
            savedCollectionsElement.remove();
        }, 1000);
    },

    addEventListenerToSidebar(savedCollections) {
        document
            .getElementById("collections_container")
            .addEventListener("click", function (event) {
                const findedCollection = savedCollections.find(
                    (collection) =>
                        collection.name === event.target.closest("li").innerText
                );

                findedCollection.render();
            });
    },
};
