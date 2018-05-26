'use strict';

console.log("GCCCT", "GATCTTCCCT");
console.log(diff("GCCCT", "GATCTTCCCT"))

log(LCS("GCCCTAGCG", "GACCTAGCT"))

let t_a = `<div id="test-log"></div><script src="../logTool/dist/bundle.min.js" charset="utf-8"></script><script src="./assets/main.js" charset="utf-8"></script><script src="./assets/index.js" charset="utf-8"></script>`

let t_b = `<div id="test-log"></div><script src="" charset="utf-8"></script><script src="./assets/main.js" charset="utf-8"></script><script src="./assets/index.js" charset="utf-8"></script>`

log(LCS(t_a, t_b))
