import React, { useEffect, useState } from 'react'
import { academicYear, classIDSelect, sectionselect, bloodGroupSelect, genderSelect, stateSelect } from '../../forms/formelements/formselect/formselectdata'
import Select from 'react-select';
import media50 from "../../../assets/images/media/media-50.jpg";

import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Controller, useForm, useController } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSchoolId } from '../../../components/common/context/idContext';
import { toast } from 'react-toastify';



const schema = yup.object({
    registrationNumber: yup.string().required("Please enter Register Number"),
    rollNumber: yup.string().required("Please enter Roll Number"),
    enrolmentDate: yup.string().required("Please enter Enrollment Date"),
    aadharcardNumber: yup.string().required("Please enter Adhar Card Number"),
    nameOnAadharcard: yup.string().required("Please enter Name as per Adhar card."),
    fullName: yup.string().required("Please enter Full Name"),
    dob: yup.string().required("Please enter DOB"),
    mobileNumber: yup.string().required("Please enter mobile number"),
    email: yup.string().required("Please enter valid email"),
    fatherName: yup.string().required("Please enter father name"),
    fatherMobileNumber: yup.string().required("Please enter father mobile number"),
    motherName: yup.string().required("Please enter mother name"),
    height: yup.string().required("Please enter height"),
    weight: yup.string().required("Please enter weight"),
    religion: yup.string().required("Please enter religion"),
    caste: yup.string().required("Please enter caste"),
    emergencyMobileNumber: yup.string().required("Please enter emergency mobile number"),
    addressLine: yup.string().required("Please enter address Line"),
    city: yup.string().required("Please enter city"),
    district: yup.string().required("Please enter district"),
    pinCode: yup.string().required("Please enter pinCode"),

    
    academicYear: yup.string().nullable().required("Please select Academic Year"),
    classID: yup.string().nullable().required("Please select Class"),
    sectionId: yup.string().nullable(),
    bloodGroup: yup.string().nullable().required("Please select Blood Group"),
    gender: yup.string().nullable().required("Please select Gender"),
    state: yup.string().nullable().required("Please select State")

  });

   // Date Formatting Function
const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
                           

