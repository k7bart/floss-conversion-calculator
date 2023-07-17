import { savedCollections } from "./saved_collections.js";

export class Collection {
    constructor(name, listOfColors) {
        this.name = name;
        this.listOfColors = listOfColors;
        this.isRendered = false;
    }

    render() {
        const tableBodyInnerHTML = this.listOfColors.reduce(
            (html, color) => html + color.render(),
            ""
        );

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
        <table id="conversion_table">
            <thead>
                <tr>
                    <th class="header">DMC</th>
                    <th class="header"></th>
                    <th class="header">DMC Color</th>
                    <th class="header">Dimensions</th>
                </tr>
            </thead>
            <tbody>
                ${tableBodyInnerHTML}
            </tbody>
        </table>
        <div id="buttons_container">
            <button class="button">                
                <img class="image" src="edit.svg" alt="edit" />
            </button>
            <button class="button">
                <img class="image" src="download.svg" alt="download" />
            </button>
        </div>
        `;

        document.getElementById("convert_container").style.display = "none";
        document.body.appendChild(collectionContainer);

        this.addEventListenerToCollection(collectionContainer);

        return;
    }

    addEventListenerToCollection(collectionContainer) {
        collectionContainer.addEventListener("click", (event) => {
            const closeButton = event.target.closest(".close_button");
            if (closeButton) {
                const collection =
                    this.findCollectionByName(collectionContainer);
                collection.remove(collectionContainer);
            }
        });
    }

    findCollectionByName(collectionContainer) {
        const collectionName =
            collectionContainer.querySelector("h1").innerText;
        return savedCollections.arrayOfCollections.find(
            (collection) => collection.name === collectionName
        );
    }

    remove(collectionContainer) {
        const collection = this.findCollectionByName(collectionContainer);
        collection.isRendered = false;
        collectionContainer.remove();
        document.getElementById("convert_container").style.display = "flex";
    }
}
