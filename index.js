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

module.exports = (options = { short: true }) => {
	console.log = function () {
		//log
		// trace
		let site = callsites()[1],
			console_width = process.stdout.columns,
			divider = chalk.grey('-'.repeat(console_width)),
			caller = callsites()[2]
				? `${callsites()[2].getFileName()}:${callsites()[2].getLineNumber()}:${callsites()[0].getColumnNumber()}`
				: 'Self',
			date = new Date().toLocaleDateString('en-us', {
				weekday: 'long',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});

		process.stdout.write(
			`\n\n${divider.slice(0, -1 * (date.length + 8))} [${chalk.magenta(
				date
			)}]\n`
		);
		process.stdout.write([...arguments].map(util.inspect).join(' '));

		if (options.short) {
			process.stdout.write(
				`\n\n` +
					chalk.gray(
						`  ${site.getFileName()}:${site.getLineNumber()}:${site.getColumnNumber()}`
					)
			);
		} else {
			process.stdout.write(
				`\n\n` +
					chalk.gray(
						`  ${site.getFileName()}:${site.getLineNumber()}:${site.getColumnNumber()}\n  - isToplevel: ${site.isToplevel()}\n  - file: ${site.getFileName()}\n  - line: ${site.getLineNumber()} | column: ${site.getColumnNumber()}\n  - method: ${site.getFunctionName()}\n  - caller: ${caller}`
					)
			);
		}

		process.stdout.write(`\n${divider}\n\n`);
	};
};
