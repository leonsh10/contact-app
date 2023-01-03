import apiCaller from "../../helpers/apiCaller";

const deleteContact = async (id) => {

    return apiCaller.delete(`contact/delete/${id}`);
};
export default deleteContact;