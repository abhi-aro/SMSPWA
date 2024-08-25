import React from 'react'
import Select from 'react-select';
import { singleselect } from '../../forms/formelements/formselect/formselectdata';
const CreateSection = (props) => {
  return (
    <div className='p-5 !pt-0 rounded-sm dark:border-white/10 border-gray-200'>
    <h3>Create Section</h3>
    <hr />
    <div className='form-handling-sec pt-4'>
        
        <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12 pt-4">
            <label htmlFor="input-text" className="form-label">Section Name*</label>
            {/* <input type="text" className="form-control" id="input-text" placeholder="Enter Section Name" /> */}
            <Select className="!p-0 place-holder" classNamePrefix='react-select' options={singleselect} />
        </div>
        <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12 pt-4">
            <label className="ti-form-select rounded-sm !p-0 ">Section Class Teacher*</label>
            <Select className="!p-0 place-holder" classNamePrefix='react-select' options={singleselect} />
        </div>

        <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12 pt-4 pb-2">
            <label htmlFor="input-text" className="form-label">Description</label>
            <textarea className="form-control" id="text-area" placeholder='Enter Description' rows="4" spellCheck="false"></textarea>
        </div>
        <hr />
        <div className='createSchool-btn pt-4'>
            <div className='flex justify-end'>
                <button type="button" className="ti-btn ti-btn-ghost-orange !rounded-full ti-btn-wave" onClick={()=> props.setAddSec(false)}>Cancel</button>
                <button type="button" className="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave">Create</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default CreateSection
