import axios from 'axios';

const cropUrl = 'http://localhost:3001/crops';

export class CropService {

    getCrop(cropData) {
        console.log(cropData);
        return axios.post(cropUrl, {
            cropData: cropData
        }).then(res => res.data);
        
    }

    sendWeeklyCrop(cropData) {
        console.log(cropData);
        return axios.post('http://localhost:3001/api/weekly/addcrop', cropData).then(res => res.data);
    }

    getWeeklyCrop(cropData) {
        return axios.post('http://localhost:3001/api/weekly/getcrop', cropData).then(res => res.data);
    }

    pricePrediction(cropData) {
        console.log(cropData);
        return axios.post('http://localhost:3001/pricepredict', {cropData}).then(res => res.data);
    }   

}