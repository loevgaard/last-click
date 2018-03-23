"use strict";

var settings = {
    sources: [
        {referrer: 'google', 'value': 'self'},
        {referrer: 'yahoo', 'value': 'self'},
        {referrer: 'bing', 'value': 'self'},
        {queryParameter: 'gclid', 'value': 'adwords'},
        {queryParameter: 'utm_source', 'value': 'self'}
    ],
    cookie: {
        name: 'last_click',
        expires: 30
    }
};

function lastClick() {
    var obj = {};

    /**
     * @param {String} value
     * @return {{}}
     */
    obj.setLastSource = function (value) {
        var date = new Date();
        date.setTime(date.getTime() + (settings.cookie.expires * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = settings.cookie.name + "=" + value + expires + "; path=/";

        return obj;
    };

    /**
     * @return {String|*}
     */
    obj.getLastClick = function () {
        var nameEQ = settings.cookie.name + "=";
        var cookies = document.cookie.split(';');

        for(var i=0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    };

    /**
     * @return {{}}
     */
    obj.checkLastClick = function () {
        var source;

        settings.sources.forEach(function (source) {
            var val = '';

            if(source.hasOwnProperty('queryParameter')) {
                val = getQueryParameterByName(source.queryParameter);
            } else if(source.hasOwnProperty('referrer') && document.referrer && document.referrer.indexOf(source.referrer) >= 0) {
                val = document.referrer;
            }

            if(val) {
                if(source.value !== 'self') {
                    if(typeof(source.value) === 'function') {
                        val = source.value.apply(val);
                    } else {
                        val = source.value;
                    }
                }

                obj.setLastSource(val);
            }

        });

        return obj;
    };

    /**
     * @param {String} name
     * @return {{}}
     */
    obj.setCookieName = function (name) {
        settings.cookie.name = name;
        return obj;
    };

    /**
     * @param {Number} expires
     * @return {{}}
     */
    obj.setExpires = function (expires) {
        settings.cookie.expires = parseInt(expires);
        return obj;
    };

    /**
     * @param {String} queryParameter
     * @param {String|function|undefined} value
     * @return {{}}
     */
    obj.addSource = function (queryParameter, value) {
        for(var i = 0; i < settings.sources.length; i++) {
            if(settings.sources[i].queryParameter === queryParameter) {
                return obj;
            }
        }
        settings.sources.push({
            queryParameter: queryParameter,
            value: value ? value : 'self'
        });

        return obj;
    };
}

function getQueryParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

module.exports = lastClick;