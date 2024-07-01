# 使用方法
使用frida spawn启动app注入该脚本，待游戏完成加载后主动调用print函数即可打印il2cpp的api的相应偏移。
 ![print](./images/print.JPG)

 之后可以配合frida-il2cpp-bridge这个项目使用，修改frida-il2cpp-bridge\node_modules\frida-il2cpp-bridge\dist下的index.js文件处的函数r进行如下图所示的修改
 ![修改frida-il2cpp-bridge](./images/frida-il2cpp-bridge修改.JPG)

 再将本脚本打印出来的内容粘贴至该文件末端处
![粘贴](./images/粘贴.JPG)
即可增强frida-il2cpp-bridge对抗il2cpp api混淆或隐藏的能力。
![使用修改后的frida-il2cpp-bridge dump](./images/示例.JPG)


 # 注意事项
 该项目为frida脚本且注入时机较早，如果游戏有相应检测，需要过掉检测才能正常运行，且该项目只能无视简单的il2cpp api的混淆或隐藏。

 # 7.1更新
 又认真看了下，发现只要hook dlsym这个函数过滤一下即可，现在直接注入该脚本即可。

