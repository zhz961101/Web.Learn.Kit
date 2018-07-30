const randArr = arr => arr.sort(() => Math.random() * 2 - 1)

for (var i = 0; i < 10; i++) {
    console.log(randArr([1, 2, 3, 4, 5, 6, 7, 8, 9]))
}
