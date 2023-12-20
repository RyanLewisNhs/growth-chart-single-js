import { RCPCHChart } from "@rcpch/digital-growth-charts-react-component-library";

import { addToClipboard } from "../functions/addToClipboard";
import { canvasFromSVG } from "../functions/canvasFromSVG";

import RCPCHThemeMonochrome from "../components/chartThemes/rcpchThemeMonochrome";
import RCPCHThemeTraditionalBoy from "../components/chartThemes/RCPCHThemeTraditionalBoy";
import RCPCHThemeTraditionalGirl from "../components/chartThemes/RCPCHThemeTraditionalGirl";

function ChartData(props) {
  const titles = setTitle(props);
  const theme = setTheme(props);

  return (
    <div id="RCPCH-Chart">
      <RCPCHChart
        reference={props.reference}
        measurementMethod={props.measurementMethod}
        sex={props.sex}
        title={titles.title}
        subtitle={titles.subtitle}
        measurementsArray={props.measurementsArray} // this is the plottable child data
        midParentalHeightData={props.midParentalHeightData}
        chartStyle={theme.chart}
        measurementStyle={theme.measurements}
        centileStyle={theme.centiles}
        sdsStyle={theme?.sds}
        gridlineStyle={theme.gridlines}
        axisStyle={theme.axes}
        enableZoom={true}
        chartType={props.chartType}
        enableExport={true}
        exportChartCallback={exportChartCallback}
        clinicianFocus={props.clinicianFocus}
      />
    </div>
  );
}

function exportChartCallback(svg) {
  canvasFromSVG(svg).then((result) => {
    addToClipboard(result);
  });
}

function setTitle(props) {
  // set the title of the chart
  let title = "";
  let subTitle = "";
  if (props.reference === "uk-who") {
    title = "UK-WHO";
  } else if (props.reference === "turner") {
    title = "Turner's Syndrome";
  } else if (props.reference === "trisomy-21") {
    title = "Trisomy 21 (Down's Syndrome)";
  }

  let sexText = "";
  let measurementText = "";
  if (props.sex === "male") {
    sexText = "Boys";
  } else {
    sexText = "Girls";
  }

  switch (props.measurementMethod) {
    case "height":
      measurementText = "Height / Length";
      break;
    case "weight":
      measurementText = "Weight";
      break;
    case "bmi":
      measurementText = "Body Mass Index";
      break;
    case "ofc":
      measurementText = "Head Circumference";
      break;
    default:
      measurementText = "";
      break;
  }

  subTitle = measurementText + " - " + sexText;

  return { subtitle: subTitle, title: title };
}

function setTheme(props) {
  // set the theme of the chart
  let theme = RCPCHThemeMonochrome;

  if (props.theme === 'traditional') {
    if (props.sex === 'male') {
      theme = RCPCHThemeTraditionalBoy;
    } else {
      theme = RCPCHThemeTraditionalGirl
    }
  }

  theme.chart.height = props.height;
  theme.chart.width = props.width;
  return theme;
}

export default ChartData;
