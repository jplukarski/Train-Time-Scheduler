var database = firebase.database();
database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();
    var tFrequency = data.frequency;
    var firstTime = data.firstTrain;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("table").append(
        `<tr>
        <td>${data.trainName}</td>
        <td>${data.destination}</td>
        <td>${data.frequency}</td>
        <td>${moment(nextTrain).format("hh:mm")}</td>
        <td>${tMinutesTillTrain}</td>
    <tr>`
    )
});

$("#submitButton").on("click", function () {
    event.preventDefault();
    var trainName = $("#train-input").val();
    var destination = $("#destination-input").val();
    var frequency = $("#frequency").val();
    var firstTrain = $("#first-train-time").val();
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency").val();
    $("#first-train-time").val();

    database.ref().push({
        trainName,
        destination,
        frequency,
        firstTrain,
    });
});