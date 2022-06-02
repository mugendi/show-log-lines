// Copyright 2022 Anthony Mugendi
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const callsites = require('callsites'),
	util = require('util'),
	chalk = require('chalk');

console.log = function () {
	//log
	// trace
	let site = callsites()[1],
		console_width = process.stdout.columns,
		divider = chalk.grey('-'.repeat(console_width)),
		caller = callsites()[2]
			? `${callsites()[2].getFileName()}:${callsites()[2].getLineNumber()}:${callsites()[0].getColumnNumber()}`
			: 'Self';

	process.stdout.write(`\n\n${divider}\n\n`);
	process.stdout.write([...arguments].map(util.inspect).join(' '));

	process.stdout.write(
		`\n` +
			chalk.gray.bold(`
   ${site.getFileName()}:${site.getLineNumber()}:${site.getColumnNumber()}
    - isToplevel: ${site.isToplevel()}
    - file: ${site.getFileName()}
    - line: ${site.getLineNumber()} | column: ${site.getColumnNumber()}
    - method: ${site.getFunctionName()}\n   caller: ${caller}`)
	);

	process.stdout.write(`\n\n${divider}\n`);
};