const CreateStudent = () => {

    const [data, setData] = useState({
    id: "",
    academicYear: "",
    classID: "",
    sectionId: "",
    rollNumber: "",
    registrationNumber: "",
    enrolmentDate: "",
    aadharcardNumber: "",
    nameOnAadharcard: "",
    fullName: "",
    dob: "",
    adolescentSpecificQuestionnaireInstruction: "",
    mobileNumber: "",
    email: "",
    gender: "",
    religion: "",
    caste: "",
    bloodGroup: "",
    height: "",
    weight: "",
    fatherName: "",
    fatherMobileNumber: "",
    motherName: "",
    emergencyMobileNumber: "",
    addressLine: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
    defectAtBirth: "",
    deficiencies: "",
    childhoodDiseases: "",
    developmentalDelayAndDisability: ""

    })
    const [file, setFile] = useState();

    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());

    const [classOptions, setClassOptions] = useState([])
    const [sectionOptions, setSectionOptions] = useState([])
    const [selectedClassId, setSelectedClassId] = useState(null);

    const {id:schoolId} = useSchoolId()

    useEffect(() => {
        const fetchClass = async () => {
          try {
            const response = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/class');
            const classData = response.data;
            
            const filteredClassData = classData.filter(el => el.schoolID == schoolId)
            const classOptionsList = filteredClassData.map(ele => ({
                id: ele.id,
                value: ele.id,
                label: ele.className
            }));
            setClassOptions(classOptionsList)
          } catch (error) {
            console.error('Error fetching Class:', error);
          }
        };
    
        fetchClass();
    }, [schoolId]);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                const response = await axios.get('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Section');
                const secData = response.data;
    
                if (selectedClassId) {
                    const filteredSecData = secData.filter(el => el.classID === selectedClassId);
                    const secOptionsList = filteredSecData.map(ele => ({
                        sectionId:ele.id,
                        value: ele.description, // Ensure this is correct
                        label: ele.description // Ensure this is correct
                    }));
                    console.log(secOptionsList, 'secOptionsList')
    
                     setSectionOptions(secOptionsList);
                    //setSectionOptions(filteredSections.map(el => ({ value: el.id, label: el.description })));
                }
            } catch (error) {
                console.error('Error fetching Section:', error);
            }
        };
    
        fetchSection();
    }, [selectedClassId]); // Run when selectedClassId changes

    //const studentPostRes = useSelector((state) => state.studentData.postRes)
    const dispatch = useDispatch()

    const profileImage = (e) => {
        console.log(e.target.files[0], "Image URL");
        setFile(e.target.files[0]);
    }

    const { register, handleSubmit,  formState, control, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const { field: { value: academicYearValue, onChange: academicYearOnChange , ...restacademicYearField } } = useController({ name: 'academicYear', control });
    const { field: { value: classIDValue, onChange: classSelectOnChange, ...restclassIDSelectField } } = useController({ name: 'classID', control });
    const { field: { value: sectionValue, onChange: sectionOnChange, ...restsectionField } } = useController({ name: 'sectionId', control });
    const { field: { value: bloodGroupValue, onChange: bloodGroupOnChange, ...bloodGroupField } } = useController({ name: 'bloodGroup', control });
    const { field: { value: genderValue, onChange: genderOnChange, ...restgenderField } } = useController({ name: 'gender', control });
    const { field: { value: stateValue, onChange: stateOnChange, ...reststateField } } = useController({ name: 'state', control });
   

    const handleChange = (dateChange) => {
        
        setValue("dob", formatDate(dateChange), {
          shouldDirty: true
        });
        setStartDate(dateChange);
      };
    const handleChangeToDate = (dateChange) => {
        setValue("enrolmentDate", formatDate(dateChange), {
          shouldDirty: true
        });
    
        setStartDate1(dateChange);
      };

    const { errors } = formState;

    const onSubmit = async(formData) => {
        try {
            const formDataToSend = new FormData();

            // Append all form data
            for (const key in formData) {
                if (key !== 'imageURL') {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Append image if exists
            if (file) {
                formDataToSend.append('ProfileImage', file);
            }

            // if(!formData.sectionId) {
            //     formDataToSend.append('sectionId', null)
            // }

            // Post the data
            const response = await axios.post('https://sms-webapi-hthkcnfhfrdcdyhv.eastus-01.azurewebsites.net/api/Students', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            if(response.status === 200){
                toast.success('Student created successfully')
                navigate(`${import.meta.env.BASE_URL}pages/student/studentDetails`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    // const onSubmit = (formData) => {
    //     console.log(formData, 'FormDATATTA')
    //     setData({ ...formData });
    //      dispatch(postSchoolList(formData))
    //      navigate(`${import.meta.env.BASE_URL}pages/schools/allSchools`)
    //      //dispatch(fetchSchoolList())
    // }
   
    return (
        <div>
            {/* <Pageheader currentpage="Student" activepage="Student" mainpage="Create Student" /> */}
            <h4 className='pt-4 borderBottom'>Create Student</h4>

            <div className="breadcrumbs-wrapper mb-4">
                <div className='createstud-flex-container'>
                    <div className='flex flex-row mb-4 items-center pt-2'>

                        {/* <div className='backButton'>
                <Link to={`${import.meta.env.BASE_URL}pages/student/studentDetails`}>

            <button type="button" className="ti-btn ti-btn-info-full ti-btn-wave">Back</button>
                </Link>
            </div>
           */}
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
                                <li className="text-sm">
                                    <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}pages/student/studentDetails`}>
                                        Student
                                        <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-black-300 dark:text-white/10 rtl:rotate-180"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </Link>
                                </li>

                                <li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
                                    Student Admit Form
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {/* Student form create Start */}
            <div className='student-form-create'>
                <div className='box p-4 ' >
                    <h4 className=' pb-2'>Student Form</h4>
                   
                        <div className='student-details-first-page'>
                            <div className='student-profile-uploads pt-4'>
                                <div className='student-profile-wrap flex items-center'>
                                    <div className='left-side-profile-pic'>
                                        {
                                        file && <img src={URL.createObjectURL(file)} className="img-fluid !rounded-full !inline-flex profile-image" />
                                        ?
                                        file && <img src={URL.createObjectURL(file)} className="img-fluid !rounded-full !inline-flex profile-image" />
                                        :
                                         <img src={media50} className="img-fluid !rounded-full !inline-flex profile-image" />
                                        
                                        }
                                    </div>
                                    <div className='right-side-upload-pic'>
                                        <p>Upload Student Photo (150px X 150px)</p>
                                        <div>
                                            <label htmlFor="file-input" className="sr-only">Choose file</label>
                                            <input type="file" onChange={profileImage} name="file-input" id="file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>    
                            <div className='academic-details mb-4 pt-4'>
                                <h6 className=' pb-2'>Academic Details</h6>
                                 <div className='grid grid-cols-12 sm:gap-6 mb-4'>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Academic Year <span className="redText">*</span></label>
                            <Select className="!p-0 place-holder"   
                                    isClearable
                                    options={academicYear}
                                    value={academicYearValue ? academicYear.find(x => x.value === academicYearValue) : academicYearValue}
                                    onChange={option => academicYearOnChange(option ? option.value : option)}
                                    {...restacademicYearField}
                                    classNamePrefix='react-select'  />
                                {errors.academicYear && <p className='errorTxt'>{errors.academicYear.message}</p>}
                            
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Select Class <span className="redText">*</span></label>
                                <Select className="!p-0 place-holder"  
                                     isClearable
                                     options={classOptions}
                                     value={classOptions.find(option => option.value === classIDValue)}
                                     onChange={option => {classSelectOnChange(option ? option.value : option); setSelectedClassId(option ? option.value : null)}}
                                     {...restclassIDSelectField}
                                     classNamePrefix='react-select'  />
                                    {errors.classID && <p className='errorTxt'>{errors.classID.message}</p>}
                                
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Select Section</label>
                            
                            <Select className="!p-0 place-holder"  
                                     isClearable
                                     options={sectionOptions}
                                     value={ sectionOptions.find(x => x.value === sectionValue)}
                                     onChange={option => sectionOnChange(option ? option.sectionId : null)}
                                     {...restsectionField}
                                     classNamePrefix='react-select'  />
                                    {/* {errors.section && <p className='errorTxt'>{errors.section.message}</p>} */}
                                
                                </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Student Registration Number <span className="redText">*</span></label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Registration Number" {...register('registrationNumber')}  name='registrationNumber' />
                            {errors.registrationNumber && <p className='errorTxt'>{errors.registrationNumber.message}</p>}
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Roll Number <span className="redText">*</span></label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Roll Number" {...register('rollNumber')}  name='rollNumber' />
                            {errors.rollNumber && <p className='errorTxt'>{errors.rollNumber.message}</p>}
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Enrollment Date <span className="redText">*</span></label>
                            <div className="input-group !flex-nowrap">
                                            <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                            <Controller name="enrolmentDate"
                                            control={control}
                                            {...register('enrolmentDate')}
                                            defaultValue={startDate1}
                                            render={() => (
                                                <DatePicker
                                                dateFormat="dd/MM/yyyy"
                                                        showMonthDropdown="true"
                                                        showYearDropdown="true"   

                                                className="ti-form-input  focus:z-10" 
                                                selected={startDate1}
                                                placeholderText="Select date"
                                                onChange={handleChangeToDate}
                                                />
                                            )} />

                                        </div>
                            {/* <input type="date" className="form-control" id="input-datetime-local" {...register('enrolmentDate')}  name='enrolmentDate' /> */}
                            {errors.enrolmentDate && <p className='errorTxt'>{errors.enrolmentDate.message}</p>}       
                            </div>


                            </div> 
                      
                            </div>
                            <div className='aadharcard-details mb-4'>
                                <h6 className=' pb-2'>Student Aadhar Card Details</h6>
                                <div className='grid grid-cols-12 sm:gap-6'>
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label className="ti-form-select rounded-sm !p-0 mb-2">Aadhar Card Number <span className="redText">*</span></label>
                                        <input type="text" className="form-control" id="input-text" placeholder="Enter Aadhar Card Number"  {...register('aadharcardNumber')}  name='aadharcardNumber' />
                                        {errors.aadharcardNumber && <p className='errorTxt'>{errors.aadharcardNumber.message}</p>}       

                                    </div>
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label className="ti-form-select rounded-sm !p-0 mb-2">Name of Aadhar Card <span className="redText">*</span></label>
                                        <input type="text" className="form-control" id="input-text" placeholder="Enter Aadhar Card Number" {...register('nameOnAadharcard')}  name='nameOnAadharcard'/>
                                        {errors.nameOnAadharcard && <p className='errorTxt'>{errors.nameOnAadharcard.message}</p>}       
                                    </div>
                                </div>
                            </div>
                            <div className='personal-details mb-4'>
                                <h6 className=' pb-2'>Personal Details</h6>
                                <div className='grid grid-cols-12 sm:gap-6'>
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label className="ti-form-select rounded-sm !p-0 mb-2">Full Name <span className="redText">*</span> </label>
                                            {/* <Select className="place-holder" classNamePrefix='react-select' options={singleselect} /> */}
                                            <input type="text" className="form-control input-group-control" id="input-text" placeholder="Enter Full Name" {...register('fullName')} name='fullName' />
                                            {errors.fullName && <p className='errorTxt'>{errors.fullName.message}</p>} 
                                        
                                    </div>


                                 <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Mobile No. <span className="redText">*</span> </label>
                            <div className='flex rounded-sm'>
                            {/* <Select className="place-holder" classNamePrefix='react-select' options={singleselect} /> */}
                            <input type="text" className="form-control input-group-control" id="input-text" placeholder="Enter Mobile Number" {...register('mobileNumber')} name='mobileNumber'   />
                                        
                            </div>
                            {errors.mobileNumber && <p className='errorTxt'>{errors.mobileNumber.message}</p>} 
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Email<span className="redText">*</span> </label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Email ID" {...register('email')} name='email'/>
                            {errors.email && <p className='errorTxt'>{errors.email.message}</p>} 
                            </div> 

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-datetime-local" className="form-label">DOB <span className="redText">*</span></label>
                                <div className="input-group !flex-nowrap">
                                            <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                            <Controller name="dob"
                                            control={control}
                                            {...register('dob')}
                                            defaultValue={startDate}
                                            render={() => (
                                                <DatePicker
                                                className="ti-form-input  focus:z-10" 
                                                dateFormat="dd/MM/yyyy"
                                                showMonthDropdown="true"
                                                showYearDropdown="true"   

                                                selected={startDate}
                                                placeholderText="Select date"
                                                onChange={handleChange}
                                                />
                                            )} />
                                        </div>
                                {/* <input type="date" className="form-control" id="input-datetime-local" {...register('dob')}  name='dob' /> */}
                                {errors.dob && <p className='errorTxt'>{errors.dob.message}</p>} 
                            </div>



                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Blood Group <span className="redText">*</span>:</label>
                            <Select 
                                isClearable
                                options={bloodGroupSelect}
                                value={bloodGroupValue ? bloodGroupSelect.find(x => x.value === bloodGroupValue) : bloodGroupValue}
                                onChange={option => bloodGroupOnChange(option ? option.value : option)}
                                {...bloodGroupField}
                                classNamePrefix='react-select'
                            />
                             {errors.bloodGroup && <p className='errorTxt'>{errors.bloodGroup.message}</p>} 
                            </div>


                        
    
    

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Gender <span className="redText">*</span>:</label>
                            <Select 
                                 isClearable
                                 options={genderSelect}
                                 value={genderValue ? genderSelect.find(x => x.value === genderValue) : genderValue}
                                 onChange={option => genderOnChange(option ? option.value : option)}
                                 {...restgenderField}
                                 classNamePrefix='react-select'
                            />
                            {errors.gender && <p className='errorTxt'>{errors.gender.message}</p>} 
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Father/Guardian Name<span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" {...register('fatherName')} name='fatherName'  />
                            {errors.fatherName && <p className='errorTxt'>{errors.fatherName.message}</p>} 

                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Father/Guardian Mobile No.<span className="redText">*</span></label>
                            <div className='flex rounded-sm'>
                            {/* <Select className="place-holder" classNamePrefix='react-select' options={singleselect} /> */}
                            <input type="text" className="form-control input-group-control" id="input-text" placeholder="Enter Full Name" {...register('fatherMobileNumber')} name='fatherMobileNumber'  />
                            </div>
                            {errors.fatherMobileNumber && <p className='errorTxt'>{errors.fatherMobileNumber.message}</p>} 
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Mother Name<span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" {...register('motherName')} name='motherName' />
                            {errors.motherName && <p className='errorTxt'>{errors.motherName.message}</p>} 
                            </div>
 
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Height<span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder=""  {...register('height')} name='height' />
                            {errors.height && <p className='errorTxt'>{errors.height.message}</p>} 
                            </div>


                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Weight<span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" {...register('weight')} name='weight'/>
                            {errors.weight && <p className='errorTxt'>{errors.weight.message}</p>} 
                            </div>
 
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Religion  <span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder=""  {...register('religion')} name='religion'/>
                            {errors.religion && <p className='errorTxt'>{errors.religion.message}</p>} 
                            </div>
 
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Caste <span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" {...register('caste')} name='caste'/>
                            {errors.caste && <p className='errorTxt'>{errors.caste.message}</p>} 
                            </div>                           



                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Emergency Mobile No. <span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder=""  {...register('emergencyMobileNumber')} name='emergencyMobileNumber' />
                            {errors.emergencyMobileNumber && <p className='errorTxt'>{errors.emergencyMobileNumber.message}</p>} 
                            </div> 

                                </div>
                            </div>

                             <div className='permanentAddr-details mb-4'>
                <h6 className=' pb-2'>Student Permanent Address Details</h6>
                <div className='grid grid-cols-12 sm:gap-6'>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Address Line 1  <span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Door No., Street, Area..." {...register('addressLine')} name='addressLine' />
                            {errors.addressLine && <p className='errorTxt'>{errors.addressLine.message}</p>} 
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">City  <span className="redText">*</span></label>
                            <input type="text" className="form-control" id="input-text" placeholder="" {...register('city')} name='city'  />
                            {errors.city && <p className='errorTxt'>{errors.city.message}</p>} 
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">District <span className="redText">*</span></label>
                            <input type="text" className="form-control" id="input-text" placeholder="" {...register('district')} name='district'  />
                            {errors.district && <p className='errorTxt'>{errors.district.message}</p>} 
                            </div>

                             <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Select State/Province <span className="redText">*</span></label>
                            <Select 
                                isClearable
                                options={stateSelect}
                                value={stateValue ? stateSelect.find(x => x.value === stateValue) : stateValue}
                                onChange={option => stateOnChange(option ? option.value : option)}
                                {...reststateField}
                                classNamePrefix='react-select'
                            />
                             {errors.state && <p className='errorTxt'>{errors.state.message}</p>} 
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Pincode<span className="redText">*</span>:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Pincode" {...register('pinCode')} name='pinCode' />
                            {errors.pinCode && <p className='errorTxt'>{errors.pinCode.message}</p>} 
                            </div>
                            
                        </div>
                            </div> 

                             {/* <div className='medical-details mb-4'>
                <h6 className=' pb-2'>Student Medical Details</h6>
                <div className='grid grid-cols-12 sm:gap-6'>
                                                    
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Defects At Birth</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Deficiencies</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Childhood Diseases</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Developmental delay & Disability</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>

                          
                        </div>
                            </div>  */}

                            <div className='student-create-btn'>
                                <div className='flex justify-end'>
                                    {/* <button type="button" className="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave" onClick={handleSubmit} >Next</button> */}
                                    <button type="submit" className="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave" >Save</button>
                                    <div className='backButton'>
                                        <Link to={`${import.meta.env.BASE_URL}pages/student/studentDetails`}>

                                            <button type="button" className="ti-btn ti-btn-info-full ml-15 !rounded-full ti-btn-wave">Reset</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                            </form>

                        </div>
                    
                </div>
            </div>
            {/* Student form create end */}
        </div>
    )
}

export default CreateStudent
