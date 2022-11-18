import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import Axios from 'axios';
import { DateRangePicker } from 'react-dates';
import { BiCommentDetail } from 'react-icons/bi';
import "../styles/datatable.css"
import moment from 'moment';

const DataTable = () => {
    const [resultList, setResultList] = useState([]);
    const [coolingTower, setCoolingTower] = useState('Select Tower');
    const [focusedInput, setFocusedInput] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentComment, setCurrentComment] = useState('');
    const [data, setData] = useState({
        type: "",
        startDate: moment().subtract(7, 'd'),
        endDate: moment()
    });

    useEffect(() => {
        Axios.get('http://coolingtowersql-env.eba-tpdbwark.eu-west-2.elasticbeanstalk.com/api/get').then((response) => {
            setResultList(response.data)
        })
    }, [])

    const handleDateChange = (startDate, endDate) => {
        setData({ ...data, startDate, endDate });
    }

    const handleDateFormat = (date) => {
        let arr = date.substring(5, 10).split('')
        arr.splice(2, 1, '/')
        const [month, day] = arr.join('').split('/')
        return [day, month].join('/')
    }

    const returnCoolingTowers = () => {
        const towerArray = resultList.filter(result => result.cooling_tower === coolingTower).map(result => result.cooling_tower)
        return towerArray.length
    }

    return (
        <div className="container">
            <div className="filters">
                <DateRangePicker
                    startDate={data.startDate}
                    minDate={new Date()}
                    startDateId={"start"}
                    endDate={data.endDate}
                    endDateId={"end"}
                    onDatesChange={({ startDate, endDate }) => handleDateChange(startDate, endDate)}
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    displayFormat="DD-MM-YY"
                    isOutsideRange={() => false}
                />
            <select
                className="tower__select"
                onChange={(e) => {
                    setCoolingTower(e.target.value)
                    console.log(e.target.value)
                }}>
                <option name="select tower">Select Tower</option>
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
            </div>
            <table className='data__table'>
                <thead>
                    <tr className={returnCoolingTowers() !== 0 ? "table__header" : "table__header__hidden"}>
                        <th className="col col-1">Date</th>
                        <th className="col col-2">Time</th>
                        <th className="col col-4">Online Conductivity</th>
                        <th className="col col-4">ORP</th>
                        <th className="col col-5">ORP Target</th>
                        <th className="col col-6">pH</th>
                        <th className="col col-7">Lab Conductivity</th>
                        <th className="col col-8">Free Halogen</th>
                        <th className="col col-9">Hardness</th>
                        <th className="col col-10">Dipslide</th>
                        <th className="col col-11">Hypo Pump SP</th>
                        <th className="col col-12">Inhibitor Pump SP</th>
                        <th className="col col-13">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resultList.filter(result => result.cooling_tower === coolingTower)
                        .reverse()
                        .map((result) => (

                        <tr>
                            <td className="col col-1" label="Date">
                                {handleDateFormat(result.date)}
                            </td>
                            <td className="col col-2" label="Time">
                                {result.time}
                            </td>
                            <td className="col col-4" label="Online Conductivity">
                                {result.online_conductivity}
                            </td>
                            <td className="col col-4" label="ORP">
                                {result.orp}
                            </td>
                            <td className="col col-5" label="ORP Target">
                                {result.orp_target}
                            </td>
                            <td className="col col-6" label="pH">
                                {result.pH}
                            </td>
                            <td className="col col-7" label="Lab Conductivity">
                                {result.lab_conductivity}
                            </td>
                            <td className="col col-8" label="Free Halogen">
                                {result.free_halogen}
                            </td>
                            <td className="col col-9" label="Hardness">
                                {result.hardness}
                            </td>
                            <td className="col col-10" label="Dipslide">
                                {result.dipslide}
                            </td>
                            <td className="col col-11" label="Hypo Pump SP">
                                {result.hypo_pump_sp}
                            </td>
                            <td className="col col-12" label="Inhibitor Pump SP">
                                {result.inhibitor_pump_sp}
                            </td>
                            <td className="col col-13" label="Comments" onClick={() => {
                                console.log(currentComment)
                                setCurrentComment(result.comment)
                                setShowModal(true)
                            }}>
                                <BiCommentDetail />
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
            <Modal title="Comments" buttoncaption="Close" onClose={() => setShowModal(false)} show={showModal} onSubmit={() => {
                setShowModal(false)
            }}>
                <p>{currentComment}</p>
            </Modal>
        </div>
        
    )
}

export default DataTable
