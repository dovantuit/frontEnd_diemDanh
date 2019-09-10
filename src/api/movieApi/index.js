import callApi from '../helper'
import querystring from 'querystring';// để dùng querystring bên dưới



export const getMoviesCinema = (next) => {
    return callApi(`/cnm`, 'post', querystring.stringify({
        device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
        page_index: next
    }))
}
// export const getMoviesDetail = () => {
//     return callApi('/d')
// }