export class Collection {
    constructor(name, listOfColors) {
        this.name = name;
        this.listOfColors = listOfColors;
    }

    render() {
        const tableBodyInnerHTML = this.listOfColors.reduce((html, color) => {
            return html + color.render();
        }, "");

        container.innerHTML = `
        <header>
            <h1>Floss Conversion Calculator</h1>
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
        <div>
        <button class="save_button">Edit</button>
        <button class="save_button">Save file</button>
        </div>`;

        return;
    }
}
