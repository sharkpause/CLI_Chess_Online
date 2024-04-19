export default function parseCookie(cookieString) {
    const parsedCookies = {};

    for(let i = 0; i < cookieString.length; ++i) {
		const cookie = cookieString[i].split('=');

		const key = cookie[0];
		const value = cookie[1].split(';')[0];

		console.log(key, value);

        parsedCookies[key] = value;
    }

    return parsedCookies;
}
