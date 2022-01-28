function arrayObjectKeySorter(array, key) {
    return array.sort((a, b) => {
        let x = a[key].toLocaleUpperCase();
        let y = b[key].toLocaleUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0 ));
    });
}

export default arrayObjectKeySorter;