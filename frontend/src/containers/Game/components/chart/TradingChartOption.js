import { LineStyle } from 'lightweight-charts';

const axisColor = '#4C525A';

const candleChartOptions = {
  layout: {
    backgroundColor: '#00152C',
    textColor: 'rgba(255, 255, 255, 0.3)',
  },
  grid: {
    vertLines: {
      color: 'rgba(197, 203, 206, 0)',
      style: LineStyle.Dotted,
    },
    horzLines: {
      color: 'rgba(197, 203, 206, 0.2)',
      style: LineStyle.Dotted,
    },
  },
  crosshair: {
    mode: 0,
    labelVisible: true,
    vertLine: {
      visible: false,
    },
    // horzLine: {
    //   width: 0.5,
    //   style: 2,
    //   visible: true,
    //   labelVisible: true,
    // },
  },
  priceScale: {
    borderColor: 'rgba(197, 203, 206, 0.3)',
    position: 'right',
    autoScale: true,
    mode: 0, // 1,2,3
  },
  timeScale: {
    borderColor: 'rgba(197, 203, 206, 0.3)',
    rightOffset: 1,
    barSpacing: 5,
    fixLeftEdge: false,
    lockVisibleTimeRangeOnResize: false,
    rightBarStaysOnScroll: true,
    borderVisible: true,
    visible: false,
    timeVisible: false,
    secondsVisible: false,
  },
  localization: {
    priceFormatter(price) {
      return price.toFixed(10 - Math.floor(price).toString().length);
    },
  },
  handleScroll: {
    mouseWheel: false,
    pressedMouseMove: true,
  },
  handleScale: {
    axisPressedMouseMove: false,
    mouseWheel: true,
    pinch: true,
  },
};

const volumeChartOptions = {
  width: 500,
  height: 400,
  layout: {
    backgroundColor: '#00152C',
    textColor: 'rgba(255, 255, 255, 0.3)',
  },
  grid: {
    vertLines: {
      color: 'rgba(197, 203, 206, 0)',
    },
    horzLines: {
      color: 'rgba(197, 203, 206, 0.1)',
    },
  },
  crosshair: {
    mode: 0,
    labelVisible: true,
    vertLine: {
      visible: false,
    },
  },
  priceScale: {
    borderColor: 'rgba(197, 203, 206, 0.3)',
  },
  timeScale: {
    borderColor: 'rgba(197, 203, 206, 0.3)',
    rightOffset: 1,
    barSpacing: 5,
    fixLeftEdge: false,
    lockVisibleTimeRangeOnResize: false,
    rightBarStaysOnScroll: true,
    borderVisible: true,
    visible: true,
    timeVisible: true,
    secondsVisible: false,
  },
  localization: {
    priceFormatter(price) {
      return price.toFixed(10 - Math.floor(price).toString().length);
    },
  },
};

const depthChartOptions = {
  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
  chart: {
    zoomType: 'xy',
    backgroundColor: '#00152C',
    borderColor: '#00152C',
    borderWidth: 1,
    type: 'area',
  },
  title: {
    text: 'ETH-BTC Market Depth',
    style: {
      color: '#ffffff',
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  subtitle: {
    style: {
      color: '#c2c2c2',
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  legend: {
    enabled: false,
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: 'black',
    },
    itemHoverStyle: {
      color: 'gray',
    },
  },
  xAxis: {
    lineColor: axisColor,
    lineWidth: 1,
    tickColor: axisColor,
    minPadding: 0,
    maxPadding: 0,
    plotLines: [
      {
        color: '#4C525A',
        value: 0.1523,
        width: 1,
        label: {
          text: 'Actual price',
          style: {
            color: '#4C525A',
            fontWeight: 'bold',
          },
          rotation: 90,
        },
      },
    ],
    title: {
      text: 'Price',
    },
  },
  yAxis: {
    gridLineDashStyle: 'dot',
    gridLineColor: 'rgb(41,49,58,1)',
    lineColor: axisColor,
    lineWidth: 1,
    tickColor: axisColor,
  },
  plotOptions: {
    area: {
      fillOpacity: 0.2,
      lineWidth: 1,
      step: 'center',
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
    valueDecimals: 2,
  },
};

export { candleChartOptions, volumeChartOptions, depthChartOptions };
