import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { singleselect } from '../../forms/formelements/formselect/formselectdata'
import Select from 'react-select';
import axios from 'axios';
import Loader from '../loader/loader';
import { toast } from 'react-toastify';
import { useSchoolId } from '../../../components/common/context/idContext';

const ExaminationList = () => {
    const [examData, setExamData] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [deleteStudent, setDeleteStudent] = useState()
    const {id: schoolId} = useSchoolId();

    
    // Calculate percentages
    const calculatePercentage = (part, total) => {
      if (total === 0) return 0;
      return ((part / total) * 100).toFixed(2); // Rounded to 2 decimal places
    };
  
    
    const getExamDataList = () => {
        setSpinner(true)
        axios.get(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Exam?SchoolId=${schoolId}`)
            .then(res => {
                setExamData(res.data)
                
                 setSpinner(false)
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        getExamDataList()
    },[schoolId])

    const openDelete = (id)=>{
        setDeleteStudent(id)
    }
    
    const deleteDatahandler = async (id) => {
        try {
            await axios.delete(`https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Exam/${id}`);
            console.log(`staff with ID ${id} deleted`);
            getExamDataList(); // Refresh the student list
            toast.success("Exam Data Deleted Successfuly")
        } catch (err) {
            console.error("Error deleting student:", err);
        }
    }

  return (
    <div>
    <h4 className='pt-4 borderBottom'>Examination</h4>
    <div className="flex-staff pb-4 pt-2">
        <div className='flex justify-between'>
            <div className="staff-flex-container">
                <div className='flex flex-row items-center'>
                    {/* <div className='backButton'>
                        <Link to={`${import.meta.env.BASE_URL}pages/student/studentDetails`}>

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
                        Exam
                    </li>
                </ol>
            </div>

                </div>


            </div>
            {/* <div className="createstudent-btn">
                <Link to={`${import.meta.env.BASE_URL}pages/staff/createStaff`}>
                    <button type="button" className="ti-btn ti-btn-secondary-full !rounded-full ti-btn-wave">+ Create Staff</button>
                </Link>
            </div> */}
        </div>


    </div>

    <div className='exam-stud-table'>
        <div className='box p-4'>
        <div className='exam-head-wrap'>
                <h4>Exam Data</h4>
            </div>
            <div className='exam-top-sec flex  justify-end  pt-4 pb-4'>

                <div className="exam-create-btn ">
                <Link to={`${import.meta.env.BASE_URL}pages/examination/createExamination`}>
                    <button type="button" className="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave">Add Exam</button>
                </Link>
                </div>
            </div>
            {/* Top section end */}
            {/* Top section end */}
            {/* Table section start */}
            <div className="exam-table-details">
                    <div className="table-responsive">
                        <table className="table whitespace-nowrap table-sm min-w-full">
                            <thead><tr className="border-b border-defaultborder">
                                <th scope="col" className="text-start">#</th>
                                {/* <th scope="col" className="text-start">Staff Code</th> */}
                                <th scope="col" className="text-start">Exam Type</th>
                                <th scope="col" className="text-start">Name of exam</th>
                                <th scope="col" className="text-start">Date</th>
                                <th scope="col" className="text-start">Total Student</th>
                                <th scope="col" className="text-start">Passed Student</th>
                                <th scope="col" className="text-start">Failed Student</th>
                                <th scope="col" className="text-start">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                        spinner ? <Loader /> :
                                        examData.length > 0 ? (
                                            examData.map((dt, index) => {
                                                const passedPercentage = calculatePercentage(dt.passedStudent, dt.totalAppearedStudent);
                                                const failedPercentage = calculatePercentage(dt.failedStudent, dt.totalAppearedStudent);

                              return  <tr key={index} className="border-b border-defaultborder">
                                    <td>{index + 1}</td>
                                    {/* <td>EMP005</td> */}
                                    <td>      
                                        {dt.examType}                            
                                    </td>
                                    <td>{dt.examName}</td>
                                    <td>From:{dt.fromDate.slice(0,10)}
                                        <br/> To:{dt.toDate.slice(0,10)}
                                    </td>
                                    <td>{dt.totalAppearedStudent}</td>
                                    <td>{dt.passedStudent}({passedPercentage}%)</td>
                                    <td>{dt.failedStudent}({failedPercentage}%)</td>

                                    <td>
                                    <div className="ti-dropdown hs-dropdown">
                                            <button type="button"
                                                className="ti-btn ti-btn-ghost-primary ti-dropdown-toggle me-2 !py-2 !shadow-none" aria-expanded="false">
                                                <i className="ri-arrow-down-s-line align-middle inline-block"></i>
                                            </button>
                                            <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                <li><Link className="ti-dropdown-item" to={`${import.meta.env.BASE_URL}pages/examination/updateExamination/${dt.id}`}>Edit</Link></li>
                                                <li><Link className="ti-dropdown-item" data-hs-overlay="#hs-vertically-centered-modal"  onClick={()=>openDelete(dt.id)}>Delete</Link></li>

                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                  })
                                ) : (
                                            <tr>
                                                <td colSpan="6">
                                                <h3 className='text-center'>
                                                    No Data available.
                                                </h3>
                                                </td>
                                            </tr>
                                        )

                                    }

                            </tbody>
                        </table>
                      
                    </div>
            </div>
            {/* Table section end */}
        </div>
    </div>

    {/* Modal popup Start */}
    <div id="hs-vertically-centered-modal" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                  <div className="ti-modal-content">
                    <div className="ti-modal-header">
                      <h6 className="modal-title" id="staticBackdropLabel2">Warning
                      </h6>
                      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-vertically-centered-modal">
                        <span className="sr-only">Close</span>
                        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                    <div className="ti-modal-body">
                      <p>Sure you want to delete this record? </p>
                    </div>
                    <div className="ti-modal-footer">
                      <button type="button" className="hs-dropdown-toggle ti-btn yoti-btn-secondary-full" data-hs-overlay="#hs-vertically-centered-modal">
                        No
                      </button>
                      <button type='button' className="ti-btn ti-btn-primary-full" onClick={()=>deleteDatahandler(deleteStudent)} data-hs-overlay="#hs-vertically-centered-modal">
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            {/* Modal popup End */}

</div>
  )
}

export default ExaminationList