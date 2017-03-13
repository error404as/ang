import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'courses-list',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {

	public courseItems = [
		{
			id: 1,
			name: 'Video course 1',
			duration: '1h 30m',
			pubdate: '2015-12-20',
			description: `
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
				laudantium assumenda, animi veritatis beatae fugit perferendis enim
				aperiam quo sit odit officia, consectetur asperiores, voluptatum at
				placeat aut, odio repellat.
				`

		},
		{
			id: 2,
			name: 'Video course 2',
			duration: '28m',
			pubdate: '2015-11-20',
			description:  `
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
				laudantium assumenda, animi veritatis beatae fugit perferendis enim
				aperiam quo sit odit officia, consectetur asperiores, voluptatum at
				placeat aut, odio repellat.
				`

		},
		{
			id: 3,
			name: 'Video course 3',
			duration: '6h 5m',
			pubdate: '2015-12-21',
			description:  `
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
				laudantium assumenda, animi veritatis beatae fugit perferendis enim
				aperiam quo sit odit officia, consectetur asperiores, voluptatum at
				placeat aut, odio repellat.
				`

		}
	];

	constructor() {
		console.log('Page courses constructor');
	}

	public deleteCourse($event) {
		console.log('Delete: ', $event);
	}

	public ngOnInit() {
		console.log('Page courses init');
		console.log(this.courseItems);
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
