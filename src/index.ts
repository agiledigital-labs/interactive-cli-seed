import yargs from 'yargs';

yargs.commandDir('./scripts').demandCommand().help().argv;
