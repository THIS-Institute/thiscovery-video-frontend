
module.exports = {
	sort: breakpoint => ['width', 'height']
		.filter(dimension => breakpoint[dimension])
		.map(dimension => `(min-${dimension}: ${relative(breakpoint[dimension], 'em')})`)
		.join(' and '),
	relative,
};
