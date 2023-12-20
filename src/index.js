import React from 'react';
import ReactDOM from 'react-dom/client';
import ChartData from "./api/Chart";

window.renderChart = (id, reference, measurementMethod, sex, measurementsArray, midParentalHeightData, theme, chartType, height, width) => {
  const root = ReactDOM.createRoot(document.getElementById(id));
  root.render(
      <ChartData 
        reference={reference} //'uk-who' | 'turner' | 'trisomy-21'
        measurementMethod={measurementMethod} //'height' | 'weight' | 'ofc' | 'bmi'
        sex={sex} //'male' | 'female'
        measurementsArray={measurementsArray} //[Measurement] - straight from api response
        midParentalHeightData={midParentalHeightData} //MidParentalHeightObject
        theme={theme} //'mono' | 'traditional'
        chartType={chartType} //'centile' | 'sds'
        height={height} //number
        width={width} //number - leave blank for default
      />
  );
}