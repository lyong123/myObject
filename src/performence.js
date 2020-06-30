// caniuse上查看浏览器兼容情况
performance.timing
navigationStart // 浏览器处理当前页面的启动时间
fetchStart // 浏览器发起HTTP请求读取文档的毫秒时间戳
domainLookupStart // 域名查询开始时的时间戳
domainLookupEnd // 域名查询结束时的时间戳
connectStart // HTTP请求开始向服务器发送的时间戳
secureConnectionStart // SSL
connectEnd // 浏览器与服务器连接建立（握手和认证过程结束）的毫米时间戳
requestStart // 浏览器向服务器发出HTTP请求时的时间戳，或者开始读取本地缓存的时间
responseStart // 浏览器从服务器（或本地缓存）收到第一个字节时的时间戳
responseEnd // 浏览器从从服务器（或本地缓存）收到最后一个字节时的时间戳
domLoading // 浏览器开始解析网页DOM结构的时间
domInteractive // 网页DOM树创建完成，开始加载内嵌资源时间戳
domContentLoadedEventStart // 网页domContentLoaded事件发生时的时间戳
domContentLoadedEventEnd // 网页所有需要执行的脚本执行完成时的时间戳 - domReady的时间
domComplete // 网页dom结构生成时的时间戳
loadEventStart // 当前网页load事件的回调函数开始执行的时间戳 
loadEventEnd // 当前网页load事件的回调函数执行结束的时间戳

/**
 * DNS查询耗时 
 * 请求响应耗时     responseStart-requestStart 
 * DOM解析耗时      domInteractive-responseEnd
 * 内容传输耗时     responseEnd-responseStart
 * 资源加载耗时     loadEventStart-domContentLoadedEventedEnd
 * DOM_READY耗时     domContentLoadedEventEnd-domInteractive
 * 首次渲染耗时      responseEnd-fetchStart  首次渲染时间/白屏时间 
 * 首次可交互耗时    domInteractive-fetchStart
 * 首包时间耗时      responseStart-domainLookupStart   
 * 页面完全加载耗时   loadEventStart-fetchStart
 * SSL连接耗时       connectEnd-secureConnectionStart
 * TCP连接耗时       connectEnd-connectStart   
 */

/**
 * DNS查询耗时可以对开发者的CDN服务器工作是否正常做出反馈
 * 请求响应耗时可以对返回模板中的同步数据的情况做出反馈
 * 由DOM解析耗时可以观察出我们的dom结构是否合理，以及是否有javscript阻塞
 *  -- 这里的js阻塞应该是说在html里的内联script 而不是script标签还没加载的
 * 内容传输耗时可以检查出我们的网络通路是否正常，大多数情况下性能问题是网络或者运营商本身的问题
 * 资源加载耗时一般情况下是文档的下载时间，主要观察一下文档流体积是否过大
 * DOM_READY耗时通常是DOM树解析完成后，网页资源加载完成的时间（如javascript脚本加载执行完成）
 *  -- 这个阶段一般会触发domContentLoaded事件
 * 首次渲染耗时表述的是浏览器去加载文档到用户能看到第一帧非空图形的时间，也叫白屏时间
 * 首次可交互耗时是dom树解析完成的时间
 *  -- 本阶段document.readyStart状态值为interactive，并且抛出readyStateChange事件
 *  -- document.readyState(loading / interactive / complete) 改变的时候会抛出readyStateChange事件
 *  -- 这个可交互时间也不一定完全准确，因为dom在绑定事件的时候也在消耗时间，但是大部分时候我们会把这部分时间忽略。
 *  -- 另外，现在大多数的框架（如vue、react、angular）提供自己的虚拟dom，所以相关时间的绑定时间会进一步延后，大概1毫秒，随着虚拟dom节点增多，这个时间会进一步增强
 * 首包耗时是浏览器对文档发起查找DNS（域名系统）表的请求，到请求返回给浏览器第一个字节数的时间
 *  -- 这个时间通常反馈的是DNS解析查找的时间
 * 页面完全加载耗时指的是下载整个页面的总时间，这个数据受到网络环境、文档大小的影响
 * SSL连接耗时反馈的是数据安全性、完整性建立耗时
 * TCP连接耗时指的是建立连接过程的耗时，TCP协议主要工作于传输层，是一种比UDP更为安全的传输协议
 */

window.onload = () => {
    // 检查是否监控性能指标
    const isPerformanceFlagOn = _.get(
        commonConfig,
        ['record', 'performance'],
        _get(DEFAULT_CONFIG, ['record', 'performance'])
    )
    const isOldPerformanceFlageOn = _.get(
        commonConfig,
        ['record', 'performance'],
        false
    )
    const needRecordPerformance = isPerformanceFlagOn || isOldPerformanceFlageOn;
    if (needRecordPerformance === false) {
        debugLogger('config.record.perfrmance 值为false，跳过性能指标打点')
        return
    }
    const performance = window.performance
    if (!performance) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持performance接口')
        return
    }
    const times = performance.timing.toJSON()
    debugLogger('发送页面性能指标数据，上报内容=>', {
        ...times,
        url: `${window.location.host}${window.location.pathname}`
    })
    log('perf', 20001, {
        ...times,
        url: `${window.location.host}${window.location.pathname}`
    })
}
