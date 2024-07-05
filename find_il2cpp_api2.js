function find_il2cpp_api(){
    let unity_base = Process.findModuleByName("libunity.so").base;
    let il2cpp_base = Process.findModuleByName("libil2cpp.so").base;


    //以下7个偏移需要手动定位
    let fil2cpp_api = {"il2cpp_class_get_methods":ptr(0x42B52C8)};
    let il2cpp_method_get_name = unity_base.add(0x1D4FA28);
    let il2cpp_class_get_name = unity_base.add(0x1D4F720);
    let il2cpp_class_get_namespace = unity_base.add(0x1D4F730);
    let il2cpp_class_get_type = unity_base.add(0x1D4F790);
    let il2cpp_method_get_param = unity_base.add(0x1D4FA60);
    let il2cpp_method_get_param_count = unity_base.add(0x1D4FA58);

    
    fil2cpp_api["il2cpp_method_get_name"] = il2cpp_method_get_name.readPointer().sub(il2cpp_base);
    fil2cpp_api["il2cpp_class_get_name"] = il2cpp_class_get_name.readPointer().sub(il2cpp_base);
    fil2cpp_api["il2cpp_class_get_type"] = il2cpp_class_get_type.readPointer().sub(il2cpp_base);
    fil2cpp_api["il2cpp_class_get_namespace"] = il2cpp_class_get_namespace.readPointer().sub(il2cpp_base);
    fil2cpp_api["il2cpp_method_get_param"] = il2cpp_method_get_param.readPointer().sub(il2cpp_base);
    fil2cpp_api["il2cpp_method_get_param_count"] = il2cpp_method_get_param_count.readPointer().sub(il2cpp_base);

    console.log("var il2cpp_api = {");
    for(let key in fil2cpp_api){
        console.log('"'+key+'"'+":"+fil2cpp_api[key]+",");
    }
    console.log("};");
}



