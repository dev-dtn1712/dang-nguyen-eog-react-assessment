const currentTime = new Date().valueOf();

export const QUERY_METRIC = `query {
  getMetrics
}`;

export const QUERY_MULTIPLE_MEASUREMENTS = `
  query($input: [MeasurementQuery] = [
    {metricName: "tubingPressure", after: ${currentTime
      - 1800000}, before: ${currentTime}},
    {metricName: "casingPressure", after: ${currentTime
      - 1800000}, before: ${currentTime}},
    {metricName: "oilTemp", after: ${currentTime
      - 1800000}, before: ${currentTime}},
    {metricName: "flareTemp", after: ${currentTime
      - 1800000}, before: ${currentTime}},
    {metricName: "waterTemp", after: ${currentTime
      - 1800000}, before: ${currentTime}},
    {metricName: "injValveOpen", after: ${currentTime
      - 1800000}, before: ${currentTime}}
  ]
  ){
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
      at
      value
      metric
      unit
      }
    }
  }`;
