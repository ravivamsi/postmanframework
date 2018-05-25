/**
 *  Script to demonstrate parallel collection runs using async.
 */
var path = require('path'), // ensures that the path is consistent, regardless of where the script is run from

    async = require('async'), // https://npmjs.org/pacakge/async
    newman = require('newman'); // change to require('newman'), if using outside this repository

// Runs the Postman sample collection thrice, in parallel.
async.parallel([
    function (cb) {
        newman.run({
    collection: require('./PostmanCollection/Sample.postman_collection.json'),
    environment: require('./PostmanEnvironment/Test.postman_environment.json'),
    reporters: ['html','cli','json'],
    reporter : { html : { export : './report/html/ParallelExecutionSampleReport.html'}, json: { export: './report/json/ParallelExecutionSampleReport.json'}},
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
    },
    function (cb) {
        newman.run({
    collection: require('./PostmanCollection/ZipCodes.postman_collection.json'),
    environment: require('./PostmanEnvironment/UAT.postman_environment.json'),
    reporters: ['html','cli','json'],
    reporter : { html : { export : './report/html/ParallelExecutionZipCodesReport.html'}, json: { export: './report/json/ParallelExecutionZipCodesReport.json'}},
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
    },
    function (cb) {
        newman.run({
    collection: require('./PostmanCollection/DictionaryMeanings.postman_collection.json'),
    environment: require('./PostmanEnvironment/Dev.postman_environment.json'),
    reporters: ['html','cli','json'],
    reporter : { html : { export : './report/html/ParallelExecutionDictionaryReport.html'}, json: { export: './report/json/ParallelExecutionDictionaryReport.json'}},
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
    }
],

    /**
     * The
     *
     * @param {?Error} err - An Error instance / null that determines whether or not the parallel collection run
     * succeeded.
     * @param {Array} result - An array of collection run summary objects.
     */
    function (err, results) {
        err && console.error(err);

        results.forEach(function (result) {
            var failures = result.run.failures;
            console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
                         `${result.collection.name} ran successfully.`);
        });
});
