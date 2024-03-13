import * as fs from 'fs';

interface HeartRateMeasurement {
    beatsPerMinute: number;
    timestamps: {
        startTime: string;
        endTime: string;
    };
}

interface DailyHeartRateStats {
    date: string;
    min: number;
    max: number;
    median: number;
    latestDataTimestamp: string;
}

function calculateStatistics(heartRateData: HeartRateMeasurement[]): DailyHeartRateStats[] {
    const dailyStats: DailyHeartRateStats[] = [];

    // Group heart rate data by date
    const dataByDate = heartRateData.reduce((acc, measurement) => {
        const date = measurement.timestamps.startTime.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(measurement);
        return acc;
    }, {} as Record<string, HeartRateMeasurement[]>);

    // Calculate statistics for each day
    for (const date in dataByDate) {
        const measurements = dataByDate[date];
        const beatsPerMinuteArray = measurements.map(measurement => measurement.beatsPerMinute);
        beatsPerMinuteArray.sort((a, b) => a - b);
        const medianIndex = Math.floor(beatsPerMinuteArray.length / 2);
        const median = beatsPerMinuteArray.length % 2 === 0 ?
            (beatsPerMinuteArray[medianIndex - 1] + beatsPerMinuteArray[medianIndex]) / 2 :
            beatsPerMinuteArray[medianIndex];
        const latestDataTimestamp = measurements[measurements.length - 1].timestamps.endTime;

        dailyStats.push({
            date: date,
            min: Math.min(...beatsPerMinuteArray),
            max: Math.max(...beatsPerMinuteArray),
            median: median,
            latestDataTimestamp: latestDataTimestamp
        });
    }

    return dailyStats;
}

function main() {
    // Read input JSON file
    const inputFilePath = 'heartrate.json';
    const inputData: HeartRateMeasurement[] = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

    // Calculate statistics
    const dailyStats = calculateStatistics(inputData);

    // Write output JSON file
    const outputFilePath = 'output.json';
    fs.writeFileSync(outputFilePath, JSON.stringify(dailyStats, null, 2));
    console.log('Output file generated:', outputFilePath);
}

main();