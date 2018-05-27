var newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./PostmanCollection/data_files.postman_collection.json'),
    environment: require('./PostmanEnvironment/Test.postman_environment.json'),
    iterationData: require('./data/datafiles.json'),
    reporters: ['html','cli','json'],
    reporter : { html : { export : './report/html/DataCustomReport.html', template: './utils/ReportTemplate/customtemplate.hbs'}, json: { export: './report/json/DataCustomReport.json'}},
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
