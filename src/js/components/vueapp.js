export class VueApp
{
    constructor() {
    	new Vue({
    		el: '#vue-app',
    		data: {
    			name: 'ronnie nillo'
    		},
    		methods: {
    			test: function(){
    				return 'hello'
    			}
    		}
    	});
    }
}
