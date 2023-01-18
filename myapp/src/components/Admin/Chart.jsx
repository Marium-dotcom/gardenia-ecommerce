import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectOrder } from '../../Redux/features/prevOrderSlice';
import { useSelector } from 'react-redux';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


    const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };


 export const Chart = () =>{

const orders = useSelector(selectOrder);
const arr = [];
orders.map((itm)=> {
  return arr.push(itm.product_status)
})


const getCount = (a, value) => {
  return a.filter((n) => n === value).length;
};

const [status1, status2, status3, status4] = [
  "Order Recieved",
  "Out for delivery",
  "Delivered",
  "Cancelled"
];


const placed = getCount(arr, status1);
const outForDelivery = getCount(arr, status2);
const delivered = getCount(arr, status3);
const cancelled = getCount(arr,status4)



   const data = {
    labels: ["Order Recieved", "Out for delivery", "Delivered", "Cancelled"],
    datasets: [
      {
        label: 'Product Status',
        data:[placed,outForDelivery,delivered,cancelled] ,
        backgroundColor: 'green',
      },

    ],
  };

  return (
    <div className='w-50 m-auto card p-5 '>
      <Bar   options={options} data={data} />
    </div>
  )

  }

