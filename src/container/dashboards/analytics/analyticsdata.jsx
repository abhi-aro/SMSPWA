
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line, Bar, Doughnut,} from 'react-chartjs-2';
import { useSchoolId } from '../../../components/common/context/idContext';
Chart.register(...registerables, ArcElement, Tooltip, Legend);

//  LineChart
Chart.defaults.borderColor = "rgba(142, 156, 173,0.1)", Chart.defaults.color = "#8c9097";
const Option1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  cutout: 90,
};

const aggregateData = (examData) => {
  const aggregated = examData.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = { totalPassed: 0, totalFailed: 0, totalAppeared: 0 };
    }
    acc[item.month].totalPassed += item.totalPassedStudent;
    acc[item.month].totalFailed += item.totalFailedStudent;
    acc[item.month].totalAppeared += item.totalAppearedStudent;
    return acc;
  }, {});

  return {
    labels: Object.keys(aggregated),
    datasets: [
      {
        label: 'Total Passed Students',
        backgroundColor: 'rgba(132, 90, 223, 0.5)',
        borderColor: 'rgb(132, 90, 223)',
        data: Object.values(aggregated).map(item => item.totalPassed),
      },
      {
        label: 'Total Failed Students',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        data: Object.values(aggregated).map(item => item.totalFailed),
      },
      {
        label: 'Total Appeared Students',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        data: Object.values(aggregated).map(item => item.totalAppeared),
      }
    ]
  };
};

const Data1 = (examData) => {
  const { labels, datasets } = aggregateData(examData);
  return { labels, datasets };
};

export function Chartjsline() {
  const {id: schoolId} = useSchoolId();

  const [examData, setExamData] = useState([]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/DashBoard/GetDashboardExamResultGraph/${schoolId}`);
        const data = await response.json();
        setExamData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchExamData();
  }, [schoolId]);

  // if (!examData.length) {
  //   return <div>Loading...</div>;
  // }

  return <Line options={Option1} data={Data1(examData)} height={300} />;
}


//  Barchart
const Option2 = {

  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
       position:'bottom'
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};


export function Chartjsbar() {
  const {id: schoolId} = useSchoolId();
  
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sickness',
        data: [],
        backgroundColor: 'rgba(132, 90, 223, 0.2)',
        borderColor: 'rgb(132, 90, 223)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/DashBoard/GetDashboardSickStudentGraph/1`);
        console.log('API Response:', response.data); // Log the response

        const apiData = response.data;

        const labels = apiData.map(item => `${item.month} ${item.year}`);
        const values = apiData.map(item => parseInt(item.totalSickStudent, 10) || 0); // Handle non-integer values

        setData({
          labels: labels,
          datasets: [{
            label: 'Sickness',
            data: values,
            backgroundColor: 'rgba(132, 90, 223, 0.2)',
            borderColor: 'rgb(132, 90, 223)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <Bar options={Option2} data={data} height='300px' />;
}


//donut
const Option4 = {

  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
       position:'bottom'
    },
  },
};

const Data4 = (studentData) => ({
  type: 'donut',
  labels: ['Total Student', 'Present', 'Absent'],
  datasets: [{
    label: 'Student',
    // data: [studentData.totalStudent, studentData.presentCount, studentData.absentCount],
    data: ['100', '80', '15'],
    backgroundColor: [
      'rgb(132, 90, 223)',
      'rgb(35, 183, 229)',
      'rgb(255, 99, 132)', // Updated to a valid color
    ],
    hoverOffset: 1,
  }],
});

export function Chartjsdonut() {

  const [studentData, setStudentData] = useState(null);
  const {id: schoolId} = useSchoolId();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/DashBoard/GetSttudentAttendanceGraph/${schoolId}`); // Replace with your API URL
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [schoolId]);

  // Show a loading state while data is being fetched
  if (!studentData) {
    return <div>Loading...</div>;
  }
  

  return <Doughnut options={Option4} data={Data4(studentData)} height='300px' />;
}
//donut
const OptionStaff = {

  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
       position:'bottom'
    },
  },
};

const Data5 = (staffData) => ({
  type: 'donut',
  labels: ['Total Staff', 'Present', 'Absent'],
  datasets: [{
    label: 'Staff',
    // data: [staffData.totalStudent, staffData.presentCount, staffData.absentCount],
    data: ['100', '80', '15'],
    backgroundColor: [
      'rgb(132, 90, 223)',
      'rgb(35, 183, 229)',
      'rgb(255, 99, 132)', // Updated to a valid color
    ],
    hoverOffset: 1,
  }],
});

export function Chartjsdonut1() {

  const [staffData, setStaffData] = useState(null);
  const {id: schoolId} = useSchoolId();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/DashBoard/GetSttudentAttendanceGraph/${schoolId}`); // Replace with your API URL
        const data = await response.json();
        setStaffData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStaffData();
  }, [schoolId]);

  // Show a loading state while data is being fetched
  if (!staffData) {
    return <div>Loading...</div>;
  }
  

  return <Doughnut options={OptionStaff} data={Data5(staffData)} height='300px' />;
}


// line chart expense
const optionExpense = {

  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
       position:'bottom'
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export function ChartjsbarExpense() {
  const {id: schoolId} = useSchoolId();

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Amount',
        data: [],
        backgroundColor: 'rgba(132, 90, 223, 0.2)',
        borderColor: 'rgb(132, 90, 223)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/DashBoard/GetDashboardExpenseGraph/${schoolId}`); // Replace with your API URL
        const apiData = response.data;

        // Aggregate amounts by month
        const aggregatedData = apiData.reduce((acc, curr) => {
          const { month, totalAmount } = curr;
          acc[month] = (acc[month] || 0) + totalAmount;
          return acc;
        }, {});

        const labels = Object.keys(aggregatedData);
        const values = Object.values(aggregatedData);

        setData({
          labels: labels,
          datasets: [{
            label: 'Total Amount',
            data: values,
            backgroundColor: 'rgba(132, 90, 223, 0.2)',
            borderColor: 'rgb(132, 90, 223)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [schoolId]);

  return <Bar options={optionExpense} data={data} height='300px' />;
}
