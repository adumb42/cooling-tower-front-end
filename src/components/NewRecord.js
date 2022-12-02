import React, { useState, useEffect } from 'react';
import Modal from '../Modal'
import Axios from 'axios';
import moment from 'moment';
import "../styles/newrecord.css";

let currentDate = new Date()
currentDate.setDate(currentDate.getDate())
let currentYesterday = new Date()
currentYesterday.setDate(currentYesterday.getDate()-1)
let currentTime = currentDate.toLocaleTimeString("en-GB")

const NewRecord = () => {
    const [dataList, setDataList] = useState({
        date: currentDate.toISOString().substring(0, 10),
        time: currentDate.toLocaleTimeString("en-GB"),
        coolingTower: 'Turbine',
        onlineConductivity: '',
        orp: '',
        orpTarget: '',
        pH: '',
        labConductivity: '',
        freeHalogen: '',
        hardness: '',
        dipslide: '',
        hypoPumpSP: '',
        inhibitorPumpSP: '',
        comment: ''
    });
    const [resultList, setResultList] = useState([]);
    const { date, time, coolingTower, onlineConductivity, orp, orpTarget, pH, labConductivity, freeHalogen, hardness, dipslide, hypoPumpSP, inhibitorPumpSP, comment } = dataList 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [resultId, setResultId] = useState(0);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        Axios.get('https://cooling-tower-render-api.onrender.com/api/get').then((response) => {
            setResultList(response.data)
        })
    }, [])

    async function handleSubmitData() {
        console.log(resultList)
        setIsSubmitting(true)
        await Axios.post('https://cooling-tower-render-api.onrender.com/api/insert', {
            date: date,
            time: time,
            coolingTower: coolingTower,
            onlineConductivity: onlineConductivity,
            orp: orp,
            orpTarget: orpTarget,
            pH: pH,
            labConductivity: labConductivity,
            freeHalogen: freeHalogen,
            hardness: hardness,
            dipslide: dipslide,
            hypoPumpSP: hypoPumpSP,
            inhibitorPumpSP: inhibitorPumpSP,
            comment: comment
        })
        .then(res => {
            setResultList([...resultList, {
                id: res.data.insertId,
                date: date,
                time: time,
                cooling_tower: coolingTower,
                online_conductivity: onlineConductivity,
                orp: orp,
                orp_target: orpTarget,
                pH: pH,
                lab_conductivity: labConductivity,
                free_halogen: freeHalogen,
                hardness: hardness,
                dipslide: dipslide,
                hypo_pump_sp: hypoPumpSP,
                inhibitor_pump_sp: inhibitorPumpSP,
                comment: comment
        }])
            console.log(resultList)
            setIsSubmitting(false)
            resetState()  
        })
        .catch(err => {
            console.log(err);
        })
    }

    async function handleEditData(id) {
        setIsSubmitting(true)
        await Axios.put('https://cooling-tower-render-api.onrender.com/api/update', {
            pH: pH,
            labConductivity: labConductivity,
            freeHalogen: freeHalogen,
            hardness: hardness,
            dipslide: dipslide,
            hypoPumpSP: hypoPumpSP,
            inhibitorPumpSP: inhibitorPumpSP,
            comment: comment,
            id: id
        }).then(res => {
            setEditMode(false)
            let edit = resultList.filter(result => id !== result.id)
            edit.push(
                {
                    id: resultId,
                    date: date,
                    time: time,
                    cooling_tower: coolingTower,
                    online_conductivity: onlineConductivity,
                    orp: orp,
                    orp_target: orpTarget,
                    pH: pH,
                    lab_conductivity: labConductivity,
                    free_halogen: freeHalogen,
                    hardness: hardness,
                    dipslide: dipslide,
                    hypo_pump_sp: hypoPumpSP,
                    inhibitor_pump_sp: inhibitorPumpSP,
                    comment: comment
                }
            )
            setResultList(edit)
            setIsSubmitting(false)
            resetState()
        })
        .catch(err => {
            console.log(err)
        })
    }

    async function handleDeleteData(id) {
        Axios.delete(`https://cooling-tower-render-api.onrender.com/api/delete/${id}`).then((res) => {
            const del = resultList.filter(result => id !== result.id)
            setResultList(del)
        })
    }

    const handleEditMode = (id) => {
        if (!editMode || editMode && id !== resultId) {
            setEditMode(true)
            const editList = resultList.filter(result => id === result.id)
            console.log(editList)
            setDataList({
                ...dataList,
                date: editList[0].date.substring(10, 0),
                time: editList[0].time,
                coolingTower: editList[0].cooling_tower,
                onlineConductivity: editList[0].online_conductivity,
                orp: editList[0].orp,
                orpTarget: editList[0].orp_target,
                pH: editList[0].pH,
                labConductivity: editList[0].lab_conductivity,
                freeHalogen: editList[0].free_halogen,
                hardness: editList[0].hardness,
                dipslide: editList[0].dipslide,
                hypoPumpSP: editList[0].hypo_pump_sp,
                inhibitorPumpSP: editList[0].inhibitor_pump_sp,
                comment: editList[0].comment,
                id: editList[0].id
            })
        } else {
            setEditMode(false)
            resetState()
        }
        
    }

    const handleDateFormat = (date) => {
        let arr = date.substring(5, 10).split('')
        arr.splice(2, 1, '/')
        const [month, day] = arr.join('').split('/')
        return [day, month].join('/')
    }

    const resetState = () => {
        setDataList({
            date: currentDate.toISOString().substring(0, 10),
            time: currentTime,
            coolingTower: coolingTower,
            onlineConductivity: '',
            orp: '',
            orpTarget: '',
            pH: '',
            labConductivity: '',
            freeHalogen: '',
            hardness: '',
            dipslide: '',
            hypoPumpSP: '',
            inhibitorPumpSP: '',
            comment: ''
        })
    }

    // const deleteReview = (movie) => {
    //     Axios.delete(`http://localhost:3001/api/delete/${movie}`)
    // }

    // const updateReview = (movie) => {
    //     Axios.put("http://localhost:3001/api/update", {
    //         movieName: movie,
    //         movieReview: newReview
    //     })
    //     setNewReview("")
    // }

    
    return(
        <div className="container">
            <table className="data-entry">
                <thead>
                    <tr className="table-header">
                        <th className="col col-1">Date</th>
                        <th className="col col-2">Time</th>
                        <th className="col col-3">Cooling Tower</th>
                        <th className="col col-4">Online Conductivity</th>
                        <th className="col col-4">ORP</th>
                        <th className="col col-5">ORP Target</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="col col-1" label="Date">
                        <input type="date" name="date" value={date}
                            onChange={(e) => {
                                setDataList({...dataList, date: e.target.value })
                                console.log(dataList)
                            }} 
                            disabled={editMode}
                        />    
                    </td>
                    <td className="col col-2" label="Time">
                        <input type="time" name="time" value={time}
                            onChange={(e) => {
                                setDataList({...dataList, time: e.target.value })
                            }}
                            disabled={editMode}
                        />
                    </td>
                    <td className="col col-3" label="Cooling Tower">
                        <select name="cooling tower"
                            onChange={(e) => {
                                setDataList({...dataList, coolingTower: e.target.value })
                            }}
                            disabled={editMode}
                            >
                            <option name="turbine">Turbine</option>
                            <option name="panseed">Panseed</option>
                            <option name="vertical crystalliser">Vertical Crystalliser</option>
                            <option name="vacuum">Vacuum</option>
                            <option name="new">New</option>
                            <option name="csct">CSCT</option>
                            <option name="mvr">MVR</option>
                            <option name="phoenix">Phoenix</option>
                            <option name="bioethanol">Bioethanol</option>
                        </select>
                    </td>
                    <td className="col col-4" label="Online Conductivity">
                        <input type="number" name="online conductivity" value={onlineConductivity}
                            onChange={(e) => {
                                setDataList({...dataList, onlineConductivity: e.target.value })
                            }}
                            disabled={editMode}
                        />
                    </td>
                    <td className="col col-4" label="ORP">
                        <input type="number" name="orp" value={dataList.orp}
                            onChange={(e) => {
                                setDataList({...dataList, orp: e.target.value })
                            }}
                            disabled={editMode}
                        />
                    </td>
                    <td className="col col-5" label="ORP Target">
                        <input type="number" name="orp target" value={dataList.orpTarget}
                            onChange={(e) => {
                                setDataList({...dataList, orpTarget: e.target.value })
                            }}
                            disabled={editMode}
                        />
                    </td>
                    </tr>
                </tbody>
            </table>
            <table className="data-entry">
                <thead>
                    <tr className="table-header">
                        <th className="col col-6">pH</th>
                        <th className="col col-7">Lab Conductivity</th>
                        <th className="col col-8">Free Halogen</th>
                        <th className="col col-9">Hardness</th>
                        <th className="col col-10">Dipslide</th>
                    </tr>
                </thead>
                <tbody>
                    <td className="col col-6" label="pH">
                        <input type="number" name="pH" value={dataList.pH}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, pH: e.target.value })
                            }}
                        />
                    </td>
                    <td className="col col-7" label="Lab Conductivity">
                        <input type="number" name="lab conductivity" value={dataList.labConductivity}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, labConductivity: e.target.value })
                            }}
                        />
                    </td>
                    <td className="col col-8" label="Free Halogen">
                        <input type="number" name="free halogen" value={dataList.freeHalogen}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, freeHalogen: e.target.value })
                            }}
                        />
                    </td>
                    <td className="col col-9" label="Hardness">
                        <input type="number" name="hardness" value={dataList.hardness}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, hardness: e.target.value })
                            }}
                        />
                    </td>
                    <td className="col col-10" label="Dipslide">
                        <input type="number" name="dipslide" value={dataList.dipslide}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, dipslide: e.target.value })
                            }}
                        />
                    </td>
                </tbody>
            </table>
            <table className="data-entry">
                <thead>
                    <tr className="table-header">
                        <th className="col col-11">Hypo Pump SP</th>
                        <th className="col col-12">Inhibitor Pump SP</th>
                    </tr>
                </thead>
                <tbody>
                    <td className="col col-11" label="Hypo Pump SP">
                        <input type="number" name="hypo pump sp" value={dataList.hypoPumpSP}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, hypoPumpSP: e.target.value })
                            }}
                        />
                    </td>
                    <td className="col col-12" label="Inhibitor Pump SP">
                        <input type="number" name="inhibitor pump sp" value={dataList.inhibitorPumpSP}
                            style={{
                                backgroundColor: editMode ? 'orange' : ''
                            }}
                            onChange={(e) => {
                                setDataList({...dataList, inhibitorPumpSP: e.target.value })
                            }}
                        />
                    </td>
                </tbody>
            </table>
            <section className="comment">
                <textarea className="comment-box" id="" cols="100" rows="5" placeholder={editMode ? `${dataList.comment}` : 'Type your comment...'}
                    style={{
                        backgroundColor: editMode ? 'orange' : ''
                    }}
                    value = {dataList.comment}
                    onChange={(e) => {
                        setDataList({...dataList, comment: e.target.value })
                    }}
                >
                </textarea>
                {editMode ? 
                    <button disabled={isSubmitting} className={"submit__button--editing"} onClick={() => {handleEditData(resultId)}}>
                        {isSubmitting ? (<div className="submit__button--loading"></div>) : (<div>Resubmit</div>)}
                    </button>
                    :
                    <button disabled={isSubmitting} className={"submit__button"} onClick={() => {handleSubmitData()}}>
                        {isSubmitting ? (<div className="submit__button--loading"></div>) : (<div>Submit</div>)}
                    </button>
                }
            </section>
            <div className="container">
                <h5></h5>
                Recent Records
                <table className="data-entry-two">
                    <thead>
                        <tr className="table-header">
                            <th className="col col-3">Cooling Tower</th>
                            <th className="col col-1">Date/Time</th>
                            <th className="col col-4">Edit Record</th>
                            <th className="col col-5">Delete Record</th>
                        </tr>
                    </thead>
                    <tbody>
                    {resultList.filter(data => data.date.substring(0, 10) <= moment().toISOString().substring(0, 10) && data.date.substring(0, 10) > moment().subtract(1, 'days').toISOString().substring(0, 10))
                        .reverse()
                        .sort((a, b) => {
                            return a.id > b.id ? -1 : 1
                        })
                        .map((data) => (
                            <tr 
                                style={{
                                    backgroundColor: data.id === resultId && editMode ? 'orange' : ''
                                }}
                            >
                                <td className="col col-3" label="Cooling Tower">
                                    {data.cooling_tower}
                                </td>
                                <td className="col col-1" label="Date/Time">
                                    {`${handleDateFormat(data.date)} at ${data.time}`}
                                </td>
                               <td className="col col-4" label="">
                                    <button className="edit__button" onClick= {() => {
                                        setResultId(data.id)
                                        handleEditMode(data.id)
                                    }}>
                                        {data.id === resultId && editMode ? 'Editing' : 'Edit'}
                                    </button>
                               </td>
                               <td className="col col-5" label="">
                                    <button className="delete__button" onClick = {() => {
                                        setShowModal(true) 
                                        setResultId(data.id)}}
                                    >
                                        Delete
                                    </button>
                               </td>
                            </tr>            
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal title="Delete Record" buttoncaption="Yes" onClose={() => setShowModal(false)} show={showModal} id={resultId} onSubmit={() => {
                handleDeleteData(resultId)
                setShowModal(false)
                }}>
                <p>{`Are you sure you want to delete this record?`}</p>
            </Modal>
        </div>
    )
}

export default NewRecord;