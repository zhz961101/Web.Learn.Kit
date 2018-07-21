'use strict';

let testAns1 = resolveDom("#app");

console.log(testAns1);

let changehtml = `<ul name="yo">
    <li class="123 atu" id="cit" data-id="user">001</li>
    <li>002</li>
    <li>555</li>
    <li>666</li>
</ul>
<ul id="u2">
    <li>001</li>
    <li>003</li>
    <li>004</li>
    <li>005</li>
</ul>`
let testAns2 = resolveHtml(changehtml);
console.log(testAns2);

// ========================================================

let withDivhtml = `<div id="app">
    <ul name="yo">
        <li class="123 atu" id="cit" data-id="user">001</li>
        <li>002</li>
        <li>004</li>
        <li>999</li>
        <li>005</li>
    </ul>
    <ul id="u2">
        <li>001</li>
        <li>002</li>
        <li>004</li>
        <li>005</li>
    </ul>
</div>`

let testAns3 = createObjByDom("#app");
console.log(testAns3);
let testAns4 = createObjByHtml(withDivhtml);
console.log(testAns4);

let testAns5 = compareDomTree(testAns4,testAns3);
console.log(testAns5);

// =========================================================
// let domres = lcsDom("#compare1","#compare2")
// console.log(domres);
