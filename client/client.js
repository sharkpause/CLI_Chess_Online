const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen();

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});

screen.render();
