import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import {fetchCountries}  from '../../api'

const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const isCancelled = false;
        const fetchApi = async () => {
            if(!isCancelled){
                setFetchedCountries(await fetchCountries());
            }
        }
        fetchApi();

        return () => {
            isCancelled = true
        }
    }, [])
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
