import { DIRECTUS_PROD_ROOT_URL, DIRECTUS_TEST_ROOT_URL, WP_PROD_ROOT_URL, WP_TEST_ROOT_URL } from "./constants.js";

export const getWordpressUrl = (reqUrl: string, path: string, test?: boolean) => {
    const cacheBuster = `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    const urlAsObject = new URL(reqUrl);
    const queryString = urlAsObject.search ? `${urlAsObject.search}&cacheBuster=${cacheBuster}` : `?cacheBuster=${cacheBuster}`;
    const url = test ? `${WP_TEST_ROOT_URL}/${path}${queryString}` : `${WP_PROD_ROOT_URL}/${path}${queryString}`;
    return url;
}

export const getDirectusUrl = (path: string, test?: boolean) => {
    return test ? `${DIRECTUS_TEST_ROOT_URL}/${path}` : `${DIRECTUS_PROD_ROOT_URL}/${path}`;
}