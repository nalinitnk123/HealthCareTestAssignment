# HealthCareTestAssignment
1. Install Node.js: 
   - Visit the [official Node.js website](https://nodejs.org/) and download the appropriate installer for your operating system.
   - Follow the installation instructions provided on the website for your specific platform.

2. Install TypeScript globally:
   
   npm install -g typescript
   

3. Navigate to the directory containing your TypeScript file in your terminal.

4. Compile the TypeScript file using the TypeScript compiler:
   
   tsc heartRateAnalyzer.ts
   

5. This will generate a JavaScript file with the same name as your TypeScript file (e.g., your_file.js).

6. Run the JavaScript file using Node.js:
   
   node heartRateAnalyzer.ts.js
   

These steps will install Node.js, TypeScript, compile your TypeScript code into JavaScript, and then execute it using Node.js.

Code Explanation:

1. Importing the fs module: 
   - It imports the fs module, which provides an API for interacting with the file system.

2. Defining Interfaces:
   - HeartRateMeasurement: Defines the structure of heart rate measurement data, containing the number of beats per minute (beatsPerMinute) and timestamps indicating the start and end times of the measurement.
   - DailyHeartRateStats: Defines the structure for daily heart rate statistics, including the date, minimum, maximum, median heart rate, and the timestamp of the latest data point.

3. calculateStatistics Function:
   - This function takes an array of HeartRateMeasurement objects as input and calculates daily statistics based on the heart rate data.
   - It first groups the heart rate data by date.
   - Then, for each date, it calculates the minimum, maximum, and median heart rates from the measurements.
   - Finally, it constructs an array of DailyHeartRateStats objects containing the calculated statistics.

4. main Function:
   - This function serves as the entry point of the program.
   - It reads input data from a JSON file named 'heartrate.json' using the fs.readFileSync method.
   - It then calls the calculateStatistics function to process the input data and obtain daily statistics.
   - After obtaining the statistics, it writes the results to an output JSON file named 'output.json' using the fs.writeFileSync method.
   - It also logs a message indicating the successful generation of the output file.

5. Execution:
   - The main function is called at the end of the script, triggering the execution of the entire program.