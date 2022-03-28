import React, { useContext,useEffect,useState } from "react";
import classes from "./Currency.module.css";
import { Context } from "../context/Context";
import {BsArrowDown,BsArrowUp} from 'react-icons/bs'
import {useNavigate,useLocation} from 'react-router-dom'

export default function Currency(props) {
  const currencies = useContext(Context).currencies;
  const objHandler = useContext(Context).objHandler
  const history = useNavigate()
  const location = useLocation()
  const [prevCurr,setPrevCurrency] = useState([])
  const prevHandler=(curr)=>{
      setPrevCurrency(prevst=>{
          return prevst.concat(curr)
      })
  }
useEffect(()=>{
    const prevFunction=async()=>{
        const responseData = await fetch(props.url)
        const data = await responseData.json()
        let currArr =[]
       currArr.push(data.Valute.AUD)
       currArr.push(data.Valute.AZN)
       currArr.push(data.Valute.GBP)
       currArr.push(data.Valute.AMD)
       currArr.push(data.Valute.BYN)
       currArr.push(data.Valute.BGN)
       currArr.push(data.Valute.BRL)
       currArr.push(data.Valute.HUF)
       currArr.push(data.Valute.HKD)
       currArr.push(data.Valute.DKK)
       currArr.push(data.Valute.USD)
       currArr.push(data.Valute.EUR)
       currArr.push(data.Valute.INR)
       currArr.push(data.Valute.CAD)
       currArr.push(data.Valute.KGS)
       currArr.push(data.Valute.CNY)
       currArr.push(data.Valute.MDL)
       currArr.push(data.Valute.NOK)
       currArr.push(data.Valute.PLN)
       currArr.push(data.Valute.RON)
       currArr.push(data.Valute.XDR)
       currArr.push(data.Valute.SGD)
       currArr.push(data.Valute.TJS)
       currArr.push(data.Valute.TRY)
       currArr.push(data.Valute.TMT)
       currArr.push(data.Valute.UZS)
       currArr.push(data.Valute.UAH)
       currArr.push(data.Valute.CZK)
       currArr.push(data.Valute.SEK)
       currArr.push(data.Valute.CHF)
       currArr.push(data.Valute.ZAR)
       currArr.push(data.Valute.JPY)
       prevHandler(currArr)
      }
      props.url && prevFunction()
},[props.url])


  let general =[]
  if (currencies.length !== 0 && prevCurr.length !==0 && props.url !== '') {
      for(let i=0;i<currencies.length;i++){
          for(let y=0;y<prevCurr.length;y++){
              if(i===y){
                  const currentValue = currencies[i].Value
                  const prevValue = prevCurr[y].Value
                  const c = +(currencies[i].Value/prevCurr[y].Value)
                   if(currentValue>=prevValue){
                      general.push(((c - 1)*100).toFixed(2))
                   }else{
                    general.push(((1 - c)*100).toFixed(2)) 
                   }
              }
          }
      }
  }
const linkHandler=(ID,obj)=>{
     objHandler(obj)
   return history(location.pathname + ID)
    
}

  return (
    <table className={classes.currencies}>
      <tbody>
        <tr>
          <th>Цифр. код</th>
          <th>Букв. код</th>
          <th>Единиц</th>
          <th>Изм. курса (За пред. день)</th>
          <th>Курс</th>
        </tr>
        {currencies.length !== 0 &&
          currencies.map((item,i) => {
            return (
              <tr key={item.ID} className={classes.element} type='button' onClick={()=>linkHandler(item.ID,{numCode:item.NumCode,charCode:item.CharCode,name:item.Name})}> 
                <td >{item.NumCode}</td>
                <td className={classes.tooltip}>{item.CharCode}
                <span className={classes.tooltiptext}>{item.Name}</span>
                </td>
                <td>{item.Nominal}</td>
                {+general[i]>1 ? <td className={classes.up}>
                    {general.length !==0 ? <div className={classes.icon}>
                    <BsArrowUp/>{general[i] + '%'}
                    </div> : ''}
                    </td> : 
                    <td className={classes.down}>
                        {general.length !==0 ? <div className={classes.icon}>
                        <BsArrowDown/>{general[i] + '%'}
                        </div> : ''}
                        </td>}
                <td>{item.Value}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
