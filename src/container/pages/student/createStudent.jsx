import React, { useState } from 'react'
import { singleselect } from '../../forms/formelements/formselect/formselectdata'
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const CreateStudent = () => {

    const [values, setValues] = useState({
        // academicYear: '',
        // class: '',
        // aadhar: '',
        // name: '',
        // dob: ''
                
        
    })


    const valued = [
        {
            "academicyear": "when",
            "name": "",
            "dob": "2024-08-28T18:00",
            "class": "",
            "aadhar": "ss",
            "id": "57",
            "year": "Choice 1"
          },
          {
            "academicyear": "gondola",
            "name": "",
            "dob": "2024-08-28T18:03",
            "class": "",
            "aadhar": "HHH",
            "id": "56",
            "year": ""
          },
          {
            "academicyear": "Keyboard",
            "name": "",
            "dob": "",
            "class": "",
            "aadhar": "HHHH",
            "id": "55",
            "year": "Choice 3"
          }
    ]

    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('https://66bcb9c524da2de7ff6ba282.mockapi.io/student', valued)
        .then(res => {
                console.log(res)
                navigate(`${import.meta.env.BASE_URL}pages/student/studentDetails`)
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
       <Pageheader currentpage="Student" activepage="Student" mainpage="Create Student" />
       <div className="breadcrumbs mb-4">
        <div className='flex-container'>
            <div className='flex flex-row mb-4'>
                
            <div className='backButton'>
            
            <Link to={`${import.meta.env.BASE_URL}pages/student/studentDetails`} className="product-image">
                <button type="button" className="ti-btn ti-btn-info-full ti-btn-wave">Back</button>
            </Link>
            </div>
            {/* <div className='breadCrumbs p-4'>
                <p>Dashboard -  Students - Create Student</p>
            </div> */}
            </div>
        </div>
       </div>
       {/* Student form create Start */}
       <div className='student-form-create'>
        <div className='box p-4 ' >
            <h4 className='pt-2 pb-2'>Student Form</h4>
            <div className='academic-details mb-4'>
                <h6 className=' pb-2'>Academic Details</h6>
                {/* <div className='grid grid-cols-12 sm:gap-6'>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Academic Year:</label>
                            <Select className="!p-0 place-holder" classNamePrefix='react-select' options={singleselect} name='academicYear' />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Select Class:</label>
                                <Select className="!p-0 place-holder" classNamePrefix='react-select' options={singleselect}  name='class'/>
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Select Section</label>
                                <Select className="!p-0 place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>

                        </div> */}
            </div>
            <div className='aadharcard-details mb-4'>
                <h6 className=' pb-2'>Student Aadhar Card Details</h6>
                <div className='grid grid-cols-12 sm:gap-6'>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Aadhar Card Number:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Aadhar Card Number" onChange={(e)=> setValues({...valued, aadhar: e.target.value}) } name='aadhar'/>
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Name of Aadhar Card</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Aadhar Card Number" />
                            </div>

                            

                        </div>
            </div>
            <div className='personal-details mb-4'>
                <h6 className=' pb-2'>Personal Details</h6>
                <div className='grid grid-cols-12 sm:gap-6'>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Full Name:</label>
                            <div className='flex rounded-sm'>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            <input type="text" className="form-control input-group-control" id="input-text" placeholder="Enter Full Name" onChange={(e)=> setValues({...valued, name: e.target.value}) } name='name'/>
                            </div>
                            </div>

                            {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Mobile No.</label>
                            <div className='flex rounded-sm'>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            <input type="text" className="form-control input-group-control" id="input-text" placeholder="Enter Full Name" />
                            </div>
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Email:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Email ID" />
                            </div> */}

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label htmlFor="input-datetime-local" className="form-label">DOB</label>
                                <input type="datetime-local" className="form-control" id="input-datetime-local" onChange={(e)=> setValues({...valued, dob: e.target.value}) } name='dob'/>
                            </div>

                            
                            {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Blood Group:</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Gender:</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Father/Guardian Name:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" />
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Father/Guardian Mobile No.</label>
                            <div className='flex rounded-sm'>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            <input type="text" className="form-control input-group-control" id="input-text" placeholder="Enter Full Name" />
                            </div>
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Mother Name:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" />
                            </div>
                            

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Emergency Mobile No.:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" />
                            </div> */}

                        </div>
            </div>

            {/* <div className='permanentAddr-details mb-4'>
                <h6 className=' pb-2'>Student Permanent Address Details</h6>
                <div className='grid grid-cols-12 sm:gap-6'>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Address Line 1:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Door No., Street, Area..." />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">City</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" />
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">District</label>
                            <input type="text" className="form-control" id="input-text" placeholder="" />
                            </div>
                            
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Select State/Province</label>
                            <Select className="place-holder" classNamePrefix='react-select' options={singleselect} />
                            </div>

                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <label className="ti-form-select rounded-sm !p-0 mb-2">Pincode:</label>
                            <input type="text" className="form-control" id="input-text" placeholder="Enter Pincode" />
                            </div>
                            
                        </div>
            </div> */}

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
            </div> */}

            <div className='student-create-btn'>
                <div className='flex justify-end'>
                <button type="button" className="ti-btn ti-btn-secondary-full !rounded-full ti-btn-wave" onClick={handleSubmit} >+ Create</button>
                </div>
            </div>
        </div>
       </div>
       {/* Student form create end */}
    </div>
  )
}

export default CreateStudent
