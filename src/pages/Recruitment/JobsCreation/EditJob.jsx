import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from '../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import { useState } from 'react'
import Swal from 'sweetalert2'
import TextArea from '../../../components/Input/TextArea'
import { useNavigate, useParams } from 'react-router-dom'
import * as apiProvider from '../../../services/api/recruitment'
import { useEffect } from 'react'
import * as sessionStorage from '../../../utils/storageConstants'
import { fetchLocalData } from '../../../services/common'

const EditJob = ({ notify }) => {

    const navigate = useNavigate()

    const { id } = useParams()

    const [user, setUser] = useState()

    const userProfile = fetchLocalData(sessionStorage.LOCAL,sessionStorage.PROFILE_ID)

    const userRole = fetchLocalData(sessionStorage.LOCAL,sessionStorage.ROLE)


    const [profileOpt, setProfileOpt] = useState([])
    const [bussinessOpt, setBussinessOpt] = useState([])
    const [countryOpt, setCountryOpt] = useState([])
    const [stateOpt, setStateOpt] = useState([])
    const [cityOpt, setCityOpt] = useState([])
    const [workTypeOpt, setWorkTypeOpt] = useState([])
    const [workStyleOpt, setWorkStyleOpt] = useState([])
    const [workShiftOpt, setWorkShiftOpt] = useState([])
    const [interViewRounds, setInterviewRounds] = useState([])

    const [data, setData] = useState()
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem(sessionStorage.USER_ID)))

    const compensationOpt = [
        {
            label:'compensation 1',
            value:'63b74f5277eef7cc4c5f1535',
        },
        {
            label:'compensation 2',
            value:'63b74f5277eef7cc4c5f1536',
        },
        {
            label:'compensation 3',
            value:'63b74f5277eef7cc4c5f1537',
        },
    ]

    const InterViewRoundsOpt = [
        {
            label:'round 1',
            value:'63b74f5277eef7cc4c5f1535',
        },
        {
            label:'round 2',
            value:'63b74f5277eef7cc4c5f1536',
        },
        {
            label:'round 3',
            value:'63b74f5277eef7cc4c5f1537',
        },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handelChangeSelect = (e) => {
        console.log(e);
        const { name, value } = e;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const getData = () => {
        apiProvider.getJobById(id)
            .then(res => {
                console.log(res.data.job);
                setData(res.data.job)
                setUser({
                    profile: res.data.job.profileId,
                    bussiness: res.data.job.businessId,
                    openings: res.data.job.headcount,
                    country: res.data.job.countryId,
                    department: res.data.job.departmentId,
                    state: res.data.job.stateId,
                    city: res.data.job.cityId,
                    status: res.data.job.status,
                    approver_1: res.data.job.approver_1,
                    approver_2: res.data.job.approver_2,
                    approver_3: res.data.job.approver_3,
                    approver_4: res.data.job.approver_4,
                    eligibilty: res.data.job.eligibilty,
                    workTypeId: res.data.job.workTypeId,
                    workShiftId: res.data.job.workShiftId,
                    interviewRoundId: res.data.job.interviewRoundId,
                    questionBankId: res.data.job.questionBankId,
                    roundId: res.data.job.roundId,
                    compensationId: res.data.job.compensationId,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getBasicData = async () => {
        const [data1, data2, data3, data4, data5, data6, data7, data8, data9] = await Promise.all([
            apiProvider.getProfile()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.title,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getBusiness()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getCountry()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => { console.log(err); return null })
            ,
            apiProvider.getState()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getCity()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getWorkShift()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getWorkType()
                .then(res => {
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getInterviewRounds()
                .then(res => {
                    console.log(res);
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
            apiProvider.getWorkStyle()
                .then(res => {
                    console.log(res);
                    const arr = res.data?.map(i => ({
                        label: i?.name,
                        value: i?._id
                    }))
                    return arr;
                })
                .catch(err => (console.log(err)))
            ,
        ])

        setProfileOpt(data1);
        setBussinessOpt(data2)
        setCountryOpt(data3)
        setStateOpt(data4)
        setCityOpt(data5)
        setWorkShiftOpt(data6)
        setWorkTypeOpt(data7)
        setInterviewRounds(data8)
        setWorkStyleOpt(data9)

        getData()

    }


    const updateJob = async () => {

        // let obj = {}

        // switch (status) {
        //     case "PENDING":
        //         obj = {
        //             status: "APPROVED1", approver_1: {
        //                 id: userId,
        //                 status: "APPROVED",
        //                 approved_at: new Date(),
        //                 remarks: user?.remarks1
        //             }
        //         }
        //         break;
        //     case "APPROVED1":

        //         obj = {
        //             status: "APPROVED2", approver_2: {
        //                 id: userId,
        //                 status: "APPROVED",
        //                 approved_at: new Date(),
        //                 remarks: user?.remarks2
        //             }
        //         }
        //         break;
        //     case "APPROVED2":
        //         obj = {
        //             status: "APPROVED3", approver_3: {
        //                 id: userId,
        //                 status: "APPROVED",
        //                 approved_at: new Date(),
        //                 remarks: user?.remarks3
        //             }
        //         }
        //         break;
        //     case "APPROVED3":
        //         obj = {
        //             status: "APPROVED", approver_4: {
        //                 id: userId,
        //                 status: "APPROVED",
        //                 approved_at: new Date(),
        //                 remarks: user?.remarks4
        //             }
        //         }
        //         break;
        // }

        var obj

        switch (userProfile) {
            case data?.approver_1?.profileId:
                obj = {
                    ...user,
                    approver_1:{
                        ...user?.approver_1,
                        approved_at: new Date(),
                        status:"APPROVED"
                    }
                }
                console.log('you are 1');
                break;
            case data?.approver_2?.profileId:
                obj = {
                    ...user,
                    approver_2:{
                        ...user?.approver_2,
                        approved_at: new Date(),
                        status:"APPROVED"
                    }
                }
                console.log('you are 2');
                break;
            case data?.approver_3?.profileId:

                obj = {
                    ...user,
                    approver_3:{
                        ...user?.approver_3,
                        approved_at: new Date(),
                        status:"APPROVED"
                    },
                }
                console.log('you are 3');
                break;
            case data?.approver_4?.profileId:
                obj = {
                    ...user,
                    approver_4:{
                        ...user?.approver_4,
                        approved_at: new Date(),
                        status:"APPROVED"
                    },
                    status:"APPROVED"
                }
                console.log('you are fourth',user);
                break;
        
            default:
                return;
        }

        console.log(obj);

        apiProvider.updateJobById(id, obj)
            .then(res => {
                if (res.isSuccess) {
                    console.log(res.data);
                    getData()
                    return notify('success', 'Update Success');
                }
            })
            .catch(err => {
                console.log(err); 
            })
    }

    useEffect(() => {
        // getData()
        getBasicData()
    }, [])


    const InputFileds = {

        ["eligibility"]: <div className="form-child">
            <TextArea
                label="Eligibility Criteria"
                name="eligibility"
                value={user?.eligibility}
                placeHolder="Enter Eligibility Criteria"
                onChange={handleChange}
            />
        </div>,


        ["work-mode"]:
            <>
                <div className="form-child">
                    <Select
                        label="Work Shift"
                        name="workShiftId"
                        value={user?.workShiftId}
                        options={workShiftOpt}
                        onChange={handelChangeSelect}
                    />
                </div>
                <div className="form-child">
                    <Select
                        label="Work Type"
                        name="workTypeId"
                        value={user?.workTypeId}
                        options={workTypeOpt}
                        onChange={handelChangeSelect}
                    />
                </div>
                <div className="form-child">
                    <Select
                        label="Work Style"
                        name="workStyleId"
                        value={user?.workStyleId}
                        options={workStyleOpt}
                        onChange={handelChangeSelect}
                    />
                </div>
            </>,


        ["pay-range"]: <div className="form-child grid grid-cols-2">
            <label htmlFor="" className='px-2 col-span-2'>Pay Range</label>
            <div className='col-span-2 grid grid-cols-2 gap-3 px-2 pt-2'>
                <div className="col-span-1">
                    <input
                        className='text-sm p-1 px-2 min-w-full border-[2px] h-[40px] rounded-sm focus:outline-[#F1C40F]'
                        type="number"
                        placeholder='From'
                        value={user?.payRange?.from}
                        name="pay_from"
                        onChange={(e)=>{
                            setUser(prev=>({
                                ...prev,
                                payRange:{
                                    ...user?.payRange,
                                    from:e.target.value
                                }
                            }))
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <input
                        className='text-sm p-1 px-2 min-w-full border-[2px] h-[40px] rounded-sm focus:outline-[#F1C40F]'
                        type="number"
                        placeholder='To'
                        value={user?.payRange?.to}
                        name="pay_to"
                        onChange={(e)=>{
                            setUser(prev=>({
                                ...prev,
                                payRange:{
                                    ...user?.payRange,
                                    to:e.target.value
                                }
                            }))
                        }}
                    />
                </div>

            </div>
        </div>,



        ["comp-mode"]: <div className="form-child">
            <Select
                label="Compensation Mode"
                onChange={handelChangeSelect}
                name="compensationId"
                value={user?.compensationId}
                options={compensationOpt}
            />
        </div>,

        ["band"]: <div className="form-child">
            <Input
                placeHolder="Enter Hierarchy"
                onChange={handleChange}
                value={user?.band}
                name="band"
                label="Hierarachy Band"
            />
        </div>,

        ["interview-rounds"]: <div className="form-child">
            <Select
                placeholder={'Select InterView Rounds'}
                label={"Interview Round"}
                name={"interviewRoundId"}
                value={user?.interviewRoundId}
                onChange={handelChangeSelect}
                options={InterViewRoundsOpt}
            />
        </div>
    }


    return (
        <div className=' h-auto w-full flex'>
            <Card className='min-h-full h-full w-full relative px-6 flex flex-col'>
                <BackButton onClick={() => { navigate(-1) }} />
                <div className=''>
                    <h3 className='text-Medium+/Title/Small mt-2'> Create New Job</h3>
                    <hr className='my-3 h-3' />
                    <div className='form-parent'>
                        <div className="form-child">
                            <Select
                                label="Profile"
                                name='profile'
                                options={profileOpt}
                                defaultValue={user?.profile}
                                value={user?.profile}
                                disabled
                                onChange={handelChangeSelect}
                            />
                        </div>
                        <div className="form-child">
                            <Select
                                label="Bussiness"
                                name="bussiness"
                                options={bussinessOpt}
                                value={user?.bussiness}
                                onChange={handelChangeSelect}
                                disabled
                            />
                        </div>
                        <div className="form-child">
                            <Input
                                label="Number of Openings"
                                name="openings"
                                value={user?.openings}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-child">
                            <Select
                                label="Country"
                                name="country"
                                options={countryOpt}
                                value={user?.country}
                                onChange={handelChangeSelect}
                                disabled
                            />
                        </div>
                        <div className="form-child">
                            <Select
                                label="State"
                                name="state"
                                options={stateOpt}
                                value={user?.state}
                                onChange={handelChangeSelect}
                                disabled
                            />
                        </div>
                        <div className="form-child">
                            <Select
                                label="City"
                                name="city"
                                options={cityOpt}
                                value={user?.city}
                                onChange={handelChangeSelect}
                                disabled
                            />
                        </div>
                    </div>

                    <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>Reporting Manager </h6>
                    <div className="form-parent">
                        <div className="form-child">
                            <TextArea
                                label="Remarks"
                                name="remarks1"
                                placeHolder="Enter Remarks"
                                value={user?.approver_1?.remarks}
                                onChange={(e)=>{
                                    setUser(prev=>({
                                        ...prev,
                                        approver_1:{
                                            ...user?.approver_1,
                                            remarks:e.target.value
                                        }
                                    }))
                                }}
                            />
                        </div>
                    </div>

                    {
                        userProfile == data?.approver_2?.profileId || userProfile == data?.approver_3?.profileId || userProfile == data?.approver_4?.profileId || userRole == "ADMIN"?
                            <>
                                <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>HR Manager</h6>

                                <div className='form-parent mt'>
                                    {
                                        data?.approver_2?.tasks?.map((i, key) => {
                                            if (i != 'modify') return (InputFileds[i])
                                        })
                                    }
                                    <div className="form-child">
                                        <TextArea
                                            label="Remark"
                                            name="remark2"
                                            placeHolder="Enter Remark"
                                            value={user?.approver_2?.remarks}
                                            onChange={(e)=>{
                                                setUser(prev=>({
                                                    ...prev,
                                                    approver_2:{
                                                        ...user?.approver_2,
                                                        remarks:e.target.value
                                                    }
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }

                    {
                        userProfile == data?.approver_3?.profileId || userProfile == data?.approver_4?.profileId || userRole == "ADMIN" ?
                            <>
                                <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>Country Head</h6>

                                <div className="form-parent">

                                    {
                                        data?.approver_3?.tasks?.map((i, key) => {
                                            if (i != 'modify') return (InputFileds[i])
                                        })
                                    }
                                    <div className="form-child">
                                        <TextArea
                                            label="Remark"
                                            name="remark2"
                                            placeHolder="Enter Remark"
                                            value={user?.approver_3?.remarks}
                                            onChange={(e)=>{
                                                setUser(prev=>({
                                                    ...prev,
                                                    approver_3:{
                                                        ...user?.approver_3,
                                                        remarks:e.target.value
                                                    }
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }



                    {
                        userProfile == data?.approver_4?.profileId || userRole == "ADMIN" ?
                            <>
                                <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>HR HEAD</h6>

                                <div className="form-parent mt-4">
                                    {
                                        data?.approver_4?.tasks?.map((i, key) => {
                                            if (i != 'modify') return (InputFileds[i])
                                        })
                                    }

                                    <div className="form-child">
                                        <TextArea
                                            label="Remark"
                                            name="remark2"
                                            placeHolder="Enter Remark"
                                            value={user?.approver_4?.remarks}
                                            onChange={(e)=>{
                                                setUser(prev=>({
                                                    ...prev,
                                                    approver_4:{
                                                        ...user?.approver_4,
                                                        remarks:e.target.value
                                                    }
                                                }))
                                            }}
                                        />
                                    </div>

                                </div>
                            </>
                            :
                            null
                    }






                </div>
                <div className='mt-[60px] flex gap-3 py-3'>
                {
                    (userProfile == data?.approver_1?.profileId&&data?.approver_1?.status=="PENDING")
                    ||
                    (userProfile == data?.approver_2?.profileId&&data?.approver_2?.status=="PENDING")
                    ||
                    (userProfile == data?.approver_3?.profileId&&data?.approver_3?.status=="PENDING")
                    ||
                    (userProfile == data?.approver_4?.profileId&&data?.approver_4?.status=="PENDING")
                    ?
                    <Button title="Approve" className='' onClick={() => updateJob(user?.status)} />
                    :
                    null
                }
                    <Button type='2' title="Reject" className='' />
                </div>

            </Card>

        </div>
    )
}

export default EditJob