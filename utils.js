export function sortByKey(obj, key) {
    obj.sort((a, b) => a[key] - b[key]);
}
