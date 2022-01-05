import React,{useState} from 'react'
import {DatePicker,Select} from "antd"
import {SearchOutlined} from "@ant-design/icons"
import MapboxAutocomplete from "react-mapbox-autocomplete"
import moment from "moment"
import {useHistory} from "react-router-dom"


///Destructuring the values from ant components///

const {RangePicker} = DatePicker
const{Option}=Select




const config = {
    token: "pk.eyJ1IjoibWVrYWxwIiwiYSI6ImNreHQ4YjA0NzBpNDQydXBocmpkbGFmeGcifQ.pwdtTyPU02P67Fqq1L-aaA",
  };




const Search = () => {

const [location, setLocation] = useState("")
const [date,setDate]=useState("")
const [bed,setBed]=useState("")

const history = useHistory()



function _suggestionSelect(result, lat, long, text){

    setLocation({location: result})
  }




const handleSubmit=()=>{

history.push(`/search-result?location = ${location}&date=${date}&bed=${bed}`)


}

    return (

        <div className="d-flex pb-4">

         <div className="w-100">

         <MapboxAutocomplete
                  name="location"
                  placeholder="Location"
                  defaultValue={location}
                  publicKey={config.token}
                  inputClass="form-control search m-2"
                  onSuggestionSelect={_suggestionSelect}
                //   country="in"
                  resetSearch={false}
                />

         </div>
   
   <RangePicker className="w-100" onChange={(value, dateString)=>setDate(dateString)} disabledDate={(current)=>current&&current.valueOf() < moment().subtract(1,"days")} />

   <Select onChange={(value)=>setBed(value)} className="w-100" size="large" placeholder="Number of beds">
        
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
        
        </Select>
        

<SearchOutlined  onClick={handleSubmit} className="btn btn-primary p-3 btn-square"/>




         

            
        </div>
    )
}



export default Search
