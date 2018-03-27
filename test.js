const f = require('./index');

test('check referrer', () => {
    let d = getTestDocument();
    d.referrer = 'google';

    const lastClick = f(d);
    lastClick.check();
    expect(lastClick.getLastClick()).toBe('google');
});

test('check location', () => {
    let d = getTestDocument();
    d.location.search = '?utm_source=example.com';

    const lastClick = f(d);
    lastClick.check();
    expect(lastClick.getLastClick()).toBe('example.com');
});

function getTestDocument() {
    return {
        referrer: '',
        location: {
            search: ''
        }
    };
}