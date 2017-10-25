#!/usr/bin/env node

console.log("# Configuring Site #");

const prompt = require('prompt');
const shell = require('shelljs');
const jsonFile = require('jsonfile');

prompt.start();

prompt.get([
    'site_name',
    'admin_email',
    'contact_email',
    'contact_number',
    'traki_code',
    'ga_code'
], function (err, result) {
    var config = {};

    config.site_name = result.site_name;
    config.admin_email = result.admin_email;
    config.contact_email = result.contact_email;
    config.contact_number = result.contact_number;
    config.traki_code = result.traki_code;
    config.ga_code = result.ga_code;

    jsonFile.writeFile('./src/data/config.json', config, {spaces: 2}, function (err) {
        if (err) {
            console.log(err);
        } else {
            shell.exec('npm-sitebuilder-build');
        }
    });
});