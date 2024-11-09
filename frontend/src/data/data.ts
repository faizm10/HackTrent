import { ChartOptions } from 'chart.js';

export const labels = ['January', 'February', 'March', 'April', 'May'];

export const energyData = [300, 280, 320, 310, 295];
export const waterData = [120, 110, 130, 125, 118];
export const paperData = [40, 35, 45, 42, 37];

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Resource Usage Over Time',
    },
  },
};
