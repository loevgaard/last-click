"use strict";

module.exports = create;

const cookie = require('cookie');
const queryString = require('query-string');
const merge = require('merge-objects');

function create(document, settings) {
    settings = merge(settings || {}, {
        sources: [
            {referrer: 'google'},
            {referrer: 'yahoo'},
            {referrer: 'bing'},
            {queryParameter: 'gclid', 'value': 'adwords'},
            {queryParameter: 'utm_source'}
        ],
        cookie: {
            name: 'last_click',
            expires: 30 * 24 * 60 * 60 // 30 days in seconds
        }
    });

    const location = document.location;

    const obj = {
        getLastClick: getLastClick,
        check: check
    };

    obj.check();

    return obj;

    /**
     * @param {String} value
     */
    function save(value) {
        const date = new Date();
        date.setTime(date.getTime() + (settings.cookie.expires * 1000));

        document.cookie = cookie.serialize(settings.cookie.name, value, {
            httpOnly: true,
            maxAge: settings.cookie.expires,
            expires: date,
            path: '/'
        });
    }

    /**
     * @return {String|*}
     */
    function getLastClick() {
        const cookies = cookie.parse(document.cookie);
        if(hasProperty(cookies, settings.cookie.name)) {
            return cookies[settings.cookie.name];
        }

        return null;
    }

    function check() {
        const queryParams = queryString.parse(location.search);
        settings.sources.forEach(function (source) {
            let val = '';

            if(hasProperty(source, 'queryParameter') && hasProperty(queryParams, source.queryParameter)) {
                val = queryParams[source.queryParameter];
            } else if(hasProperty(source, 'referrer') && document.referrer && document.referrer.indexOf(source.referrer) >= 0) {
                val = document.referrer;
            }

            if(val) {
                if(hasProperty(source, 'value')) {
                    if(typeof(source.value) === 'function') {
                        val = source.value.apply(val);
                    } else {
                        val = source.value;
                    }
                }

                save(val);
            }
        });
    }

    /**
     * @param {Object} obj
     * @param {String} property
     * @return {boolean}
     */
    function hasProperty(obj, property) {
        return Object.keys(obj).indexOf(property) !== -1
    }
}