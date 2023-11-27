import axios from 'axios';

export class WeeklyService {

    getWeekly() {
        return axios.get('assets/demo/data/weekly.json').then(res => res.data.data);
    }
    
}