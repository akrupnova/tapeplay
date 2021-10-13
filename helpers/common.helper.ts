function getRandomItem(array: any) {
    return array[Math.floor(Math.random() * array.length)];
}

export { getRandomItem };