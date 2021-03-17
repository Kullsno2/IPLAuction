$(document).ready(function(){
		let dropdown = $('#Player-dropdown');

		dropdown.empty();

		dropdown.append('<option selected="true" disabled>Choose Player</option>');
		dropdown.prop('selectedIndex', 0);

		const url = './iplPlayersList.json';

		// Populate dropdown with list of provinces
		$.getJSON(url, function (data) {
			// console.log(data);
			var players = Object.keys(data);
			players.sort();
			// console.log(players);
			for (player in players){
				// console.log(players[player]);
				// console.log(data[players[player]]);
				dropdown.append($('<option></option>').attr('value', data[players[player]]).text(players[player]));
			}
		  // $.each(data, function (key, entry) {
		  //   dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
		  // })

		  	for (var player in players){
		  		var optionElement = document.createElement("option");
		  		optionElement.text = data[players[player]];
		  		optionElement.value =  players[player];
		  		document.getElementById("Player-datalist").appendChild(optionElement);
		  	} 
		});

        $.ajax({
	        type: 'GET',
	        url: '/A',
	        success: function(data)
	        {
	            createTable('A',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/B',
	        success: function(data)
	        {
	            createTable('B',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/C',
	        success: function(data)
	        {
	            createTable('C',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/D',
	        success: function(data)
	        {
	            createTable('D',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/E',
	        success: function(data)
	        {
	            createTable('E',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/F',
	        success: function(data)
	        {
	            createTable('F',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/G',
	        success: function(data)
	        {
	            createTable('G',data);
	        }
        });

        $.ajax({
	        type: 'GET',
	        url: '/H',
	        success: function(data)
	        {
	            createTable('H',data);
	        }
        });


	});


	function submit(){
		
		var player_name = document.getElementById('searchBar').value; //Player Name

		if(player_name.length > 0)
			var player_id = document.querySelector('option[value="'+player_name+'"]').label;	//PlayerId

		// var player_id = document.getElementById("Player-dropdown").value;

		// var player_dropdown = document.getElementById("Player-dropdown");
		// var player_name = player_dropdown.options[player_dropdown.selectedIndex].innerHTML;

		var team_name = document.getElementById("Team-dropdown").value;

		var price = document.getElementById("Price").value;

		if(player_name.length == 0 || team_name == "Choose Team" || price == "Enter Price Sold"){
			document.getElementById("missing").innerHTML = "Missing Fields";
			return ;
		}

		console.log("Submitted "+player_name+" "+player_id+" "+team_name+" "+price);

		 var _json = {
			[player_id] : {
				'Pid': player_id,
				'Player_name' : player_name,
				'Team_name' : team_name,
				'Price': price
			}
        };

        console.log(_json);
        $.ajax({
	        type: 'POST',
	        url: '/sold',
	        data : JSON.stringify(_json),
	        dataType: "json",
	        contentType: "application/json"
        });

        location.reload();

	}

	function createTable(id,data){
		var table = document.createElement("table");
        var tbody = document.createElement("tbody");

        var th = document.createElement("th");
        var playerName = document.createTextNode("Player Name");
        th.appendChild(playerName);
        tbody.appendChild(th);

        var th2 = document.createElement("th");
        var price = document.createTextNode("Sold Price");
        th2.appendChild(price);
        tbody.appendChild(th2);

        var price = 0.00;

        for(item in data){
        	var tr = document.createElement("tr");
        	var td1 = document.createElement("td");
        	var td2 = document.createElement("td");
        	var td_name = document.createTextNode(data[item]["Player_name"]);
        	var td_price;
        	if(data[item]["Price"] >= 1) {
        		td_price = document.createTextNode("₹ "+data[item]["Price"]+"C");
        	} else if(data[item]["Price"] < 1) {
        		td_price = document.createTextNode("₹ "+data[item]["Price"]*100+"L");
        	}
        	price += parseFloat(data[item]["Price"]);
        	td1.appendChild(td_name);
        	td2.appendChild(td_price);
        	tr.appendChild(td1);
        	tr.appendChild(td2);
        	tbody.appendChild(tr);
        }
        var remaining = 100.00 - price;
        remaining = remaining.toFixed(2);
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td2 = document.createElement("td");
        var purse = document.createTextNode("Purse Remaining");
      	td.setAttribute("class","purse");
      	var content;
      	if(remaining >= 1) {
      		content = "₹ " + remaining+"C / "+(data.length);
      	} else if(remaining < 1 && remaining > 0) {
      		content = "₹ " + remaining*100+"L / "+(data.length);
      	} else if(remaining == 0) {
      		content = "₹ " + remaining*100+" / "+(data.length);
      	} 

      	if(remaining == parseInt(remaining)) {
      		content = "₹ " + parseInt(remaining)+"C / "+(data.length);
      	}
        var price_remain = document.createTextNode(content);
        td2.setAttribute("class","price");
        td.appendChild(purse);
        td2.appendChild(price_remain);
        tr.appendChild(td);
        tr.appendChild(td2);
        tbody.appendChild(tr);
        
        table.appendChild(tbody);
        document.getElementById(id).appendChild(table);
	}
