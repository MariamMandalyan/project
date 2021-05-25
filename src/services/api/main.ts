import authApi from "./authInstance"
import keys from "../keys";

interface IMain {
}
class Main implements IMain {
    
  
    async getUsers({maxAge,minAge,city,country,targetGender,lat,lng,page,limit}: any) {
        try {
            let data = { minAge: minAge, maxAge:  maxAge, city: city, country: country, targetGender: targetGender, lat: lat, lng:lng, page:page, limit: limit}            
            const response = await authApi.post(`${keys.API_URL}/users/search`, data);                        
            return response.data
        } catch (ex) {
            console.log(ex.response,"error");
        }
    }
    
}

const main = new Main();
export default main;