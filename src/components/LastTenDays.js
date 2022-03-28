import React,{useEffect,useState,useContext} from 'react'
import { Context } from '../context/Context';
import classes from './LastTenDays.module.css'
import LoadingIndicator from './LoadingIndicator';




export default function LastTenDays() {
    const convert = require('xml-js');
    const [loading,setLoading] = useState(false)
    const day = new Date().getDate()
    const prevDay = new Date()
    prevDay.setDate(prevDay.getDate()-12);
    const prevTenDays = prevDay.getDate()
    const month = '0'  + (1 + new Date().getMonth()) 
    const year = new Date().getFullYear()
    const obj = useContext(Context).obj
    const [lastTen,setLastTen] = useState([])
    
useEffect(()=>{
    setLoading(true)
    fetch(`/scripts/XML_dynamic.asp?date_req1=${prevTenDays}/${month}/${year}&date_req2=${day}/${month}/${year}&VAL_NM_RQ=R01235`)
    .then(response => response.text())
  .then(inputData => {
    const result1 = convert.xml2json(inputData, {compact: true, spaces: 4});
    return result1
  }).then(res=>JSON.parse(res)).then(data=>{
    setLastTen(data.ValCurs.Record)
    setLoading(false)
  })
  .catch(console.error);
},[])
if(loading){
    return <LoadingIndicator />
}
  return (
    <table className={classes.currencies}>
    <tbody>
      <tr>
        <th>Цифр. код</th>
        <th>Букв. код</th>
        <th>Единиц</th>
        <th>Курс</th>
        <th>Дата</th>
      </tr>
      {lastTen.length !== 0 &&
        lastTen.map(item => {
          return (
            <tr key={item.Value._text} className={classes.element}> 
              <td >{obj.numCode}</td>
              <td className={classes.tooltip}>{obj.charCode}
              <span className={classes.tooltiptext}>{obj.name}</span>
              </td>
              <td>{item.Nominal._text}</td>
              <td>{item.Value._text}</td>
              <td>{item._attributes.Date}</td>
            </tr>
          );
        })}
    </tbody>
  </table>
  )
}
