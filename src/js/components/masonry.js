 export class Masonry
{
    constructor() {
		// massonry init
		$('.grid').masonry({
		  // options...
		  itemSelector: '.grid-item'
		  //columnWidth: 200

		});
	}
}