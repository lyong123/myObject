# myObject
the simple object
前端监控项目

-- 把需求翻译成文档：

信息收集：1.用户登录失败 2.服务器页面加载失败 3.混合App报错webView内核版本问题/壳出现代理问题 4.服务器错误 5.接口结构错误 6.设备信息

平台展示：1.提供饼状系统分布图 饼状设备分布图 2.提供展示内部系统详细点击量的数据图 3.提供用户在线时长的折现图 4.用户登录失败/服务器加载失败/混合app内部报错/服务器返回接口数据-检测 5.提供报警功能-微信/邮件/短信

--上报数据SDK：

自动上报数据

    错误类型数据-全局错误事件_全局异常的监听获取 js语法错误、运行错误、资源加载错误等/全局错误处理

    性能相关数据-perfromance性能相关数据_timing.navigationStart、timing.fetchStart 这类数据较差往往不会

        影响用户操作体验 通常情况下不会阻塞用户操作，极少数情况会造成跟错误类型一样的严重的影响

    环境相关数据-userAgent环境用户数据 但是对我们的技术决策或者排查线上问题可能会依赖这类数据

手动上报数据

    用户行为数据-用户平均在线时长/用户点击量/用户uid sid mid标识等

    流程错误数据-特定接口返回数据错误/二维码登录展示错误等 全局错误不存在或全局异常错误无法监听的错误数据

        但是这类数据对于业务方便又非常有价值 需要自定义格式手动上报

 

-- javascript错误类型

SyntaxError 语法错误；TypeError 类型错误；RangeError 范围错误；ReferenceError 引用错误；EvalError eval错误；

URIError URL错误；Failed to load resource 资源加载错误 标签+crossorigin Access-Control-Allow-Origin 才能保证跨域资源时不报错

     

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 