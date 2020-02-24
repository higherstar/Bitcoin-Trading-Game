import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  xaxisLable: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Segoe UI',
  },
}));

const CustomLineChart = (props) => {
  const { chartProps, playerTokens } = props;
  const { range, graphData } = chartProps;
  const { prices, lastPrice} = graphData;
  const settings = {
    series: [{
      data: prices
    }],
    options: {
      chart: {
        id: 'chart2',
        type: 'line',
        height: 800,
        offsetY: 100,
        offsetX: 0,
        toolbar: {
          autoSelected: 'pan',
          show: false
        },
        animations: {
          enabled: false,
            easing: 'linear',
            dynamicAnimation: {
              speed: 500
            }
        },
        event: {
          click: function(event, chartContext, config) {
            console.log('venus---->click')
          }
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: [ '#FDD835'],
          shadeIntensity: 10,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
      annotations: {
        yaxis: [{
          y: lastPrice,
          offsetY: -10,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
              fontSize: 14
            },
            text: String(lastPrice.toFixed(3)),
          }
        }],
        points: playerTokens,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        show: false,
        padding: {
          right: 30,
          left: 20
        }
      },
      labels: graphData.dates,
      xaxis: {
        type: 'datetime',
        range: range,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        }
      },
      yaxis: {

        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Chart
      type="line"
      width="100%"
      height="90%"
      options={settings.options}
      series={settings.series}
    />
  );
};

CustomLineChart.propTypes = {
  name: PropTypes.string,
  chartProps: PropTypes.object.isRequired,
  playerTokens: PropTypes.array.isRequired
};

CustomLineChart.defaultProps = {
  name: 'No Name',
};

export default CustomLineChart;
