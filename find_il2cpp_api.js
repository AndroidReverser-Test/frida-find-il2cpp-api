function hook_call_constructors() {
    let get_soname = null;
    let call_constructors_addr = null;
    let hook_call_constructors_addr = true;
    let soflags = [];
 
    let linker = null;
    if (Process.pointerSize == 4) {
        linker = Process.findModuleByName("linker");
    } else {
        linker = Process.findModuleByName("linker64");
    }
 
    let symbols = linker.enumerateSymbols();
    for (let index = 0; index < symbols.length; index++) {
        let symbol = symbols[index];
        if (symbol.name == "__dl__ZN6soinfo17call_constructorsEv") {
            call_constructors_addr = symbol.address;
        } else if (symbol.name == "__dl__ZNK6soinfo10get_sonameEv") {
            get_soname = new NativeFunction(symbol.address, "pointer", ["pointer"]);
        }
    }
    if (hook_call_constructors_addr && call_constructors_addr && get_soname) {
        Interceptor.attach(call_constructors_addr,{
            onEnter: function(args){
                let soinfo = args[0];
                let soname = get_soname(soinfo).readCString();
                if(soname!=null && !soflags.includes(soname)){
                    if(soname.indexOf("libunity.so")!=-1){
                        get_il2cpp_api();
                    }
                    if(soname.indexOf("libil2cpp.so")!=-1){
                        get_il2cpp_base();
                    }
                    soflags.push(soname);
                }
            }
        });
    }
}
 
function get_il2cpp_base(){
    il2cpp_base = Process.findModuleByName("libil2cpp.so").base;
}


function get_il2cpp_api(){
    let unity_base = Process.findModuleByName("libunity.so").base;

    let LookupSymbol_addr = unity_base.add(0x34E198);//ida搜索il2cpp: function il2cpp_init not found可快速定位

    Interceptor.attach(LookupSymbol_addr,{
        onEnter:function(args){
            this.api_name = args[1].readCString();
        },
        onLeave:function(ret){
            il2cpp_api[this.api_name] = ret.sub(il2cpp_base);
        }
    })
}

function print(){
    console.log("var il2cpp_api = {");
    for(let key in il2cpp_api){
        console.log('"'+key+'"'+":"+il2cpp_api[key]+",");
    }
    console.log("};");
}

function main(){
    hook_call_constructors();
}
 
var il2cpp_base = NULL;
var il2cpp_api = {};
main();