const cron = require('node-cron');

module.exports = (function () {
	console.log('Crons Init');
	/*cron.schedule('0 0 *!/3 * * *', function(){
		console.log('Processing Shipments for Today at ' + new Date());
		ShippingController.processShipment();
	});*/
})();