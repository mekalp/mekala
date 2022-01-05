import React from 'react'

import MapboxAutocomplete from "react-mapbox-autocomplete"
import {DatePicker,Select} from "antd"
import moment from "moment"


const {Option}= Select

const config = {
    token: "pk.eyJ1IjoibWVrYWxwIiwiYSI6ImNreHQ4YjA0NzBpNDQydXBocmpkbGFmeGcifQ.pwdtTyPU02P67Fqq1L-aaA",
  };



const HotelCreateForm = (props) => {

const {values,setValues,handleChange,handleImageChange,handleSubmit} = props
const {title, content, price,location}= values

  function _suggestionSelect(result, lat, long, text){

    setValues({...values,location: result})
  }



    return (
        
        <form onSubmit={handleSubmit}> 

        <div className="form-group">
        
            <label className="btn btn-outline-secondary btn-block m-2 text-left">Image
        
           <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden />
        
            </label>
        
        
        <input type="text" name="title" onChange={handleChange} placeholder="title" value={title}  className="form-control m-2" />
        <textarea name="content" onChange={handleChange} placeholder="content" value={content}  className="form-control m-2" />
        
        
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
        
        <input type="number" name="price" onChange={handleChange} placeholder="price" value={price}  className="form-control m-2" />
        {/* <input type="number" name="bed" onChange={handleChange} placeholder="Number of beds" value={bed}  className="form-control m-2" /> */}
        
        <Select onChange={(value)=>setValues({...values,bed:value})} className="w-100 m-2" size="large" placeholder="Number of beds">
        
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
        
        </Select>
        
        
        </div>
        
        <DatePicker placeholder="From date" className="form-control m-2" onChange={(date, dateString)=>setValues({...values, from:dateString })} disabledDate={(current)=>current&&current.valueOf() < moment().subtract(1,"days")}  />
        <DatePicker placeholder="To date" className="form-control m-2" onChange={(date,dateString)=>setValues({...values, to:dateString })} disabledDate={(current)=>current&&current.valueOf() < moment().subtract(1,"days")}  />
        
        
        
        
        <button className="btn btn-outline-primary m-2">SAVE</button>
        
        
        
        </form>
        
    )
}

export default HotelCreateForm


