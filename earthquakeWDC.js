(function () {

	var a = new URLSearchParams(window.location.search);
	var token = a.get("token");
	debugger;
	if (token) {

		alert("Token Found");
	
		//Make call and dance. !!
		var myConnector = tableau.makeConnector();

		myConnector.getSchema = function (schemaCallback) {
			var cols = [{
				id: "id",
				dataType: tableau.dataTypeEnum.string
			}, {
				id: "name",
				alias: "Name",
				dataType: tableau.dataTypeEnum.string
			}, {
				id: "age",
				alias: "Age",
				dataType: tableau.dataTypeEnum.int
			}];

			var tableSchema = {
				id: "earthquakeFeed",
				alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
				columns: cols
			};

			schemaCallback([tableSchema]);
		};

		myConnector.getData = function (table, doneCallback) {
			$.getJSON("https://tab-test1.free.beeceptor.com/sample-data", function (resp) {
				var tableData = [];

				// Iterate over the JSON object
				for (var i = 0, len = resp.length; i < len; i++) {
					tableData.push({
						"id": resp[i].id,
						"name": resp[i].name,
						"age": resp[i].age

					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		};


		tableau.registerConnector(myConnector);

	} else {
		window.location.replace("https://abstract-gong360.develgs.com/v1/mob/signin");
		// $(document).ready(function () {
		// 	$("#submitButton").click(function () {
		// 		tableau.connectionName = "USGS Earthquake Feed";
		// 		tableau.submit();
		// 	});
		// });
	}








	

})();