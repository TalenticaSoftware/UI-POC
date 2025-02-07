import React from 'react';
import ReactECharts from 'echarts-for-react';
import EmployeeData from '../json/stackedBarChart.json';

// Function to parse the date in dd/mm/yyyy format
const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // JavaScript months are 0-indexed
};

// Function to format the date in dd/mm/yyyy format
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const StackedBarChart = () => {
  const data = EmployeeData;

  // Transform the data and sort by date
  const transformData = (data: any) => {
    // Step 1: Extract unique dates and sort them in ascending order
    const dates = data
      .map((item: { date: string }) => item.date)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      ) // Get unique dates
      .sort(
        (a: any, b: any) => parseDate(a).getTime() - parseDate(b).getTime()
      ); // Sort by date (getTime returns milliseconds)

    // Step 2: Prepare the series data for the stacked bar chart
    const series = [
      {
        name: 'Worklog Hours',
        type: 'bar',
        stack: 'total',
        barWidth: 30,
        data: dates.map((date: string) => {
          const totalWorklog = data
            .filter((d: any) => d.date === date)
            .reduce((sum: any, item: any) => sum + item.worklog_hours, 0);
          return totalWorklog;
        }),
      },
      {
        name: 'Overtime Hours',
        type: 'bar',
        stack: 'total',
        barWidth: 30,
        data: dates.map((date: string) => {
          const totalOvertime = data
            .filter((d: any) => d.date === date)
            .reduce((sum: any, item: any) => sum + item.overtime_hours, 0);
          return totalOvertime;
        }),
      },
      {
        name: 'Meetings Attended',
        type: 'bar',
        stack: 'total',
        barWidth: 30,
        data: dates.map((date: string) => {
          const meetings = data.filter(
            (d: any) => d.date === date && d.meeting_attended
          ).length;
          return meetings;
        }),
      },
    ];

    return { dates, series };
  };

  const { dates, series } = transformData(data);

  const options = {
    title: {
      text: 'Employee Worklog Breakdown',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Worklog Hours', 'Overtime Hours', 'Meetings Attended'],
      top: 35,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '35%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dates.map((date: string) => formatDate(parseDate(date))), // Display formatted dates on the x-axis
      name: 'Date', // Label for x-axis
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        align: 'center', // Can be "center", "right", or "left"
        verticalAlign: 'top', // Can be "top", "middle", or "bottom"
        fontFamily: 'Montserrat, serif',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours', // Label for y-axis
      nameLocation: 'middle', // Can also be "middle" or "end"
      nameTextStyle: {
        align: 'center', // Can be "center", "right", or "left"
        verticalAlign: 'top', // Can be "top", "middle", or "bottom"
        fontFamily: 'Montserrat, serif',
        fontSize: 14,
        fontWeight: 'bold',
      },
      // Use padding to shift the title
      nameGap: 50, // You can adjust the gap between the axis and title
      padding: [10, 0, 0, 20], // Example padding
      axisLabel: {
        formatter: (value: number) => {
          if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k'; // Format numbers > 999 as "1k", "2.3k", etc.
          }
          return value; // Return the value as it is if it's less than 1000
        },
      },
    },
    series: series,
  };

  return (
    <div style={{ width: '600px' }}>
      <ReactECharts option={options} />
    </div>
  );
};

export default StackedBarChart;
