import React, { Component } from 'react';
import styles from './App.module.css';

import {Cards, Chart, CountryPicker} from "./components";
import {fetchData} from './api';
import covid from './images/covid.png';

class App extends Component {
    state = {
        data: {},
        country: ''
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData})
    }

    handleCountryChange = async country => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country});
    }

    isEmpty = obj => {
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true
    }

    render() {
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                {!this.isEmpty(data) && <img className={styles.image} src={covid} alt="covid-image"/>}
                <Cards data={data}/>
                {!this.isEmpty(data) &&  <CountryPicker handleCountryChange={this.handleCountryChange}/>}
                {!this.isEmpty(data) && <Chart data={data} country={country}/>}
            </div>
        )
    }
}

export default App
