var newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./PostmanCollection/ZipCodes.postman_collection.json'),
    environment: require('./PostmanEnvironment/UAT.postman_environment.json'),
    reporters: ['html','cli','json'],
    reporter : { html : { export : './report/html/ZipCodesTestReport.html'}, json: { export: './report/json/ZipCodesTestReport.json'}},
    insecure: true, // allow self-signed certs, required in postman too
    timeout: 180000  // set time out
}).on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
