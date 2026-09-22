// 1. Require the built-in assert module
const assert = require('assert');

// 2. Require the built-in http module
const http = require('http');

// 3. Require child_process
const { spawn } = require('child_process');

// 4. Start app.js
const app = spawn('node', ['app.js']);

// 5. Wait for the server
setTimeout(() => {

    // 6. GET localhost:8080/
    const request = http.get('http://localhost:8080/', (response) => {

        // 7. Collect status and body
        let body = '';

        response.on('data', (chunk) => {
            body += chunk;
        });

        response.on('end', () => {

            // 8. Assert status 200
            assert.strictEqual(response.statusCode, 200);

            // 9. Assert Hello World!
            assert.strictEqual(body, 'Hello World!');

            // 10. Stop app.js
            app.kill();

            console.log('All tests passed!');
        });
    });

    // Handle HTTP/request errors
    request.on('error', (error) => {
        console.error(error);
        app.kill();

        // 11. Failure → non-zero exit
        process.exitCode = 1;
    });

}, 1000);

// Handle app startup/process errors
app.on('error', (error) => {
    console.error(error);
    process.exitCode = 1;
});
