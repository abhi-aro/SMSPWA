import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TimeTableTabs from '../schools/timeTableTabs';
import Select from 'react-select';
import { singleselect } from '../../forms/formelements/formselect/formselectdata';
import axios from 'axios';
import { useSchoolId } from '../../../components/common/context/idContext';

import { UserRoleNameContext } from '../../../components/common/context/userRoleContext';
const TimeTable = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const [classDataList, setClassDataList] = useState([]);

    const {id: schoolId} = useSchoolId();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Class');

            if(schoolId == null) throw Error()
            
            const classList = response.data.filter(classData => classData.schoolID == schoolId)
            const classListOptions = classList.map((classData) => ({id: classData.id, value: classData.id, label: classData.className, schoolId: schoolId}))

            setClassDataList(classListOptions);
        } catch (err) {
            setClassDataList([])
        }
        };

        if(schoolId) fetchData();
    }, [schoolId]);

    const { userRoleName, setUserRoleName } = useContext(UserRoleNameContext)
    const [allSchAdmin, setAllSchAdmin] = useState(false)
        const loginValue = localStorage.getItem('loginData')
        let  parsedLoginValue
        let   roleName
        let   fullName
        if (loginValue) {

           parsedLoginValue = JSON.parse(loginValue);

            roleName = parsedLoginValue.roleName || ''; // Default to empty string if undefined

            fullName = parsedLoginValue.fullName || ''; // Default to empty string if undefined

          console.log(parsedLoginValue.roleName, 'loginValue');

        } else {

          console.log('No login data found');

        }

      

         const userLoginRoleName = parsedLoginValue.roleName

      

        useEffect(()=>{

          setUserRoleName(userLoginRoleName)

          if(userLoginRoleName === 'SuperAdmin' || userLoginRoleName === 'Principal') {

            setAllSchAdmin(true)

          }

          else{

            setAllSchAdmin(false)

          }

        },[])


    return (
        <div>
            <h4 className='textUpperCase pt-4 borderBottom'>Timetable</h4>
            <div className="school-flex-container pb-4 pt-2">
                <div className='flex justify-between'>
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
                                Timetable
                            </li>
                        </ol>
                    </div>

                </div>


            </div>

            <div className='create-stud-table'>
                <div className='box'>
                    <div className="p-4">
                        <h4>Timetable Details</h4>
                            <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 pt-4">
                                {/* <label className="ti-form-select rounded-sm !p-0 ">Section Class Teacher</label> */}
                                <Select placeholder="Select Class"  onChange={handleSelectChange} className="!p-0 place-holder" classNamePrefix='react-select' options={classDataList} />
                            </div>
                        {/* <div className='box p-4'>
                            <h6>Select Criteria</h6>
                        </div> */}
                    </div>
                    <div className='time-tables-wrap'>
                        <TimeTableTabs selectedOption={selectedOption} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TimeTable