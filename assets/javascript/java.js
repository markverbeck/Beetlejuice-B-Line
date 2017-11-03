 var config = {
    apiKey: "AIzaSyDdYBeSTwKGWeWUaa63xYUjCzjVEqgOg2g",
    authDomain: "train-sc.firebaseapp.com",
    databaseURL: "https://train-sc.firebaseio.com",
    projectId: "train-sc",
    storageBucket: "",
    messagingSenderId: "523894726560"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime;
  var frequency;
  var time;
  
  
 


		
$(document).ready(function(){

	

	var convert = function (input) {
    return moment(input, 'HH:mm:ss').format('h:mm:ss A');
	}




    

	$("#submitButton").on("click", function(){
		
		event.preventDefault();
		trainName = $("#trainName").val().trim();
		destination = $("#destination").val().trim();
		trainTime = parseInt($("#trainTime").val().trim());
		frequency = parseInt($("#frequency").val().trim());

		database.ref().push({
			trainName: trainName,
			destination: destination,
			trainTime: parseInt(trainTime),
			frequency: parseInt(frequency)
		});
		$("#trainName").val("");
		$("#destination").val("");
		$("#trainTime").val("");
		$("#frequency").val("");
		
	});

	 database.ref().on("value", function(snapshot){
		
		var tInfo = snapshot.val();
		var key = Object.keys(tInfo);
		// console.log(key);
		$("#tableBody").empty();

		for (var i = 0; i < key.length; i++) {
			var k = key[i];
			var dest = tInfo[k].destination;
			var freq = tInfo[k].frequency;
			var tName = tInfo[k].trainName;
			var tTime = tInfo[k].trainTime;
			var startTime = convert(tTime);
			var currentTime = moment().format("LT");
			var a = moment(startTime, "h:mm:ss A");
			var b = moment(currentTime, "LT");
			var timeDifference = b.diff(a, "minutes");
			var cycles = Math.floor(timeDifference / freq);
			var timeElapsed = cycles * freq;
			var cycleTimeDifferene = timeDifference - timeElapsed;
		 	time = freq - cycleTimeDifferene;

			console.log(timeDifference, cycles, timeElapsed, cycleTimeDifferene);
			
			var tr = $("<tr>");
			var td = $("<td>");
			var td1 = $("<td>");
			var td2 = $("<td>");
			var td3 = $("<td>");
			td3.addClass("timer" + i);
			var td4 = $("<td>");
			td4.addClass("countDown" + i);
			td4.html(time);
			td.html(tName);
			tr.append(td);
			td1.html(dest);
			tr.append(td1);
			td2.html(freq);
			tr.append(td2);
			

			var timeChange = function(){
				 if(timeDifference === timeElapsed){
					td3.text(moment().add(freq, "minutes").format("LT"));
					tr.append(td3);
				}else{
					td3.text(moment().subtract(cycleTimeDifferene, "minutes").add(freq, "minutes").format("LT"));
					tr.append(td3);
				};
			};
				timeChange();
				tr.append(td4);
				$("#tableBody").append(tr);



		}
		var change = function(){
				for (var i = 0; i < key.length; i++) {
					var k = key[i];
					var dest = tInfo[k].destination;
					var freq = tInfo[k].frequency;
					var tName = tInfo[k].trainName;
					var tTime = tInfo[k].trainTime;
					var startTime = convert(tTime);
					var currentTime = moment().format("LT");
					var a = moment(startTime, "h:mm:ss A");
					var b = moment(currentTime, "LT");
					var timeDifference = b.diff(a, "minutes");
					var cycles = Math.floor(timeDifference / freq);
					var timeElapsed = cycles * freq;
					var cycleTimeDifferene = timeDifference - timeElapsed;
					var timer = $("timer" + i).text();
					var times = $(".timer" + i);
				 	time = freq - cycleTimeDifferene;
				 	$(".countDown" + i).html(time);
					console.log(timeDifference, cycles, timeElapsed, cycleTimeDifferene);
				
					times.text(moment().subtract(cycleTimeDifferene, "minutes").add(freq, "minutes").format("LT"));
					
				
					 	
					 }
					
		}
		
		setInterval(change, 60000);
	
		
		


		
	}, function(errorObject){
  console.log("error: " + errorObject.code);
 });





	database.ref().on("child_added", function(snapshot){
		
		// var tInfo = snapshot.val();
		// var key = Object.keys(tInfo);
		// // console.log(key);
		// for (var i = 0; i < key.length; i++) {
		// 	var k = key[i];
		// 	var dest = tInfo[k].destination;
		// 	var freq = tInfo[k].frequency;
		// 	var tName = tInfo[k].trainName;
		// 	var tTime = tInfo[k].trainTime;
		// 	console.log(dest, freq, tName, tTime);

		// }
		
		
		
		

		
	});
});