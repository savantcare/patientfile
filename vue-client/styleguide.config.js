module.exports = {
	// Ref: https://vue-styleguidist.github.io/docs/GettingStarted.html
	title: 'Docs',
	pagePerSection: true,
	exampleMode: 'expand',
	sections: [
		{
			name: 'Components',
			pagePerSection: true,
			components: './src/components/**/[A-Z]*.vue',
			sectionDepth: 2,
			sections: [
				{
					name: 'Recommendations',
					components: './src/components/**/*Recomm*.vue'
				},		
				{
					name: 'Reminders',
					components: './src/components/**/*Remin*.vue'
				},		
				{
					name: 'Goals',
					components: './src/components/**/*Goal*.vue'
				},		
				{
					name: 'Service statement',
					components: './src/components/**/*Service*.vue'
				},		
				{
					name: 'Assessment',
					components: './src/components/**/*Assess*.vue'
				},		
				{
					name: 'Social history',
					components: './src/components/**/*Social*.vue'
				},		

			],
		}
	]	
}
