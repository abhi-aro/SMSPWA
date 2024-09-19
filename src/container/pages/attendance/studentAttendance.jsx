import React, { useEffect, useState } from 'react'
import { singleselect } from '../../forms/formelements/formselect/formselectdata'
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loader/loader';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
const getFormattedToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
};
const StudentAttendance = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [spinner, setSpinner] = useState(false)

    const [classFilter, setClassFilter] = useState(null);
    const [classOptions, setClassOptions] = useState([]);

    const [sectionFilter, setSectionFilter] = useState(null);
    const [sectionOptions, setSectionOptions] = useState(null);

    const [isEditingIndex, setIsEditingIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const formattedToday = getFormattedToday();
    
    const [healthStudName, setHealthStudName] = useState([]);
    const [healthClassName, setHealthClassName] = useState([]);

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        const fetchStudentAndClass = async () => {
            setSpinner(true)
          try {
            const studentAttendanceRes = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/StudentAttendance/GetStudentattendanceBySearchFilter')
            const studentAttendanceData = studentAttendanceRes.data
            
            const studentRes = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Students');
            const studentData = studentRes.data;

            const sectionsList = [...new Set(studentData.map(student => student.section))];
            const sectionData = sectionsList.map(section => ({
                id: section,
                value: section,
                label: section
            }))

            const classRes = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Class')
            const classNameData = classRes.data

            const studentClassIDs = studentAttendanceData.map(attendance => {
                const student = studentData.find(student => student.id === attendance.studentID);
                return student ? student.classID : null;
            }).filter(Boolean); // Remove null values
            
            // Filter classData based on the classID from students
            const filteredClassData = classNameData
                .filter(classDataItem => studentClassIDs.includes(classDataItem.id))
                .map(classDataItem => ({
                    id: classDataItem.id,
                    value: classDataItem.id,
                    label: classDataItem.className
                }));
            
            setData(studentAttendanceData)
            setClassOptions(filteredClassData);
            setSectionOptions(sectionData)
            setSpinner(false)

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchStudentAndClass();
    }, []);

    
    const handleEdit = (index) => {
        setIsEditingIndex(index);
        setEditedData(data[index]);
    };

    const handleSave = (index) => {
            // Ensure inTime and outTime are in the correct format (hh:mm:ss)
    const formattedInTime = editedData.inTime.length === 5 ? `${editedData.inTime}:00` : editedData.inTime;
    const formattedOutTime = editedData.outTime.length === 5 ? `${editedData.outTime}:00` : editedData.outTime;

        axios.put(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/StudentAttendance/${editedData.id}`, {
            ...editedData,
            inTime: formattedInTime,
            outTime: formattedOutTime,
            attendanceDate: formattedToday
        })
            .then((res) => {
                if(res.status === 200 || res.status === 204){
                axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/StudentAttendance')
                setIsEditingIndex(null);
                toast.success('Data updated successfully');
                }
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        setIsEditingIndex(null);
    };

    const handleChange = (e, field) => {
        setEditedData({
            ...editedData,
            [field]: e.target.value,
        });
    };

    const getStatus = (inTime, outTime) => {
        return ((inTime === "00:00:00" || inTime === "00:00") && (outTime === "00:00:00" || outTime === "00:00")) ? 'Absent' : 'Present';
    };

    
    const getStudentName = async () => {
        try {
            const studentsRes = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Students');
            const studentsData = studentsRes.data;
            const classRes = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Class')
            const classNameData = classRes.data
            // Assuming studentsData is an array of students
            setHealthStudName(studentsData);
            setHealthClassName(classNameData)

            const classIDs = [...new Set(studentsData.map(student => student.classID))];
         
         
          
            console.log(studentsData, "StudentNAMein helath", classRes);
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
    }
    useEffect(() => {
        getStudentName();
    }, []);

    const handleFilter = async () => {
        let params = [];

        if(startDate) {
            params.push(`AttendanceDate=${formatDate(startDate)}`)
        }
    
        if (classFilter) {
            params.push(`classId=${classFilter.value}`);
        }

        if (sectionFilter) {
            params.push(`sectionId=${sectionFilter.value}`)
        }
    
        if (params.length === 0) {
            toast.error("Choose a Filter");
            return;
        }
    
        const queryString = params.join("&");
        const url = `https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/StudentAttendance/GetStudentattendanceBySearchFilter?${queryString}`;
    
        try {
            const result = await axios.get(url);
            const filterData = result.data;
    
            if (!filterData?.length) {
                toast.error("No data found");
            }
    
            setData(filterData);
        } catch (error) {
            toast.error("An error occurred while fetching data");
            console.error("Error fetching data:", error);
        }
    }


    return (
        <div>
            <h4 className='pt-4 borderBottom'>Student Attendance </h4>
            <div className="studentatt-flex-container pb-4 pt-2">
                <div className='flex justify-between'>
                    <div className="flex-container-wrapper">
                        <div className='flex flex-row items-center'>
                            {/* <div className='backButton'>
                                <Link to={`${import.meta.env.BASE_URL}pages/staff/staffDetails`}>

                                    <button type="button" className="ti-btn ti-btn-info-full ti-btn-wave">Back</button>
                                </Link>
                            </div> */}

                            <div className="breadcrumbs !border-0 ">
                                <ol className="flex items-center whitespace-nowrap min-w-0">
                                    <li className="text-sm">
                                        <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}dashboard`}>
                                            Dashboard
                                            <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-black-300 dark:text-white/10 rtl:rotate-180"
                                                width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </Link>
                                    </li>

                                    <li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
                                        Student Attendance
                                    </li>
                                </ol>
                            </div>

                        </div>


                    </div>
                    {/*  */}
                </div>


            </div>

            <div className='create-stud-table'>
                <div className='box p-4'>
                    <h4>Student Attendance List</h4>
                    <div className='common-attend-filter-list pt-4'>
                        <div className='grid grid-cols-12 sm:gap-6 '>
                            <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                {/* <label htmlFor="input-datetime-local" className="form-label">Attendance Date*</label> */}
                                {/* <input type="datetime-local" className="form-control" id="input-datetime-local" /> */}
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                    <DatePicker placeholderText="Choose date" className="ti-form-input  focus:z-10" showIcon dateFormat="dd/MM/yyyy"
                                                        showMonthDropdown="true"
                                                        showYearDropdown="true"  selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                            </div>

                            <div className="xl:col-span-2 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                {/* <label className="form-label">Department</label> */}
                                <Select  placeholder='Select Class' className="!p-0 place-holder" classNamePrefix='react-select' value={classFilter} options={classOptions} onChange={(option) => setClassFilter(option)} />
                            </div>

                            <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <Select  placeholder='Select Section' className="!p-0 place-holder" classNamePrefix='react-select' value={sectionFilter} options={sectionOptions} onChange={(option) => setSectionFilter(option)} />
                            </div>
                            <div className="xl:col-span-2 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <button type="button" className="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave" onClick={handleFilter}>Filter</button>
                            </div>
                            <div className="xl:col-span-2 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <button type="button" className="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave">Mark All Present</button>
                            </div>
                        </div>
                    </div>
                    {/* Top section end */}
                    {/* Table section start */}
                    <div className="student-table-details pt-4">
                        <div className="table-responsive">
                            <table className="table whitespace-nowrap table-bordered table-sm min-w-full">
                                <thead><tr className="border-b  border-defaultborder">
                                    <th scope="col" className="text-start">#</th>
                                    {/* <th scope="col" className="text-start">Student ID</th> */}
                                    <th scope="col" className="text-start"> Name</th>
                                    <th scope="col" className="text-start">Class</th>
                                    <th scope="col" className="text-start">In Time</th>
                                    <th scope="col" className="text-start">Out Time</th>
                                    <th scope="col" className="text-start">Status</th>
                                    <th scope="col" className="text-start">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                        spinner ? <Loader /> :
                                            data.map((dt, index) => {
                                                const isEditing = index === isEditingIndex;
                                                const status = getStatus(isEditing ? editedData.inTime : dt.inTime, isEditing ? editedData.outTime : dt.outTime);

                                                return (
                                                    <tr className="border-b border-defaultborder" key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{dt.fullName}</td>
                                                        <td>{Array.isArray(healthClassName) && healthClassName.filter(staff => staff.id === dt.studentID)[0]?.className || 'Unknown'}- {Array.isArray(healthStudName) && healthStudName.filter(staff => staff.id === dt.id)[0]?.section || 'Unknown'}</td>
                                                        <td>
                                                            <input
                                                                type="time"
                                                                value={isEditing ? editedData.inTime || '' : dt.inTime}
                                                                className="timePicker"
                                                                id="startTime"
                                                                name="startTime"
                                                                disabled={!isEditing}
                                                                onChange={(e) => handleChange(e, 'inTime')}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="time"
                                                                value={isEditing ? editedData.outTime || '' : dt.outTime}
                                                                className="timePicker"
                                                                id="endTime"
                                                                name="endTime"
                                                                disabled={!isEditing}
                                                                onChange={(e) => handleChange(e, 'outTime')}
                                                            />
                                                        </td>
                                                        <td>
                                                            <span className={`badge ${status === 'Present' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                                                {status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="ti-dropdown hs-dropdown">
                                                                <button type="button"
                                                                    className="ti-btn ti-btn-ghost-primary ti-dropdown-toggle me-2 !py-2 !shadow-none"
                                                                    aria-expanded="false">
                                                                    <i className="ri-arrow-down-s-line align-middle inline-block"></i>
                                                                </button>
                                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                    {!isEditing && <li><button className="ti-dropdown-item" onClick={() => handleEdit(index)}>Edit</button></li>}
                                                                    {isEditing && <li> <button type="button" className="ti-dropdown-item" onClick={() => handleSave(index)}>Save</button></li>}
                                                                    {isEditing && <li> <button type="button" className="ti-dropdown-item" onClick={handleCancel}>Cancel</button></li>}
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    {/* Table section end */}
                </div>
            </div>

        </div>
    )
}

export default StudentAttendance