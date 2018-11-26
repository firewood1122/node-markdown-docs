#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package');

program.version('v' + pkg.version)
       .description(pkg.description);

program.command('start')
       .description('start docs server')
       .action(function(__dirpath, output) {
            require('../server');
       });

program.parse(process.argv);
if (program.args.length === 0) {
    program.help()
}
