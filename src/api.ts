import axios from 'axios';

const baseApi = 'https://corona.lmao.ninja/v2';
// api docs here: https://corona.lmao.ninja/docs/
const timelineLimit = 7;

export const loadCountryCases = async (countryCode: string) => {
    let response;
    try {
        response = await axios.get(`${baseApi}/countries/${countryCode}`);
    } catch (error) {
        return null;
    }
    const countryData = response.data;
    return {
        totalCases: {
            total: countryData.cases,
            deaths: countryData.deaths,
            active: countryData.active,
            recoveries: countryData.recovered
        },
        todayCases: {
            total: countryData.cases,
            deathsToday: countryData.todayDeaths,
            newCases: countryData.todayCases,
            recoveriesToday: countryData.todayRecovered
        }
    }
   
}




export const loadGlobalCases = async () => {
    let response;
    try {
        response = await axios.get(`${baseApi}/all`);
    } catch (error) {
        return null;
    }
    const globalData = response.data;
    return {
        totalCases: {
            total: globalData.cases,
            deaths: globalData.deaths,
            active: globalData.active,
            recoveries: globalData.recovered
        },
        todayCases: {
            total: globalData.cases,
            deathsToday: globalData.todayDeaths,
            newCases: globalData.todayCases,
            recoveriesToday: globalData.todayRecovered
        }
    }
}


export const loadCountryTimeline = async (countryCode: string) => {
    let response;
    try {
        response = await (await axios.get(`${baseApi}/historical/${countryCode}?lastdays=${timelineLimit}`)).data;    
    } catch (error) {
        return null;
    }
    
    if (response.timeline) {
        return response.timeline;
    } else {
        return null;
    }
}


export const loadGlobalTimeline = async () => {
    let response;
    try {
        response = await (await axios.get(`${baseApi}/historical/all?lastdays=${timelineLimit}`)).data;    
    } catch (error) {
        return null;
    }
    
    if (response) {
        return response;
    } else {
        return null;
    }
}