function convertScreen(mainID) {
	const screen = mainID;
	let initialized = false;
	
	return {
		
		init: function() {
			if (initialized) {
				return;
			}
		
			const currency1 = document.getElementById('currency1')
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
			
			const rate = document.getElementById('rate')
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
						const currency = this.serializeForm();
						const html = "<span>" + currency.currency1*currency.rate + "</span>";
						$('#currency2 span').remove();
						$('#currency2').append(html);
					}
				}.bind(this)

			);
			/* left if here
			const request = indexedDB.open('convertDB');
			request.onsuccess = function(event) {
				database = request.result;
				this.configureData();
				this.loadContacts();
			}.bind(this);
			request.onupgradeneeded = function(event) {
				database = event.target.result;
				var objectStoreConvert = database.createObjectStore("convert",
					{keyPath: "id", autoIncrement: true });
			};*/ //just here

			initialized = true;
		},
		
		serializeForm: function() {
			const inputFields = $(screen).find('form :input');
			let result = {};
			$.each(inputFields, function(index, value) {
				if ($(value).attr('name')) {
					result[$(value).attr('name')] = $(value).val();
				}
			});
			return result;
		}
		
	}

	
}