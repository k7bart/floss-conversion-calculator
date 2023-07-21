import { conversionContainer } from "./conversion_container.js";

class Color {
    constructor(colorName, dimensionsNumber, DMCNumber, colorDispley) {
        this.colorName = colorName;
        this.dimensionsNumber = dimensionsNumber;
        this.DMCNumber = DMCNumber;
        this.colorDispley = colorDispley;
    }

    render(numberForSearch) {
        // switch?
        let convertFromCode;
        let convertToCode;

        if (conversionContainer.convertFrom === "DMC") {
            convertFromCode = this.DMCNumber;
            if (this.DMCNumber === 0) convertFromCode = this.colorName;
        }

        if (conversionContainer.convertFrom === "Dimensions") {
            convertFromCode = numberForSearch;
        }

        conversionContainer.convertTo === "DMC"
            ? (convertToCode = this.DMCNumber)
            : (convertToCode = this.dimensionsNumber);

        return ` 
        <tr>
            <td><input type="search" maxlength="5" value="${convertFromCode}" name="ConvertFromCode"></td>
            <td class="color__display"><span style="background: ${this.colorDispley}"></span></td>
            <td>${this.colorName}</td>
            <td>${convertToCode}</td>
        </tr>
        `;
    }
}

export const arrayOfColors = [
    new Color("white", [11001, 6149], 0, "#FAFAFA"),
    new Color("ecru", [6098, 6115], 0, "#F5F0EC"),
    new Color("ul vy dk dustry rose", [13065], 150, "#A8024A"),
    new Color("md dk blue violet", [6250], 155, "#948DB3"),
    new Color("vy lt cornflower blue", [17005], 157, "#B7C4E4"),
    new Color("md vy dk cornflower blue", [17150], 158, "#403D6D"),
    new Color("vy lt pewter", [6081], 168, "#C7CDCE"),
    new Color("vy dk lavender", [14301, 14302], 208, "#805988"),
    new Color("md lavender", [14303, 6138, 6139, 6210], 210, "#C09BC0"),
    new Color("lt lavender", [11263], 211, "#e0c5e0"),
    new Color("vy dk shell pink", [60221], 221, "#9A3D43"),
    new Color("lt shell pink", [60223], 223, "#D58582"),
    new Color("vy lt shell pink", [13240], 224, "#E9B1A8"),
    new Color("ul vy lt shell pink", [13239], 225, "#ffd5d5"),
    new Color("vy dk mahogany", [15470, 6108], 300, "#6d2d00"),
    new Color("md mahogany", [12238, 6109], 301, "#af5b2a"),
    new Color("md red", [13019], 304, "#b31e32"),
    new Color("lemon", [12290, 6131], 307, "#FEE73D"),
    new Color("dk rose", [13284], 309, "#C9344D"),
    new Color("black", [18403, 6150], 310, "#000000"),
    new Color("md navy blue", [17980, 17981, 6002], 311, "#064055"),
    new Color("vy dk baby blue", [17979], 312, "#2E597C"),
    new Color("md dk antique mauve", [13082, 63726], 315, "#903E4E"),
    new Color("md antique mauve", [13081], 316, "#B56F7C"),
    new Color("pewter gray", [18512, 18514, 6097], 317, "#575D61"),
    new Color("lt steel gray", [18511], 318, "#9c9ca4"),
    new Color("vy dkpistachio green", [16246], 319, "#236831"),
    new Color("md pistachio green", [16017, 6050], 320, "#75bb71"),
    new Color("red", [11321, 13047, 13500, 6020, 6028, 6035], 321, "#c32a3c"),
    new Color("dk dark baby blue", [17978, 6003], 322, "#467194"),
    new Color("vy dk rose", [13401, 6022], 326, "#AF3A4A"),
    new Color("dk violet", [14101], 327, "#551346"),
    new Color("vy dk blue violet", [16265], 333, "#604E87"),
    new Color("md baby blue", [17977, 17978, 6005], 334, "#5F8DA9"),
    new Color("rose", [13283, 6024], 335, "#D64A5F"),
    new Color("navy blue", [17981], 336, "#0F3251"),
    new Color("md blue violet", [17110, 6250, 6340], 340, "#A4A4C4"),
    new Color("lt blue violet", [17005, 17110, 6341], 341, "#B8BFDC"),
    new Color("vy dk salmon", [13013, 6347], 347, "#BF2642"),
    new Color("dk coral", [12335], 349, "#C72E33"),
    new Color("md coral", [13111, 6029], 350, "#d64542"),
    new Color("coral", [13011, 6030], 351, "#de605e"),
    new Color("lt coral", [13008, 6352], 352, "#EA8079"),
    new Color("peach", [13006, 13067, 13306, 6031], 353, "#F2A898"),
    new Color("dk terra cotta", [12339], 355, "#A5463C"),
    new Color("md terra cotta", [12338], 356, "#D37863"),
    new Color("dk pistachio green", [16018, 6049, 6264, 6367], 367, "#4b924b"),
    new Color("lt pistachio green", [16008, 6051, 6368], 368, "#aad99f"),
    new Color("vy lt pistachio green", [16015, 16016, 6052], 369, "#d2ebc5"),
    new Color("dk mahogany", [15349], 400, "#8C410F"),
    new Color("vy lt mahogany", [6402], 402, "#F7A170"),
    new Color("dk desert sand", [15376, 15578], 407, "#BB8871"),
    new Color("dk pewter gray", [18512, 18514, 6079], 413, "#3E4144"),
    new Color("dk steel gray", [18513], 414, "#7C7C84"),
    new Color("pearl gray", [18398, 18511, 6081], 415, "#BFBFC3"),
    new Color("dk hazelnut brown", [15374], 420, "#9A7B33"),
    new Color("md brown", [15470, 15471], 433, "#79511A"),
    new Color("lt brown", [15000, 6095], 434, "#8C602A"),
    new Color("vy lt brown", [15347, 15371], 435, "#A0743E"),
    new Color("tan", [15347, 15943, 6096], 436, "#B58C53"),
    new Color("lt tan", [15942], 437, "#C99F6A"),
    new Color("dk lemon", [12298, 6130], 444, "#FAC800"),
    new Color("lt lemon", [12288, 6132], 445, "#FFF983"),
    new Color("md shell gray", [18252], 452, "#AE9AA4"),
    new Color("lt shell gray", [18231], 453, "#D1C3CF"),
    new Color("avocado green", [16261, 16010, 16256], 469, "#819442"),
    new Color("lt avocado green", [16010, 16264], 470, "#9EAD57"),
    new Color("vy lt avocado green", [16010, 16264], 471, "#B9C572"),
    new Color("ul lt avocado green", [16253, 6069], 472, "#D5E191"),
    new Color("dk red", [13072], 498, "#A4132B"),
    new Color("dk wedgewood", [17162], 517, "#2E7288"),
    new Color("lt wedgewood", [17161, 6084], 518, "#4D91A4"),
    new Color("vy dk blue green", [16880], 500, "#055538"),
    new Color("dk blue green", [16878, 6195], 501, "#3D7654"),
    new Color("blue green", [16876, 6197], 502, "#598D6E"),
    new Color("md blue green", [16879], 503, "#8AB5A0"),
    new Color("vy lt blue green", [16875, 6504], 504, "#B2D4BD"),
    new Color("sky blue", [17161, 6009], 519, "#6FB1C1"),
    new Color("fern green", [16316], 522, "#819569"),
    new Color("vy lt ash gray", [18400], 535, "#555545"),
    new Color("ul vy lt beige brown", [15533], 543, "#EADED3"),
    new Color("vy dk violet", [14107, 14300, 6133], 550, "#4A133F"),
    new Color("md violet", [14092, 6137], 552, "#793666"),
    new Color("violet", [14097, 6135], 553, "#A16089"),
    new Color("lt violet", [14104, 14303, 6136], 554, "#D8AEC7"),
    new Color("vy dk jade", [16211], 561, "#2B6843"),
    new Color("md jade", [16213], 562, "#519468"),
    new Color("lt jade", [16210], 563, "#8cd2a8"),
    new Color("vy lt jade", [16209], 564, "#B5E1BE"),
    new Color("turquoise", [6597], 597, "#57a2b1"),
    new Color("lt turquoise", [17167], 598, "#82C1CD"),
    new Color("vy dk cranberry", [13056], 600, "#D30B61"),
    new Color("dk cranberry", [13056, 13128], 601, "#DE2271"),
    new Color("md cranberry", [13056, 13063, 13153], 602, "#E64281"),
    new Color("cranberry", [13001], 603, "#EE6195"),
    new Color("vy lt cranberry", [13129, 13151], 605, "#FFAAC5"),
    new Color("bright orange-red", [12334, 6116], 606, "#FD340C"),
    new Color("bright orange", [12332], 608, "#FD552F"),
    new Color("dk drab brown", [15889], 610, "#6F6641"),
    new Color("ul vy dk desert sand", [15936], 632, "#936148"),

    new Color("vy dk beige gray", [6103], 640, "#918463"),
    new Color("dk beige gray", [15832], 642, "#B8AD92"),
    new Color("vy dk beaver gray", [18500], 645, "#515542"),
    new Color("dk beaver gray", [18900], 646, "#707864"),
    new Color("md beaver gray", [18900], 647, "#959884"),
    new Color("lt beaver gray", [18390], 648, "#bcc0a8"),
    new Color("bright red", [13046, 13500, 6666], 666, "#D90028"),
    new Color("lt old gold", [12305, 12874], 676, "#eeca70"),
    new Color("dk old gold", [12876], 680, "#C8A027"),
    new Color("green", [16228, 6053], 699, "#005922"),
    new Color("bright green", [16227, 6058], 700, "#07711A"),
    new Color("lt green", [16226, 16227], 701, "#1C8817"),
    new Color("kelly green", [16239, 6059], 702, "#46A42E"),
    new Color("chartreuse", [16238], 703, "#7ab146"),
    new Color("bright chartreuse", [6060, 6078], 704, "#AEDA62"),
    new Color("cream", [12275, 6155], 712, "#FFF8E5"),
    new Color("plum", [14089], 718, "#B73275"),
    new Color("dk orange spice", [12322, 6720], 720, "#EF6A41"),
    new Color("md orange spice", [12324], 721, "#F37C51"),
    new Color("lt orange spice", [12323, 6722], 722, "#F79168"),
    new Color("md lt topaz", [12298, 6127], 725, "#F7CC41"),
    new Color("lt topaz", [12295, 6128], 726, "#F7DD68"),
    new Color("vy lt topaz", [12295], 727, "#F6E990"),
    new Color("md old gold", [12875], 729, "#E3B344"),
    new Color("vy dk olive green", [16845], 730, "#706C21"),
    new Color("dk olive green", [16884], 731, "#989239"),
    new Color("vy lt tan", [15372, 15375, 6738], 738, "#DDB689"),
    new Color("ul vy lt tan", [15369, 15372, 6098, 6739], 739, "#F2D3A8"),
    new Color("tangerine", [12099, 12289, 12327], 740, "#FA8500"),
    new Color("md tangerine", [12314, 6119], 741, "#FF9D25"),
    new Color("lt tangerine", [12303, 6126], 742, "#FFBC50"),
    new Color("md yellow", [12298, 12302], 743, "#FFDD64"),
    new Color("pale yellow", [6121, 12293], 744, "#FFE48B"),
];
