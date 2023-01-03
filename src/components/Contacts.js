import React , {Fragment, useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import "./Contacts.scss"
import sdk from "../sdk";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {InfinitySpin} from 'react-loader-spinner'

function Home(){

    const [contacts, setContacts] = useState([]);
    const [loader,setLoader] = useState(true)
    const getContacts = () =>{
        sdk.getContactsList().then((result) =>{
            setContacts(result);
        })

        setTimeout(()=>{
            setLoader(false)
        }, 1000)
    }

    useEffect(() => {
       getContacts()
    }, [])


    const handleDelete = async (id) =>{
        setLoader(true)
        await sdk.deleteContact(id)
        setTimeout(()=>{
            setLoader(false)
            toast.success("Contact has been deleted succesfully!", {
                position: toast.POSITION.TOP_RIGHT
              })
        }, 1000)
        getContacts()
    }
    return(
        <Fragment>
            <ToastContainer />
            <div className='all-contact__wrapper d-flex flex-column'>
            <h3>Contacts</h3>
            <Link className='d-grid gap-2 add-contact__button' to="/create">
            <Button>Add Contact</Button>
            </Link>

                <Table className="all-contacts__list" striped bordered hover size="sm" key={contacts}>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Address
                            </th>
                            <th>
                                City
                            </th>
                            <th>
                                Country
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Number
                            </th>
                            <th>
                                Edit
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loader ? <InfinitySpin 
                            width='200'
                            color="#4fa94d"
                            c
                          /> : 
                            contacts && contacts.length > 0 
                            ?
                            contacts.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.lastName}
                                        </td>
                                        <td>
                                            {item.address}
                                        </td>
                                        <td>
                                            {item.city}
                                        </td>
                                        <td>
                                            {item.country}
                                        </td>
                                        <td>
                                           {item.emails.map((email,index) => (
                                            <span className="d-flex flex-column" key={index}>{email.email}</span>
                                           ))}
                                        </td>
                                        <td>
                                        {item.numbers.map((number,index) => (
                                            <span className="d-flex flex-column" key={index}>{number.number}</span>
                                           ))}
                                        </td>
                                        <td>
                                            <Link to={'/edit'} state={{contact:item}}>
                                            <Button variant="success">Edit</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                           <tr><td colSpan="9" className="text-center text-danger">No Data Available</td></tr>
                        }
                    </tbody>
                </Table>
             
            </div>
        </Fragment>
    )
}

export default Home;