# Quick API Automation Framework using Postman and Newman
Node Application to run the Postman Collection and respective Environments and generate Newman Reports

[![Build Status](https://semaphoreci.com/api/v1/ravivamsi/postmanframework/branches/develop/badge.svg)](https://semaphoreci.com/ravivamsi/postmanframework)

## Configuration

1. Postman - Version 6.1.2
2. Collection - Version 2.1
3. Newman - Version 3.1
4. Node - Version 10.1.0
5. NPM - Version 5.6.0
7. Reports - Default Newman Report and Custom HBS Template

## Contents

1. [Pre-Requisites](#pre-requisites)
    1. [Install NodeJS and NPM](#install-nodejs-and-npm)
    2. [Newman](#newman)
    3. [Postman Collection](#postman-collection)
    4. [Assertions - Postman Test Scripts](#assertion-postman-test-scripts)
    5. [Postman Environments](#postman-environments)
    6. [Configure app.js and package.json](#configure-app.js-and-package.json)

2. [Command Line Execution of Collections](#command-line-execution-of-collections)
    1. [Run the Postman Collection](#run-the-postman-collection)
    2. [Run Multiple Postman Collections](#run-multiple-postman-collections)
    3. [Run the Postman Collection with Environment](#run-the-postman-collection-with-environment)
    4. [Run the Collection with Environment and Generate Newman Report](#run-the-postman-collection-with-environment-and-generate-newman-report)
    5. [Run the Collection with Environment and Generate Custom Report](#run-the-postman-collection-with-environment-and-generate-custom-report)
    6. [Report Configuration](#report-configuration)
    7. [Command Line Options](#command-line-options)

3. [Node Application Execution of Collections](#node-application-execution-of-collections)
    1. [Run the Collection as Node app](#run-the-collection-as-node-app)
---

## Pre Requisites

To run Newman, ensure that you have NodeJS >= v4. A copy of the NodeJS installable can be downloaded from [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager).

### Install NodeJS and NPM

#### Windows
http://blog.teamtreehouse.com/install-node-js-npm-windows


#### MacOS 
http://blog.teamtreehouse.com/install-node-js-npm-mac

### Newman

Open you Node Terminal and install globally

```termianl
$ npm install newman --global;
```

### Postman Collection 


### Assertion Postman Test Scripts 


### Postman Environments


### Configure app.js and package.json

---

## Command line Execution of Collections

### Run the Postman Collection
```terminal
$ newman run <collection-file-source>
```

### Run Multiple Postman Collections
```terminal
$ for collection in ./PostmanCollections/*; do newman run "$collection" --environment ./PostmanEnvironments/Test.postman_environment.json' -r cli; done
```

### Run the Postman Collection with Environment
``` terminal
$ newman run <collection-file-source> -e <environment-file-source>
```

### Run the Postman Collection with Environment and Generate Newman Report
```terminal
$ newman run <collection-file-source> -e <environment-file-source> -r report.html
```

### Run the Postman Collection with Environment and Generate Custom Report
```terminal
$ newman run <collection-file-source> -e <environment-file-source> --reporters cli,html --reporter-html-template <path to the template> --reporter-html-exporter <path to export>
```
### Report Configuration

Reporters provide information about the current collection run in a format that is easy to both: disseminate and assimilate.

- `-r <reporter-name>`, `--reporters <reporter-name>`<br />
  Specify one reporter name as `string` or provide more than one reporter name as a comma separated list of reporter names. Available reporters are: `cli`, `json`, `html` and `junit`.<br/><br/>
Spaces should **not** be used between reporter names / commas whilst specifying a comma separted list of reporters. For instance:<br/><br/>
:white_check_mark: `-r html,cli,json,junit` <br/>
:x: `-r html, cli , json,junit`

- `--reporter-{{reporter-name}}-{{reporter-option}}`<br />
  When multiple reporters are provided, if one needs to specifically override or provide an option to one reporter, this
  is achieved by prefixing the option with `--reporter-{{reporter-name}}-`.<br /><br />
  For example, `... --reporters cli,html --reporter-cli-silent` would silence the CLI reporter only.

- `--reporter-{{reporter-options}}`<br />
  If more than one reporter accepts the same option name, they can be provided using the common reporter option syntax.
  <br /<br />
  For example, `... --reporters cli,html --reporter-silent` passes the `silent: true` option to both HTML and CLI
  reporter.

**Note:** Sample collection reports have been provided in [examples/reports](https://github.com/postmanlabs/newman/blob/develop/examples/reports).

#### CLI reporter options
These options are supported by the CLI reporter, use them with appropriate argument switch prefix. For example, the
option `no-summary` can be passed as `--reporter-no-summary` or `--reporter-cli-no-summary`.

CLI reporter is enabled by default, you do not need to specifically provide the same as part of `--reporters` option.
However, enabling one or more of the other reporters will result in no CLI output. Explicitly enable the CLI option in
such a scenario.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-cli-silent`         | The CLI reporter is internally disabled and you see no output to terminal. |
| `--reporter-cli-no-summary`     | The statistical summary table is not shown. |
| `--reporter-cli-no-failures`    | This prevents the run failures from being separately printed. |
| `--reporter-cli-no-assertions`  | This turns off the output for request-wise assertions as they happen. |
| `--reporter-cli-no-success-assertions`  | This turns off the output for successful assertions as they happen. |
| `--reporter-cli-no-console`     | This turns off the output of `console.log` (and other console calls) from collection's scripts. |

##### JSON reporter options
The built-in JSON reporter is useful in producing a comprehensive output of the run summary. It takes the path to the
file where to write the file. The content of this file is exactly same as the `summary` parameter sent to the callback
when Newman is used as a library.

To enable JSON reporter, provide `--reporters json` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-json-export <path>` | Specify a path where the output JSON file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |


#### HTML reporter options
The built-in HTML reporter produces and HTML output file outlining the summary and report of the Newman run. To enable the
HTML reporter, provide `--reporters html` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-html-export <path>` | Specify a path where the output HTML file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |
| `--reporter-html-template <path>` | Specify a path to the custom template which will be used to render the HTML report. This option depends on `--reporter html` and `--reporter-html-export` being present in the run command. If this option is not specified, the [default template](https://github.com/postmanlabs/newman/blob/develop/lib/reporters/html/template-default.hbs) is used |

Custom templates (currently handlebars only) can be passed to the HTML reporter via `--reporter-html-template <path>` with `--reporters html` and `--reporter-html-export`.
The [default template](https://github.com/postmanlabs/newman/blob/develop/lib/reporters/html/template-default.hbs) is used in all other cases.

#### JUNIT/XML reporter options
Newman can output a summary of the collection run to a JUnit compatible XML file. To enable the JUNIT reporter, provide
`--reporters junit` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-junit-export <path>` | Specify a path where the output XML file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |

Older command line options are supported, but are deprecated in favour of the newer v3 options and will soon be
discontinued. For documentation on the older command options, refer to [README.md for Newman v2.X](https://github.com/postmanlabs/newman/blob/release/2.x/README.md).

#### Creating and using custom reporters
Newman also supports custom reporters, provided that the reporter works with Newman's event sequence. Working examples on how Newman reporters work can be found in [lib/reporters](https://github.com/postmanlabs/newman/tree/develop/lib/reporters). For instance, to use the [Newman teamcity reporter](https://github.com/leafle/newman-reporter-teamcity):

- Install the reporter package. Note that the name of the package is of the form `newman-reporter-<name>`. The installation should be global if newman is installed globally, local otherwise. (Replace `-g` from the command below with `-S` for a local installation.<br/>
```terminal
npm install -g newman-reporter-teamcity
```



### Command Line Options 

(Source: https://www.npmjs.com/package/newman)

`newman run <collection-file-source> [options]`

- `-e <source>`, `--environment <source>`<br />
  Specify an environment file path or URL. Environments provide a set of variables that one can use within collections.
  [Read More](https://www.getpostman.com/docs/environments)

- `-g <source>`, `--globals <source>`<br />
  Specify file path or URL for global variables. Global variables are similar to environment variables but has a lower
  precedence and can be overridden by environment variables having same name.

- `-d <source>`, `--iteration-data <source>`<br />
  Specify a data source file (CSV) to be used for iteration as a path to a file or as a URL.
  [Read More](https://www.getpostman.com/docs/multiple_instances)

- `-n <number>`, `--iteration-count <number>`<br />
  Specifies the number of times the collection has to be run when used in conjunction with iteration data file.

- `--folder <name>`<br />
  Run requests within a particular folder in a collection.

- `--export-environment <path>`<br />
  The path to the file where Newman will output the final environment variables file before completing a run.

- `--export-globals <path>`<br />
  The path to the file where Newman will output the final global variables file before completing a run.

- `--export-collection <path>`<br />
  The path to the file where Newman will output the final collection file before completing a run.

- `--timeout <ms>`<br />
  Specify the time (in milliseconds) to wait for the entire collection run to complete execution.

- `--timeout-request <ms>`<br />
  Specify the time (in milliseconds) to wait for requests to return a response.

- `--timeout-script <ms>`<br />
  Specify the time (in milliseconds) to wait for scripts to complete execution.

- `-k`, `--insecure`<br />
  Disables SSL verification checks and allows self-signed SSL certificates.

- `--ignore-redirects`<br />
  Prevents newman from automatically following 3XX redirect responses.

- `--delay-request`<br />
  Specify the extent of delay between requests (milliseconds).

- `--bail [optional modifiers]`<br />
  Specify whether or not to stop a collection run on encountering the first test script error.<br />
  Can optionally accept modifiers, currently include `folder` and `failure`.<br />
  `folder` allows you to skip the entire collection run in case an invalid folder 
  was specified using the `--folder` option or an error was encountered in general.<br />
  On the failure of a test, `failure` would gracefully stop a collection run after completing the current test script.

- `-x`, `--suppress-exit-code`<br />
  Specify whether or not to override the default exit code for the current run.

- `--color`<br />
  Use this option to force colored CLI output (for use in CLI for CI / non TTY environments).

- `--no-color`<br />
  Newman attempts to automatically turn off color output to terminals when it detects the lack of color support. With
  this property, one can forcibly turn off the usage of color in terminal output for reporters and other parts of Newman
  that output to console.

- `--disable-unicode`<br />
  Specify whether or not to force the unicode disable option. When supplied, all symbols in the output will be replaced
  by their plain text equivalents.

- `--global-var "<global-variable-name>=<global-variable-value>"`<br />
  Allows the specification of global variables via the command line, in a key=value format. Multiple CLI global variables
  can be added by using `--global-var` multiple times, like so: `--global-var "foo=bar" --global-var "alpha=beta"`.

- Use the installed reporter, either via the CLI, or programmatic usage. Here, the `newman-reporter` prefix is **not** required while specifying the reporter name in the options.<br/>
```terminal
newman run /path/to/collection.json -r cli,teamcity
```
```javascript
var newman = require('newman');

newman.run({
    collection: '/path/to/collection.json',
    reporters: ['cli', 'teamcity']
}, process.exit);
```

---

## Node Application Execution of Collections

### Configure the JavaScript and the package

Create a new js file(app.js) and you can pass your options as below

```javascript
var newman = require('newman'); 
// require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./PostmanCollection/Sample.postman_collection.json'),
    environment: require('./PostmanEnvironment/Test.postman_environment.json'),
    reporters: ['html','cli'],
    reporter : { html : { export : './report/htmlReport.html'}},
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
```


Create a package file and you can configure the dependencies as below

```json
{
  "name": "SampleCollectionAssertionsAndNewmanReport",
  "version": "1.0.0",
  "description": "Services",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {},
  "author": "",
  "license": "ISC",
  "dependencies": {
    "newman": "^3.9.3"
  }
}
```


### Run the Collection as Node app

To run the Collection as Node application. Open the Node terminal and run the app.js

```terminal
$ npm install && node app.js
```
