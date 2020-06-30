/**
 * pid projectId 描述接入产品编号，因为平台本身可能接入很多需求方，pid方便我们以某个产品维度为基准进行查询
 * uid userId 基本所有互联网产品用户都存在这个标识，在平时业务开发中，用户某些操作结果是要以用户的uid为查询参数对数据进行存储
 *  -- 在监控平台，这个数据主要用于错误本身的去重，以及方便跟踪错误相关的用户数据
 * sid sessionId 主要是记录用户当次登录的所有操作，其实就是服务器在浏览器cookie中种下的唯一标识，之所以记录上它，是因为大部分sessionId日志中可以查看到当次用户登录的所有操作
 * version 这部分是帮助业务方记录上线过的版本中各版本的使用量情况，以及问题可能出现在哪个版本
 * ua userAgent 是浏览器默认获取相关IP、浏览器型号、操作系统等通用环境信息
 * 开关类数据 比如，是否采集错误数据、是否采集性能数据、数据是否为测试数据、测试数据是否上传到服务器，但是不会入库（主要是为了检测从收集到上报的链路）
 */

const DEFAULT_CONFIG = {
    pid: '',
    uid: '',
    sid: '',
    Version: '',
    is_test: false,
    record: {
        time_on_page: true, // 是否监控在线时长数据
        performance: true, // 是否监控默认载入性能
        js_error: true, // 是否监控页面报错信息
        // 配置需要监控的页面报错类别，仅在js_error为true的时候生效
        js_error_report_config: {
            ERROR_RUNTIME: true, // js运行时错误
            ERROR_SCRIPT: true, // js资源加载失败
            ERROR_STYLE: true, // css资源加载失败
            ERROR_IMAGE: true, // 图片资源加载失败
            ERROR_AUDIO: true, // 音频资源加载失败
            ERROR_VIDEO: true, // 视频资源加载失败
            ERROR_CONSOLE: true, // Vue运行时错误
            ERROR_TRY_CATCH: true, // 未抓取错误
            checkErrorNeedReport: (desc = '', stack = '') => {
                return true;
            }
        },
    }
}