first commit

require('http') 内置模块
require('./server')  “./”表示当前路径，后面跟的是相对路径
require("../lib/server") ../表示上一级目录，后面跟的也是相对路径

npm命令运行时会读取当前目录的 package.json 文件和解释这个文件，这个文件基于 Packages/1.1 规范。
在这个文件里你可以定义你的应用名称( name )、应用描述( description )、关键字( keywords )、版本号( version )
、应用的配置项( config )、主页( homepage )、作者( author )、资源仓库地址( repository )、bug的提交地址( bugs )，
授权方式( licenses )、目录( directories )、应用入口文件( main )、命令行文件( bin )、应用依赖模块( dependencies )、
开发环境依赖模块( devDependencies )、运行引擎( engines )和脚本( scripts )等。

http://javascript.ruanyifeng.com/nodejs/packagejson.html

gulp
http://segmentfault.com/a/1190000000372120

browserify

dust.js
http://www.dustjs.com/guides/getting-started/