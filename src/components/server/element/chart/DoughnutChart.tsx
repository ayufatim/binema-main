import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { SafePayment } from '@/utils/types/safeData';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ payment }: { payment: SafePayment[] }) {
  const data = useMemo(() => {
    const packageCountMap = payment.reduce((acc, p) => {
      if (acc[p.packageName]) {
        acc[p.packageName] += 1;
      } else {
        acc[p.packageName] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(packageCountMap);
    const values = Object.values(packageCountMap);
    const backgroundColors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
    ];
    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ];

    return {
      labels,
      datasets: [
        {
          label: 'Package Count',
          data: values,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderColor: borderColors.slice(0, labels.length),
          borderWidth: 1,
        },
      ],
    };
  }, [payment]);

  return (
    <>
      <div className='flex bg-gray-900 px-20 py-5 rounded-[20px]'>
        <Doughnut data={data} />
      </div>
    </>
  )
}
