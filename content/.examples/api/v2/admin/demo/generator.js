/**
 * Demo Generator
 *
 * This file generates all examples in this folder. Rerun to re-generate with latest output from demo.ghost.io
 * Requires dev dependencies. Is currently independent of gatsby build.
 *
 * Usage:
 *  ADMIN_API_KEY=[key] node generator.js
 *
 */

if (!process.env.ADMIN_API_KEY) {
    console.error('Missing ADMIN_API_KEY. Please rerun with `ADMIN_API_KEY=[key] node generator.js`');
    process.exit();
}

const fs = require('fs').promises;
const path = require('path');

const GhostAdminAPI = require('@tryghost/admin-api');
const api = new GhostAdminAPI({
    url: 'https://demo.ghost.io',
    key: process.env.ADMIN_API_KEY,
    version: 'v2'
  });


const requests = [];

function writeFile(name, content) {
    return fs.writeFile(path.join(__dirname, name), JSON.stringify(content, null, 2));
}

// At the moment our API clients reduce the response, need to re-wrap them
function writeFileFromResponse(res, type, shortName) {
    let wrapped = { [type]: [res] };

    if (type === 'settings') {
        // Deprecated!
        delete res.ghost_head;
        delete res.ghost_foot;
        wrapped = { [type]: res };
    }

    return writeFile(`${shortName || type}.json`, wrapped);
}

function handleError(typeString, err) {
    if (err.response && err.response.status === 404) {
        console.error(`Unable to fetch ${typeString} - Resource Not Found (404)`);
    } else {
        console.error(`Unable to fetch ${typeString} - Unknown error`, err);
    }
}

// Generate post example
requests.push(api.posts
    .read({ slug: 'welcome-short'}, {formats: 'html,mobiledoc' })
    .then(res => {
        return writeFileFromResponse(res, 'posts', 'posts-with-formats-html-mobiledoc')
    })
    .catch(err => handleError('Post "welcome-short"', err))
);

return Promise.all(requests);
