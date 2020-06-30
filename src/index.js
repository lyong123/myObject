// 监听资源加载错误
// 用addEventListener是为了防止error被重写掉/按照监听顺序全部执行callback
window.addEventListener('error', function (event) {
    var errortarget = error.target;
    var errorname = errorTarget.nodename.toUpperCase();
    var flag = errorTarget !== window && errorTarget.nodename && LOAD_ERROR_TYPE[errorname];

    if (flag) {
        handleError(formatLoadError(errortarget))
    } else {
        let { message, filename, lineno, colno, error } = event;
        handleError(formatRuntimeError(message, filename, lineno, colno, error))
    }
}, true)

// 监听浏览器中捕获到未处理的Promise错误
// 也可以解决部分框架把错误吞掉的问题
window.addEventListener('unhandledrejection', function (event) {
    handleError(event);
}, true)

// 针对vue报错 重写console.error 
console.error = (function (origin) {
    return function (info) {
        var errorLog = {
            type: ERROR_CONSOLE,
            desc: info
        }
        handleError(errorLog);
        origin.call(console, info);
    }
})(console.error)

/**
 * handleError 统一处理函数
 * @param {String} messages 错误信息
 * @param {String} source 发生错误的脚本
 * @param {Number} lineno 发生错误的行
 * @param {Number} colno 发生错误的列
 * @param {Object} error error对象
 * @return {Object} 
 */
function formatRuntimeError(message, source, lineno, colno, error) {
    return {
        type: ERROR_RUNTIME,
        desc: `${message}at${source}:${lineno}:${colno}`,
        stack: error && error.stack ? error.stack : 'no stack'
    }
}

/**
 * 生成laod错误报告
 * @param {Object} errorTarget 
 * @return {Object}
 */
function formatLoadError(errorTarget) {
    return {
        type: LOAD_ERROR_TYPE[errorTarget.nodename.toUpperCase()],
        desc: `${errorTarget.baseURI}@${errorTarget.src || errorTarget.herf}`,
        stack: 'no stack'
    }
}