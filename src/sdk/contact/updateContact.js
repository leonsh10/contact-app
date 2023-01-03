import apiCaller from "../../helpers/apiCaller";

const editContact = async (contactBody) =>{
    const {data} = await apiCaller.put(
        "contact/update",
        {...contactBody}
    );

    return data;
}

export default editContact;