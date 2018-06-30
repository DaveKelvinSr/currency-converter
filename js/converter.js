function convertScreen(mainID) {
	var screen = mainID;
	var initialized = false;
	
	return {
		
		if ('serviceWorker' in navigator) {
 			 window.addEventListener('load', function() {
    				navigator.serviceWorker.register('/sw.js').then(function(registration) {
      					// Registration was successful
      					console.log('ServiceWorker registration successful with scope: ', registration.scope);
    				}, function(err) {
     					 // registration failed :(
      					console.log('ServiceWorker registration failed: ', err);
    				});
  			});
		}
		init: function() {
			if (initialized) {
				return;
			}
		
			var currency1 = document.getElementById('currency1')
			currency1.oninvalid = function(e) {
				e.target.setCustomValidity("");
				if (e.target.validity.valid == false) {
					if (e.target.value.length == 0) {
						e.target.setCustomValidity("A currency amount is required.");
					} else if (isNaN(e.target.value)) {
						e.target.setCustomValidity("Oh no, just numbers please!");
					}
						
				}
			};
			
			var rate = document.getElementById('rate')
			rate.oninvalid = function(e) {
				e.target.setCustomValidity("");
				if (e.target.validity.valid == false) {
					if (e.target.value.length == 0) {
						e.target.setCustomValidity("A conversion is required.");
					} else if (isNaN(e.target.value)) {
						e.target.setCustomValidity("Oh no, just numbers please!");
					}
						
				}
			};
			$(screen).find('form input[type="submit"]').click(
				function(evt) {
					evt.preventDefault();
					if ($(evt.target).parents('form')[0].checkValidity()) {
						var currency = this.serializeForm();
						var html = "<span>" + currency.currency1*currency.rate + "</span>";
						$('#currency2 span').remove();
						$('#currency2').append(html);
					}
				}.bind(this)

			);
			// left if here
			var request = indexedDB.open('convertDB');
			request.onsuccess = function(event) {
				database = request.result;
				this.configureData();
				this.loadContacts();
			}.bind(this);
			request.onupgradeneeded = function(event) {
				database = event.target.result;
				var objectStoreConvert = database.createObjectStore("convert",
					{keyPath: "id", autoIncrement: true });
			}; //just here

			initialized = true;
		},
		
		serializeForm: function() {
			var inputFields = $(screen).find('form :input');
			var result = {};
			$.each(inputFields, function(index, value) {
				if ($(value).attr('name')) {
					result[$(value).attr('name')] = $(value).val();
				}
			});
			return result;
		}
		
	}

	
}