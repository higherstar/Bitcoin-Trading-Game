import { createChart } from 'lightweight-charts';

export const createLineChart = () => {
	const chart = createChart(document.getElementById('line-chart'), { width: 400, height: 500 });
	const lineSeries = chart.addLineSeries();

	chart.applyOptions({
		priceScale: {
			scaleMargins: {
					top: 0.2,
					bottom: 0.2,
			},
		},
		timeScale: {
			rightOffset: 3,
			barSpacing: 20,
			fixLeftEdge: true,
			lockVisibleTimeRangeOnResize: true,
			// rightBarStaysOnScroll: true,
			borderVisible: false,
			borderColor: '#fff000',
			visible: false,
			timeVisible: false,
			secondsVisible: false,
		},
		crosshair: {
			vertLine: {
					color: '#6A5ACD',
					width: 0.5,
					style: 1,
					visible: false,
					labelVisible: false,
			},
			horzLine: {
					color: '#6A5ACD',
					width: 0.5,
					style: 0,
					visible: false,
					labelVisible: true,
			},
			mode: 1,
		},
		grid: {
			vertLines: {
					color: 'rgba(70, 130, 180, 0.5)',
					style: 1,
					visible: false,
			},
			horzLines: {
					color: 'rgba(70, 130, 180, 0.5)',
					style: 2,
					visible: false,
			},
		},
		layout: {
			backgroundColor: 'transparent',
			textColor: '#696969',
			fontSize: 20,
			fontFamily: 'Calibri',
		},
	});

	lineSeries.applyOptions({
		overlay: true,
		color: '#10abde',
		lineStyle: 0,
		lineWidth: 4,
		crosshairMarkerVisible: true,
		crosshairMarkerRadius: 6,
		lineType: 2,
		priceLineVisible: false,
		priceLineWidth: 4,
		priceLineColor: '#10abde',
		priceLineStyle: 0,
		baseLineVisible: true,
		baseLineColor: '#ff0000',
		baseLineWidth: 3,
		baseLineStyle: 1,
	});

	const priceLine = lineSeries.createPriceLine({
    price: 9370.0,
    color: 'green',
    lineWidth: 2,
    lineStyle: 0,
    axisLabelVisible: true,
	});
	return { chart, lineSeries };
};
