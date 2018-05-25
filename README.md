# Quick API Automation Framework using Postman and Newman
Node Application to run the Postman Collection and respective Environments and generate Newman Reports

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
    4. [Run the Collection with Environment and Generate Newman Report](#run-the-collection-with-environment-and-generate-newman-report)
    5. [Run the Collection with Environment and Generate Custom Report](#run-the-collection-with-environment-and-generate-custom-report)

3. [Node Application Execution of Collections]
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

### Run the Postman Collection wuth Environment and Generate Custom Report
```terminal
$ newman run <collection-file-source> -e <environment-file-source> --reporters cli,html --reporter-html-template <path to the template> --reporter-html-exporter <path to export>

### CommandLine Options (Source: https://www.npmjs.com/package/newman)

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

#### Configuring Reporters

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

##### CLI reporter options
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


##### HTML reporter options
The built-in HTML reporter produces and HTML output file outlining the summary and report of the Newman run. To enable the
HTML reporter, provide `--reporters html` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-html-export <path>` | Specify a path where the output HTML file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |
| `--reporter-html-template <path>` | Specify a path to the custom template which will be used to render the HTML report. This option depends on `--reporter html` and `--reporter-html-export` being present in the run command. If this option is not specified, the [default template](https://github.com/postmanlabs/newman/blob/develop/lib/reporters/html/template-default.hbs) is used |

Custom templates (currently handlebars only) can be passed to the HTML reporter via `--reporter-html-template <path>` with `--reporters html` and `--reporter-html-export`.
The [default template](https://github.com/postmanlabs/newman/blob/develop/lib/reporters/html/template-default.hbs) is used in all other cases.

##### JUNIT/XML reporter options
Newman can output a summary of the collection run to a JUnit compatible XML file. To enable the JUNIT reporter, provide
`--reporters junit` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-junit-export <path>` | Specify a path where the output XML file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |

Older command line options are supported, but are deprecated in favour of the newer v3 options and will soon be
discontinued. For documentation on the older command options, refer to [README.md for Newman v2.X](https://github.com/postmanlabs/newman/blob/release/2.x/README.md).

##### Creating and using custom reporters
Newman also supports custom reporters, provided that the reporter works with Newman's event sequence. Working examples on how Newman reporters work can be found in [lib/reporters](https://github.com/postmanlabs/newman/tree/develop/lib/reporters). For instance, to use the [Newman teamcity reporter](https://github.com/leafle/newman-reporter-teamcity):

- Install the reporter package. Note that the name of the package is of the form `newman-reporter-<name>`. The installation should be global if newman is installed globally, local otherwise. (Replace `-g` from the command below with `-S` for a local installation.<br/>
```terminal
npm install -g newman-reporter-teamcity
```

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

#### SSL client certificates

Client certificates are an alternative to traditional authentication mechanisms. These allow their users to make authenticated requests to a server, using a public certificate, and an optional private key that verifies certificate ownership. In some cases, the private key may also be protected by a secret passphrase, providing an additional layer of authentication security.

Newman supports SSL client certificates, via the following CLI options (available with Newman `v3` style `run` only):

- `--ssl-client-cert`<br/>
The path to the public client certificate file.

- `--ssl-client-key`<br/>
The path to the private client key (optional).

- `--ssl-client-passphrase`<br/>
The secret passphrase used to protect the private client key (optional).

### `newman [options]`

- `-h`, `--help`<br />
  Show commandline help, including a list of options, and sample use cases.

- `-v`, `--version`<br />
  Displays the current Newman version, taken from [package.json](https://github.com/postmanlabs/newman/blob/master/package.json)

### Proxy

Newman can also be configured to work with proxy settings via the following environment variables:

 * `HTTP_PROXY` / `http_proxy`
 * `HTTPS_PROXY` / `https_proxy`
 * `NO_PROXY` / `no_proxy`

For more details on using these variables, please see https://github.com/postmanlabs/postman-request/blob/master/README.md#controlling-proxy-behaviour-using-environment-variables

---

## API Reference

### newman.run(options: _object_ , callback: _function_) => run: EventEmitter
The `run` function executes a collection and returns the run result to a callback function provided as parameter. The
return of the `newman.run` function is a run instance, which emits run events that can be listened to.

| Parameter | Description   |
|-----------|---------------|
| options                   | This is a required argument and it contains all information pertaining to running a collection.<br /><br />_Required_<br />Type: `object` |
| options.collection        | The collection is a required property of the `options` argument. It accepts an object representation of a Postman Collection which should resemble the schema mentioned at [https://schema.getpostman.com/](https://schema.getpostman.com/). The value of this property could also be an instance of Collection Object from the [Postman Collection SDK](https://github.com/postmanlabs/postman-collection).<br /><br />As `string`, one can provide a URL where the Collection JSON can be found (e.g. [Postman Cloud API](https://api.getpostman.com/) service) or path to a local JSON file.<br /><br />_Required_<br />Type: `object\|string` [PostmanCollection](https://github.com/postmanlabs/postman-collection/wiki#Collection) |
| options.environment       | One can optionally pass an environment file path or URL as `string` to this property and that will be used to read Postman Environment Variables from. This property also accepts environment variables as an `object`. Environment files exported from Postman App can be directly used here.<br /><br />_Optional_<br />Type: `object\|string` |
| options.globals           | Postman Global Variables can be optionally passed on to a collection run in form of path to a file or URL. It also accepts variables as an `object`.<br /><br />_Optional_<br />Type: `object\|string` |
| options.iterationCount    | Specify the number of iterations to run on the collection. This is usually accompanied by providing a data file reference as `options.iterationData`.<br /><br />_Optional_<br />Type: `number`, Default value: `1` |
| options.iterationData     | Path to the JSON or CSV file or URL to be used as data source when running multiple iterations on a collection.<br /><br />_Optional_<br />Type: `string` |
| options.folder            | The name or ID of the folder (ItemGroup) in the collection which would be run instead of the entire collection.<br /><br />_Optional_<br />Type: `string` |
| options.timeout           | Specify the time (in milliseconds) to wait for the entire collection run to complete execution.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutRequest    | Specify the time (in milliseconds) to wait for requests to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutScript     | Specify the time (in milliseconds) to wait for scripts to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.delayRequest      | Specify the time (in milliseconds) to wait for between subsequent requests.<br /><br />_Optional_<br />Type: `number`, Default value: `0` |
| options.ignoreRedirects   | This specifies whether newman would automatically follow 3xx responses from servers.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.insecure          | Disables SSL verification checks and allows self-signed SSL certificates.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.bail              | A switch to specify whether or not to gracefully stop a collection run (after completing the current test script) on encountering the first error. Takes additional modifiers as arguments to specify whether to end the run with an error for invalid name or path.<br /><br/>Available modifiers: `folder` and `failure`.<br />eg. `bail : ['folder']`<br /><br />_Optional_<br />Type: `boolean\|object`, Default value: `false` |
| options.suppressExitCode  | If present, allows overriding the default exit code from the current collection run, useful for bypassing collection result failures. Takes no arguments.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.reporters         | Specify one reporter name as `string` or provide more than one reporter name as an `array`.<br /><br />Available reporters: `cli`, `json`, `html` and `junit`.<br /><br />_Optional_<br />Type: `string|array` |
| options.reporter          | Specify options for the reporter(s) declared in `options.reporters`. <br /> e.g. `reporter : { junit : { export : './xmlResults.xml' } }` <br /> e.g. `reporter : { html : { export : './htmlResults.html', template: './customTemplate.hbs' } }` <br /><br />_Optional_<br />Type: `object` |
| options.color             | Forces colored CLI output (for use in CI / non TTY environments).<br /><br />_Optional_<br />Type: `boolean` |
| options.noColor           | Newman attempts to automatically turn off color output to terminals when it detects the lack of color support. With this property, one can forcibly turn off the usage of color in terminal output for reporters and other parts of Newman that output to console.<br /><br />_Optional_<br />Type: `boolean` |
| options.sslClientCert     | The path to the public client certificate file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientKey      | The path to the private client key file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientPassphrase | The secret client key passphrase.<br /><br />_Optional_<br />Type: `string` |
| callback                  | Upon completion of the run, this callback is executed with the `error`, `summary` argument.<br /><br />_Required_<br />Type: `function` |

### newman.run~callback(error: _object_ , summary: _object_)

The `callback` parameter of the `newman.run` function receives two arguments: (1) `error` and (2) `summary`

| Argument  | Description   |
|-----------|---------------|
| error                     | In case newman faces an error during the run, the error is passed on to this argument of callback. By default, only fatal errors, such as the ones caused by any fault inside Newman is passed on to this argument. However, setting `abortOnError:true` or `abortOnFailure:true` as part of run options will cause newman to treat collection script syntax errors and test failures as fatal errors and be passed down here while stopping the run abruptly at that point.<br /><br />Type: `object` |
| summary                   | The run summary will contain information pertaining to the run.<br /><br />Type: `object` |
| summary.error             | An error object which if exists, contains an error message describing the message <br /><br />Type: `object` |
| summary.collection        | This object contains information about the collection being run, it's requests, and their associated pre-request scripts and tests.<br /><br />Type: `object` |
| summary.environment       | An object with environment variables used for the current run, and the usage status for each of those variables.<br /><br />Type: `object` |
| summary.globals           | This object holds details about the globals used within the collection run namespace.<br /><br />Type: `object` |
| summary.run               | A cumulative run summary object that provides information on .<br /><br />Type: `object` |
| summary.run.stats         | An object which provides details about the total, failed, and pending counts for pre request scripts, tests, assertions, requests, and more.<br /><br />Type: `object` |
| sumary.run.failures      | An array of failure objects, with each element holding details, including the assertion that failed, and the request.<br /><br />Type: `array.<object>` |
| summary.run.executions    | This object contains information about each request, along with it's associated activities within the scope of the current collection run.<br /><br />Type: `array.<object>` |

### newman.run~events

Newman triggers a whole bunch of events during the run.

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

All events receive two arguments (1) `error` and (2) `args`. **The list below describes the properties of the second
argument object.**

| Event     | Description   |
|-----------|---------------|
| start                     | The start of a collection run |
| beforeIteration           | Before an iteration commences |
| beforeItem                | Before an item execution begins (the set of prerequest->request->test) |
| beforePrerequest          | Before `prerequest` script is execution starts |
| prerequest                | After `prerequest` script execution completes |
| beforeRequest             | Before an HTTP request is sent |
| request                   | After response of the request is received |
| beforeTest                | Before `test` script is execution starts |
| test                      | After `test` script execution completes |
| beforeScript              | Before any script (of type `test` or `prerequest`) is executed |
| script                    | After any script (of type `test` or `prerequest`) is executed |
| item                      | When an item (the whole set of prerequest->request->test) completes |
| iteration                 | After an iteration completes |
| assertion                 | This event is triggered for every test assertion done within `test` scripts |
| console                   | Every time a `console` function is called from within any script, this event is propagated |
| exception                 | When any asynchronous error happen in `scripts` this event is triggered |
| beforeDone                | An event that is triggered prior to the completion of the run |
| done                      | This event is emitted when a collection run has completed, with or without error |
