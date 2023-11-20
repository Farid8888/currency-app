import React,{useEffect,useContext,useState} from 'react'
import { Context } from './context/Context';
import './App.css';
import Currency from './components/Currency';
import LastTenDays from './components/LastTenDays';
import {Routes,Route} from 'react-router-dom'


function App() {
  // var convert = require('xml-js');
  const currHandler=useContext(Context).handler
  const [url,setUrl] = useState('')
  useEffect(()=>{
    const responseHandler=async()=>{
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      const data = await response.json()
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
      setUrl(data.PreviousURL)
      currHandler(currArr)
    }

   
    responseHandler()

   },[currHandler])
   
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Currency url={url}/>}/>
        <Route path='/:id' element={<LastTenDays/>}/>
      </Routes>
    </div>
  );
}

export default App;
