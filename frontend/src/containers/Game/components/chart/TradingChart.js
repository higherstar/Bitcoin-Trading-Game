import { createChart } from 'lightweight-charts';

export const createLineChart = () => {
	const chart = createChart(document.getElementById('line-chart'), { width: 400, height: 500 });
	const lineSeries = chart.addLineSeries();
	lineSeries.applyOptions({
		color: '#aa8fb1',
		lineStyle: 0,
		lineWidth: 2,
		crosshairMarkerVisible: true,
		crosshairMarkerRadius: 6,
		lineType: 2,
		priceLineVisible: false,
		priceLineWidth: 1,
		priceLineColor: '#4682B4',
		priceLineStyle: 1,
		baseLineVisible: true,
		baseLineColor: '#ff0000',
		baseLineWidth: 3,
		baseLineStyle: 1,
		priceFormat: {
			type: 'custom',
			minMove: 0.02,
			formatter: function(price) {
					return '$' + price.toFixed(2);
			},
		},
		crosshair: {
			vertLine: {
					color: '#6A5ACD',
					width: 0.5,
					style: 1,
					visible: true,
					labelVisible: false,
			},
			horzLine: {
					color: '#6A5ACD',
					width: 0.5,
					style: 0,
					visible: true,
					labelVisible: true,
			},
			mode: 1,
		},
		grid: {
			vertLines: {
					color: 'rgba(70, 130, 180, 0.5)',
					style: 1,
					visible: true,
			},
			horzLines: {
					color: 'rgba(70, 130, 180, 0.5)',
					style: 2,
					visible: true,
			},
		},
		layout: {
			backgroundColor: '#FAEBD7',
			textColor: '#696969',
			fontSize: 20,
			fontFamily: 'Calibri',
		},
	});
	return { chart, lineSeries };
};
