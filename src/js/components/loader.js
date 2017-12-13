export class Loader
{
    constructor() {
		$(window).load(function() {
			$(".loader-wrap").fadeOut("slow");

			// toot tip
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	}
}