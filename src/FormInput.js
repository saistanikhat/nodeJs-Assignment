import React, { Component } from 'react';

class FormInput extends Component {

// url='http://avoindata.prh.fi/bis/v1'; - original url
// extraParams='totalResults=false&maxResults=10&resultsFrom=0&companyRegistrationFrom=2014-02-28';
// If extraParams(mandate, but not asked here as input or provided) not appended, it gives Bad Request - Error 400; verified in http://avoindata.prh.fi/ytj.html
url='http://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0&companyRegistrationFrom=2014-02-28';

constructor(props) {
    super(props);
    this.state = {
        params:{
            bId:'',
            bName:''
        },
        queryString:''
    };
}

//QueryBuilder
buildUrl=(url, parameters)=>{
    let qs = "", value='';
    for(let key in parameters) {
        let value = parameters[key];
        value=parameters[key];
        if(value.length>0){
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0){
        qs = qs.substring(0, qs.length-1); //chop off last "&"
        // url = url + "?" + qs;
        url = url + "&" + qs;
    }
    return url;
}

handleInputChange(paramKey, event){
    let params=this.state.params, 
        queryString=this.state.queryString,
        url=this.url;

    Object.keys(params).map(val=>{
        if(val===paramKey){
            params[paramKey]=event.target.value;
        }
    });
    queryString=this.buildUrl(url,params);
    this.setState({queryString, params});
}

// navigates to modified url
submitHandler=()=>{
    let queryString=this.state.queryString;
    if(queryString.length===0){
        queryString=this.url;
    }
    window.open(queryString);
    //response to be fetched and 'nextResultsUri' to be checked by bacend nodejs
}

  render() {
    return (
      <div className="formInput">
        <div className="inputField">
            <label forHtml="businessId" className="inputFieldLabel" >Business ID:</label>
            <input name="bId" className="inputFieldText" type="text" placeholder="Enter Business ID" value={this.state.params.bId} onChange={this.handleInputChange.bind(this, 'bId')} />
        </div>
        <div className="inputField">
            <label forHtml="businessName" className="inputFieldLabel" >Business Name:</label>
            <input name="bName" className="inputFieldText" type="text" placeholder="Enter Business Name" value={this.state.params.bName} onChange={this.handleInputChange.bind(this, 'bName')} />
        </div>
        <div className="submit"><button type="submit" onClick={this.submitHandler}>Submit</button></div>
      </div>
    );
  }
}

export default FormInput;
