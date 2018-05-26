'use strict';

// log("0G 1A 2T 3C 4T 5T 6C 7C 8C 9T");
// log("0G 1C 2C 3C 4T");
//
// log(diff("GCCCT", "GATCTTCCCT"))
//
// log(difText("GCCCT", "GATCTTCCCT"))
//
// log(LCCS("GCCCTAGCG", "GACCTAGCT"))
//
let t_a = `<div id="test-log"></div><script src="../logTool/dist/bundle.min.js" charset="utf-8"></script><script src="./assets/main.js" charset="utf-8"></script><script src="./assets/index.js" charset="utf-8"></script>`

let t_b = `<div id="test-log"></div><script src="" charset="utf-8"></script><script src="./assets/main.js" charset="utf-8"></script><script src="./assets/index.js" charset="utf-8"></script>`

// log(difText(t_a, t_b))

// log(LCCS(t_a, t_b))

log(LCS("GCCCT", "GATCTTCCCT"))

log(lcsDiff("GCCCT", "GATCTTCCCT"))

log(lcsDiff("GCTCCT", "GATCATTTCCCT"))

let mDna1 = "gtgataacctaccgggaggtgttggagaccggggcggcgcgagcagggagccgggaggaggcggccgcgg"

let mDna2 = "gtgataacctaccgggaggtgttggtagcagaccggggcggcgcgagcagggagccgggaggaggtacggccgcgg"

log(lcsDiff(mDna1, mDna2))
