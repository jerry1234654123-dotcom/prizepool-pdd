let conf = {}
export const useConfig = () => {
    if (conf.platformId) return conf
    const hostname = window.location.hostname
    const hostKey = hostname.split('.')[0]
    const hostConf = {
        'rjpdd': {
            homeType: '2'
        },
        'rjpdd1': {
            homeType: '1'
        }, 
        'rjpdd2': {
            homeType: '2'
        },
        'rjpdd3': {
            homeType: '2'
        },
        'pdd52': {
            homeType: '1'
        },
        'clpdd': {
            homeType: '3'
        },
        'ix669': {
            homeType: '3'
        },
        'luxurypdd': {
            homeType: '3'
        }, 
        'jtbluepdd': {
            homeType: '3'
        },       
        'pdd111': {
            homeType: '3'
        },
        'localhost': {
            homeType: '3'
        }
    }
    /**
     * ======================= 域名清单（以 idObj 为准）=======================
     * hostKey = 域名第一段（window.location.hostname.split('.')[0]）
     * 完整域名一般为 {hostKey}.com，特殊域名已单独标注；以线上实际部署为准
     * 未在 idObj 中配置的域名 platformId 为 undefined，会打印「未配置platformId」
     *
     * 状态标记（2026-10-01 实测：DNS + HTTPS 访问 + 页面指纹比对）
     *   ✅ 可用      域名可访问，且返回本项目页面
     *   ⚠️ 非本项目  域名能解析，但返回的不是本项目（跳转页/停放页/已停止/其他站点/证书错误）
     *   ❌ 已失效    域名无 DNS 解析（已过期或未配置）
     *
     * 接口域名：
     *   默认                 https://api.gujilunpanguanglihoutaiyinni.life
     *   1084/1089/1095/1106  https://api-asia-jakarta.gujilunpanguanglihoutaiyinni.life
     *
     * ---- 1000 系列（雅加达接口）----
     * 1084 B11            third_game_back_id=NULL  activity_delay=6
     *   ✅ bigpdd(bigpdd.co)
     *   ⚠️ splucky(超时), luckysp(停放页), pddsp(其他站点), sp11(超时), sp222(其他站点),
     *      sp451(SSL错误), bestsp(超时), indomaret(超时)
     *   ❌ luckysp555, luckysp777, luckysp888, luckysp999, pddwuv, pddsp6, pddsp8,
     *      sp264, sp454, sp465, sp845, pdd463, pdd478
     * 1089 JT blue        third_game_back_id=NULL
     *   ✅ jtbluepdd(homeType=3)
     *   ⚠️ jt777aa(证书不匹配，返回 APK 跳转页)
     *   ❌ pdd456
     * 1095
     *   ❌ 3031tt
     * 1106                activity_delay=6
     *   ❌ 8768pdd
     *
     * ---- 2000 系列 ----
     * 2000
     *   ❌ df09h
     * 2001 Slot Game      third_game_back_id=1     activity_delay=6
     *   ✅ rjpdd(homeType=2), rjpdd2(homeType=2), rjpdd3(homeType=2)
     *   ⚠️ rjpdd1(homeType=1, 证书不匹配，返回 APK 跳转页), dfpdd(超时),
     *      luckydfpdd(提示 website has been stopped)
     * 2003 ME355          third_game_back_id=NULL
     *   ✅ pdd111(homeType=3)
     * 2004 JPS88          third_game_back_id=NULL
     *   ✅ 4892lotspdd
     * 2010 Ri188          third_game_back_id=NULL
     *   ✅ pdd52(homeType=1)
     *   ❌ y89pdd, y89slotspdd
     * 2011 Let's Thor     third_game_back_id=NULL
     *   ✅ clpdd(homeType=3)
     *   ❌ clpdd1, clpdd2, 8638lucky, lucky8638
     * 2013
     *   ⚠️ pdd333(超时)
     *   ❌ 3178pdd, pdd444
     * 2014 luxury88       third_game_back_id=NULL
     *   ✅ luxurypdd(homeType=3)
     *   ❌ rp777pdd, pdd147
     *
     * ---- 2100 系列 ----
     * 2100 VT38           third_game_back_id=0
     *   ✅ vtpdd, v2(v2.vtpdd.com), localhost(本地开发, homeType=3)
     *   ⚠️ vt38pdd(SSL错误), vt38pdd1(SSL错误)
     *   ❌ 8218pdd
     * 2101
     *   ⚠️ hw7779(其他站点)
     *   ❌ 8278pdd, pdd654
     * 2102 MZ356          third_game_back_id=NULL
     *   ✅ ix669(homeType=3)
     *   ⚠️ 8658pdd(证书不匹配，返回 APK 跳转页)
     * 2103
     *   ❌ 8728pdd, gnpdd
     * 2106                默认语言 zh，手机号登录(isPhoneLogin)
     *   ❌ 6396pdd
     *
     * ---- 其他 ----
     * 8888
     *   ✅ pdd(pdd.df17g.com)
     *
     * 汇总：✅ 可用 15 个 — rjpdd, rjpdd2, rjpdd3, clpdd, pdd111, 4892lotspdd, pdd52, ix669,
     *       vtpdd, v2.vtpdd.com, luxurypdd, bigpdd.co, jtbluepdd, pdd.df17g.com, localhost
     *
     * 备注：
     *   - 维护域名列表见 src/components/login/login.data.js useMaintain()
     *   - 新增域名：在 idObj 加 hostKey -> platform_id，如需特殊首页在 hostConf 加 homeType
     * ========================================================================
     */
    const idObj = {
        'localhost': 2100,
        'pdd': 8888, // pdd.df17g.com
        // 2100 VT38
        '8218pdd': 2100,
        'vt38pdd': 2100,
        'vtpdd': 2100,
        'vt38pdd1': 2100,
        '8278pdd': 2101,
        'hw7779': 2101,
        'pdd654': 2101,
        // 2102 MZ356
        '8658pdd': 2102,
        'ix669': 2102,
        '8728pdd': 2103,
        'gnpdd': 2103,
        // 2014 luxury88
        'rp777pdd': 2014,
        'luxurypdd': 2014,
        'pdd147': 2014,
        '3178pdd': 2013,
        // 2003 ME355
        'pdd111': 2003,
        'pdd333': 2013,
        'pdd444': 2013,
        // 2011 Let's Thor
        'lucky8638': 2011,
        '8638lucky': 2011,
        'clpdd': 2011,
        'clpdd1': 2011,
        'clpdd2': 2011,
        // 2010 Ri188
        'y89slotspdd': 2010,
        'y89pdd': 2010,
        'pdd52': 2010,
        // 2004 JPS88
        '4892lotspdd': 2004,
        // 2001 Slot Game
        'luckydfpdd': 2001,
        'dfpdd': 2001,
        'rjpdd3': 2001,
        'rjpdd2': 2001,
        'rjpdd1': 2001,
        'rjpdd': 2001,
        'df09h': 2000,
        // 1089 JT blue
        'jt777aa': 1089,
        'jtbluepdd': 1089,
        'pdd456': 1089,
        '3031tt': 1095,
        '8768pdd': 1106,
        // 1084 B11
        'splucky': 1084,
        'luckysp999': 1084,
        'luckysp888': 1084,
        'luckysp777': 1084,
        'luckysp555': 1084,
        'luckysp': 1084,
        'pddwuv': 1084,
        'pddsp': 1084,
        'pddsp6': 1084,
        'pddsp8': 1084,
        'sp11': 1084,
        'sp222': 1084,
        'sp264': 1084,
        'sp451': 1084,
        'sp454': 1084,
        'sp465': 1084,
        'sp845': 1084,
        'bestsp': 1084,
        'pdd463': 1084,
        'bigpdd': 1084,
        'pdd478': 1084,
        'indomaret': 1084,
        '6396pdd': 2106,
        'v2': 2100 //v2.vtpdd.com
    }
    const defaultConf = {
        base_url: 'https://api.gujilunpanguanglihoutaiyinni.life',
        show_game_id: true,
        activity_id: 102, // 奖池
        sign: 103,
        login_type: '0',
        homeType: '0'
    }
    const confObj = {
        1084: {
            base_url: 'https://api-asia-jakarta.gujilunpanguanglihoutaiyinni.life',
            activity_delay: 6,
        },
        2001: {
            activity_delay: 6,
        },
        1089: {
            base_url: 'https://api-asia-jakarta.gujilunpanguanglihoutaiyinni.life'
        },
        1095: {
            base_url: 'https://api-asia-jakarta.gujilunpanguanglihoutaiyinni.life'
        },
        1106: {
            base_url: 'https://api-asia-jakarta.gujilunpanguanglihoutaiyinni.life',
            activity_delay: 6
        },
        2006: {
            login_type: '1'
        },
        2007: {
            login_type: '1'
        },
        2008: {
            login_type: '1'
        },
        2009: {
            game_desc_right: true
        },
    }
    const defaultLangObj = {
        '6396pdd': 'zh'
    }
    const default_lang = defaultLangObj[hostKey] || 'id'
    const platformId = idObj[hostKey]
    if (!platformId) console.log('未配置platformId， 请联系管理员')
    console.log(hostKey, platformId)
    const isPhoneLogin = [
        // 'localhost',
        '6396pdd',
    ].includes(hostKey)
    
    conf = {
        ...defaultConf,
        ...(confObj[platformId] || {}),
        ...(hostConf[hostKey] || {}),
        default_lang,
        isPhoneLogin,
        platformId
    }
    return conf
}