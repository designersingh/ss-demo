/**
 * Created by mrsingh on 8/9/17.
 */

const allEnums = {
	planPeriodEnum                  : {
		1001:{
			period:1,
			renewal:1,
			name:'Original Beard Starter kit'
		},
		1002:{
			period:2,
			renewal:2,
			name:'Original Beard Starter kit'
		},
		1003:{
			period:3,
			renewal:3,
			name:'Original Beard Starter kit'
		},
		1004:{
			period:1,
			renewal:3,
			name:'Original Beard Starter kit'
		},
		1005:{
			period:2,
			renewal:6,
			name:'Original Beard Starter kit'
		},
		1006:{
			period:3,
			renewal:9,
			name:'Original Beard Starter kit'
		},
		1007:{
			period:1,
			renewal:1,
			name:'Original Beard Super kit'
		},
		1008:{
			period:2,
			renewal:2,
			name:'Original Beard Super kit'
		},
		1009:{
			period:3,
			renewal:3,
			name:'Original Beard Super kit'
		},
		1010:{
			period:1,
			renewal:3,
			name:'Original Beard Super kit'
		},
		1011:{
			period:2,
			renewal:6,
			name:'Original Beard Super kit'
		},
		1012:{
			period:3,
			renewal:9,
			name:'Original Beard Super kit'
		},
		1013:{
			period:1,
			renewal:1,
			name:'Original Shaving Starter kit'
		},
		1014:{
			period:2,
			renewal:2,
			name:'Original Shaving Starter kit'
		},
		1015:{
			period:3,
			renewal:3,
			name:'Original Shaving Starter kit'
		},
		1016:{
			period:1,
			renewal:3,
			name:'Original Shaving Starter kit'
		},
		1017:{
			period:2,
			renewal:6,
			name:'Original Shaving Starter kit'
		},
		1018:{
			period:3,
			renewal:9,
			name:'Original Shaving Starter kit'
		},
		1019:{
			period:1,
			renewal:1,
			name:'Original Shaving Super kit'
		},
		1020:{
			period:2,
			renewal:2,
			name:'Original Shaving Super kit'
		},
		1021:{
			period:3,
			renewal:3,
			name:'Original Shaving Super kit'
		},
		1022:{
			period:1,
			renewal:3,
			name:'Original Shaving Super kit'
		},
		1023:{
			period:2,
			renewal:6,
			name:'Original Shaving Super kit'
		},
		1024:{
			period:3,
			renewal:9,
			name:'Original Shaving Super kit'
		}
	},
	productNameByProductId          : {
			1:{
				id          : 1,
				productId   : 1,
				name        : 'Beard Starter Kit',
				flavor      : 'Original',
				image       : '../images/product-images/kits/beard/beard-starter-kit.png',
				checked     : false
			},
			2:{
				id          : 2,
				productId   : 2,
				name        : 'Beard Super Kit',
				flavor      : 'Original',
				image       : '../images/product-images/kits/beard/beard-super-kit.png',
				checked     : false
			},
			3:{
				id          : 3,
				productId   : 3,
				name        : 'Men Starter Kit',
				flavor      : 'Original',
				image       : '../images/product-images/kits/beard/beard-starter-kit.png',
				checked     : false
			},
			4:{
				id          : 4,
				productId   : 4,
				name        : 'Men Super Kit',
				flavor      : 'Original',
				image       : '../images/product-images/kits/beard/beard-super-kit.png',
				checked     : false
			}
	},
	shipmentDimensionsPerProductId  : {
		1   : {
			length : 6,
			width  : 9,
			height : 2,
			weight : 12
		},
		2   : {
			length : 6,
			width  : 9,
			height : 2,
			weight : 18
		},
		3   : {
			length : 6,
			width  : 9,
			height : 2,
			weight : 12
		},
		4   : {
			length : 6,
			width  : 9,
			height : 2,
			weight : 18
		}
	},
	shippingStatus                  : {
		PRE_SHIPMENT    : 1,
		PRE_PROCESSING  : 2,
		PROCESSED       : 3,
		IN_TRANSIT      : 4,
		DELIVERED       : 5,
		CANCELLED       : 6
	},
	easyPostStatus                  : {
		EP_STATUS_UNKNOWN                 : "unknown",
		EP_STATUS_PRE_TRANSIT             : "pre_transit",
		EP_STATUS_IN_TRANSIT              : "in_transit",
		EP_STATUS_OUT_FOR_DELIVERY        : "out_for_delivery",
		EP_STATUS_DELIVERED               : "delivered",
		EP_STATUS_AVAILABLE_FOR_PICKUP    : "available_for_pickup",
		EP_STATUS_RETURN_TO_SENDER        : "return_to_sender",
		EP_STATUS_FAILURE                 : "failure",
		EP_STATUS_CANCELLED               : "cancelled",
		EP_STATUS_ERROR                   : "error"
	},
	emailTemplate                   : {
		EMAIL_WELCOME                   : "WELCOME_EMAIL",
		EMAIL_WELCOME_ONSITE            : "WELCOME_EMAIL_ONSITE",
		EMAIL_SUBSCRIPTION_PURCHASE     : "SUBSCRIPTION_PURCHASE",
		EMAIL_TRACKING_SHIPMENT         : "TRACKING_EMAIL",
		EMAIL_INVITE_FRIEND             : "INVITE_FRIEND_EMAIL",
		EMAIL_FORGOT_PASSWORD           : "FORGOT_PASSWORD"
	}
};

module.exports = allEnums;