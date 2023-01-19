import wabt from 'wabt';

wabt().then(wabt => {

    const wat = `
    (module
        (func $i (import "imports" "imported_func") (param i32))
        (func (export "exported_func")
            i32.const 42
            call $i
        )
        )
    `; // a buffer holding the contents of a wasm file

    const importObject = {
        imports: { imported_func: console.log },
    };

    const myModule = wabt.parseWat("", wat);

    const wasmModule = new WebAssembly.Module(myModule.toBinary({}).buffer);

    const wasmInstance = WebAssembly.instantiate(myModule.toBinary({}).buffer, importObject);

    wasmInstance.then(instance => {
        instance.instance.exports.exported_func();
    })
    

})

