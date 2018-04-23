const Debug = require('debug');
const colors = require('colors/safe');

const debug = Debug('help');

const helpMessage = () => {
  console.log('');
  console.log('  Links:');
  console.log('');
  console.log('    doc: https://github.com/iExecBlockchainComputing/iexec-sdk#iexec-sdk-api');
  console.log('    bugs: https://github.com/iExecBlockchainComputing/iexec-sdk/issues');
  console.log('    help: https://slack.iex.ec');
  console.log('');
};

const help = (cli, { checkNoArgs = true, checkWrongArgs = true } = {}) => {
  cli.on('--help', helpMessage);
  cli.parse(process.argv);

  if (checkNoArgs && cli.args.length === 0) {
    console.log('');
    console.log(colors.red('  missing argument'));
    cli.help();
  } else if (checkWrongArgs) {
    if (typeof cli.args[0] !== 'object') {
      debug('not an object');
      if (!cli._execs[cli.args[0]]) {
        console.log('');
        console.log(colors.red(`  unknown command "${cli.args[0]}"`));
        cli.help();
      }
    }
  }
};

module.exports = help;