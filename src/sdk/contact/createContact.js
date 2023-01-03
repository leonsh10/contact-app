import apiCaller from "../../helpers/apiCaller";

const createContact = async (contactBody) => {
    const {data} = await apiCaller.post("contact/create", contactBody);

    return data;
};

export default createContact;