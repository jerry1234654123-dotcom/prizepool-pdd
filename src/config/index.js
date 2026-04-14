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
        'pdd111.com': {
            homeType: '3'
        },
        'localhost': {
            homeType: '3'
        }
    }
    const idObj = {
        'localhost': 8888,
        'pdd': 8888, // pdd.df17g.com
        '8218pdd': 2100,
        'vt38pdd': 2100,
        'vtpdd': 2100,
        'vt38pdd1': 2100,
        '8278pdd': 2101,
        'hw7779': 2101,
        'pdd654': 2101,
        '8658pdd': 2102,
        'ix669': 2102,
        '8728pdd': 2103,
        'gnpdd': 2103,
        'rp777pdd': 2014,
        'luxurypdd': 2014,
        'pdd147': 2014,
        '3178pdd': 2013,
        'pdd111': 2003,
        'pdd333': 2013,
        'pdd444': 2013,
        'lucky8638': 2011,
        '8638lucky': 2011,
        'clpdd': 2011,
        'clpdd1': 2011,
        'clpdd2': 2011,
        'y89slotspdd': 2010,
        'y89pdd': 2010,
        'pdd52': 2010,
        '4892lotspdd': 2004,
        'luckydfpdd': 2001,
        'dfpdd': 2001,
        'rjpdd3': 2001,
        'rjpdd2': 2001,
        'rjpdd1': 2001,
        'rjpdd': 2001,
        'df09h': 2000,
        'jt777aa': 1089,
        'jtbluepdd': 1089,
        'pdd456': 1089,
        '3031tt': 1095,
        '8768pdd': 1106,
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
