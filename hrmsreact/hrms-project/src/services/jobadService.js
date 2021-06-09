import axios from "axios"

export default class JobadService{
    getJobad(){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAll")
    }
}
