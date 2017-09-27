
//function
var jsonp = function (url, data, method, success, failed) {
    var url = url || '',
        data = data || {},
        method = method || 'callback',
        success = success || function () { },
        failed = failed || function () { };

    var prams = function (obj) {

        var keys = Object.keys(obj);
        var len = keys.length;
        var str = '';
        return keys.reduce(function (a, b, c) {
            str = a + b + '=' + obj[b];
            if (c == len - 1) {
                return str;
            }
            return str + '&';
        }, '?')
    }

    var random = 'jsonp_' + ((Math.random() * 100000) | 0)
    window[random] = function (json) {
        try {
            success(json);
            window[random] = null;
            delete window[random]
        } catch (e) {
            failed();
        }

    }
    url = url + prams[data];
    if (url.indexOf('?') === -1) { url = url + '?'; }
    else { url = url + '&'; }


    var jsonScript = document.createElement('script');
    jsonScript.setAttribute('src', url + method + '=' +);
    document.getElementsByTagName('head')[0].appendChild(jsonScript);
    jsonScript.onerror = failed;
}

//Promise
var JSONP = function (url, data, method, success, failed) {
    return new Promise((resolve, reject) => {
        var url = url || '',
            data = data || {},
            method = method || 'callback',
            success = success || function () { },
            failed = failed || function () { };

        var prams = function (obj) {
            var keys = Object.keys(obj);
            var len = keys.length;
            var str = '';
            return keys.reduce(function (a, b, c) {
                str = a + b + '=' + obj[b];
                if (c == len - 1) {
                    return str;
                }
                return str + '&';
            }, '?')
        }

        var random = 'jsonp_' + ((Math.random() * 100000) | 0)
        window[random] = function (json) {
            try {
                success(json);

                window[random] = null;
                delete window[random];
                resolve(json);
            } catch (e) {
                failed();
                reject(e);
            }

        }
        url = url + prams[data];
        if (url.indexOf('?') === -1) {
            url = url + '?';
        } else {
            url = url + '&';
        }


        var jsonScript = document.createElement('script');
        jsonScript.setAttribute('src', url + method + '=' + random);
        document.getElementsByTagName('head')[0].appendChild(jsonScript);
        jsonScript.onerror = (e) => {
            failed();
            reject(e);
        };
    })
}