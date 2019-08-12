const vm = require('./vm.base.js');
const TEST_END = ()=>console.log("\n=============\n");

function preCompile_TEST1(){
    vm.init(false);
    let code= `
    SET AX 1
    PUSH 255
    main:
    POP BX
    DISP BX
    PUSH BX
    JE CX 0 main
    EXIT
    `
    console.log(vm._INS_)
    vm.set_code(code)
    console.log(vm.code)
}

preCompile_TEST1();
TEST_END()

function PRINT_TEST1(){
    vm.init(true);
    let code= `
    PRINT 1 AX 2
    EXIT
    `
    vm.set_code(code)
    vm.run()
}
PRINT_TEST1();
TEST_END()
