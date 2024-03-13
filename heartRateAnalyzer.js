"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function calculateStatistics(heartRateData) {
    var dailyStats = [];
    // Group heart rate data by date
    var dataByDate = heartRateData.reduce(function (acc, measurement) {
        var date = measurement.timestamps.startTime.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(measurement);
        return acc;
    }, {});
    // Calculate statistics for each day
    for (var date in dataByDate) {
        var measurements = dataByDate[date];
        var beatsPerMinuteArray = measurements.map(function (measurement) { return measurement.beatsPerMinute; });
        beatsPerMinuteArray.sort(function (a, b) { return a - b; });
        var medianIndex = Math.floor(beatsPerMinuteArray.length / 2);
        var median = beatsPerMinuteArray.length % 2 === 0 ?
            (beatsPerMinuteArray[medianIndex - 1] + beatsPerMinuteArray[medianIndex]) / 2 :
            beatsPerMinuteArray[medianIndex];
        var latestDataTimestamp = measurements[measurements.length - 1].timestamps.endTime;
        dailyStats.push({
            date: date,
            min: Math.min.apply(Math, beatsPerMinuteArray),
            max: Math.max.apply(Math, beatsPerMinuteArray),
            median: median,
            latestDataTimestamp: latestDataTimestamp
        });
    }
    return dailyStats;
}
function main() {
    // Read input JSON file
    var inputFilePath = 'heartrate.json';
    var inputData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
    // Calculate statistics
    var dailyStats = calculateStatistics(inputData);
    // Write output JSON file
    var outputFilePath = 'output.json';
    fs.writeFileSync(outputFilePath, JSON.stringify(dailyStats, null, 2));
    console.log('Output file generated:', outputFilePath);
}
main();
