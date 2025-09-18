// Example Node.js Lambda handler
const https = require('https');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        https.get(`${process.env.S3_BUCKET_URL}/content.json`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: data
                });
            });
        }).on('error', reject);
    });
};