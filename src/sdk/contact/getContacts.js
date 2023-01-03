import apiCaller from "../../helpers/apiCaller";

const getContactsList = async () => {
    const {data} = await apiCaller.get("contact/list");
    return data
}

export default getContactsList;