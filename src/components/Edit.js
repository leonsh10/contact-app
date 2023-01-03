import React, {useState,useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useLocation} from 'react-router-dom';
import sdk from "../sdk";
function Edit(){
    
    const location = useLocation()
    let con = location.state.contact;

    const [tempContact,setTempContact] = useState();
    const [changed,setChanged] = useState(false);

    const [allEmails, setAllEmails] = useState([{ email: "" }]);
    const [allNumbers, setAllNumbers] = useState([{ number: "" }]);
    const handleEmailsAdd = () => {
        setAllEmails([...allEmails, {email : ""}])
    }
    const handleNumbersAdd = () => {
        setChanged(true)
        setAllNumbers([...allNumbers, {number : ""}])
    }

    const handleEmailsChange = (e,index) =>{
        setChanged(true)
        const {name, value} = e.target
        const list = [...allEmails];
        list[index][name] = value;
        setAllEmails(list)
    }

   

    const handleNumbersOrContactRemove = (type,fields,index) => {
        setChanged(true)
        const list = [...fields];
        list.splice(index,1);
        type === 'numbers' ? setAllNumbers(list) : setAllEmails(list)
    }

    const handleNumbersChange = (e,index) =>{
        setChanged(true)
        const {name, value} = e.target
        const list = [...allNumbers];
        list[index][name] = value;
        setAllNumbers(list)
    }

    
    useEffect(()=>{
        setTempContact(con);
        setAllEmails([...con.emails])
        setAllNumbers([...con.numbers])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const [validation,setValidation] = useState(false);

    useEffect(() => {
        if(tempContact && (!tempContact.name.trim().length || !tempContact.lastName.trim().length || !tempContact.address.trim().length)){
            setValidation(true)
        }
        else{
            setValidation(false)
        }
    })


    

    let history = useNavigate();
    const handleEdit = async (c) =>{
        c.preventDefault();
        tempContact.emails = allEmails
        tempContact.numbers = allNumbers
        await sdk.editContact(tempContact)
        history("/");
    }

    return(
        <div className='edit-contact__form'>
            <h3>Edit {tempContact?.name}</h3>
             <Form className="mt-3">
                <Form.Group className="mb-1" controlId="name">
                <Form.Label>*Name:</Form.Label>
                    <Form.Control type="text"                    
                        defaultValue={tempContact?.name}
                        placeholder="Enter Name"
                        required
                        onChange={(c)=>{
                            setChanged(true);
                        setTempContact({
                            ...tempContact,
                            name:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="lastName">
                <Form.Label>*Last Name:</Form.Label>
                    <Form.Control
                     type="text"
                      defaultValue={tempContact?.lastName}
                       placeholder="Enter Last Name"
                        required
                        onChange={(c)=>{
                            setChanged(true);
                            setTempContact({
                                ...tempContact,
                                lastName:c.target.value
                            })
                         }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="address">
                <Form.Label>*Address:</Form.Label>
                    <Form.Control type="text"
                     defaultValue={tempContact?.address}
                      placeholder="Enter Address"
                       required
                       onChange={(c)=>{
                            setChanged(true);
                            setTempContact({
                            ...tempContact,
                            address:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="city">
                <Form.Label>City:</Form.Label>
                    <Form.Control 
                    type="text" 
                    defaultValue={tempContact?.city} 
                    placeholder="Enter City" 
                    required 
                    onChange={(c)=>{
                            setChanged(true);
                            setTempContact({
                            ...tempContact,
                            city:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="country">
                <Form.Label>Country:</Form.Label>
                    <Form.Control 
                    type="text" 
                    defaultValue={tempContact?.country} 
                    placeholder="Enter Country"
                    onChange={(c)=>{
                            setChanged(true);
                            setTempContact({
                            ...tempContact,
                            country:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="email">
                   
                        <Form.Label>Email:</Form.Label>
                        {allEmails.map((singleEmail,index) =>(
                <div key={index} className="d-flex">
                    <Form.Control 
                    className={allEmails.length > 1 ? 'mt-1' : ''}
                    type="text"
                    placeholder="Enter Email" 
                    style={index === 0 ? {} : {marginRight:20}}
                    name="email"
                    value={singleEmail.email}
                    onChange={
                        (e) => 
                            handleEmailsChange(e,index)
                        } 
                    >
                    </Form.Control>
                    {allEmails.length > 1 && index !== 0 && (
                    <Button onClick={() => handleNumbersOrContactRemove('emails',allEmails,index)} style={allEmails.length > 1 ? {width:75,alignSelf:'end', marginTop:5} : {}}>Delete</Button>
                    )}
                  
                </div>

))}
<div className="add-button__wrapper">
<Button style={allNumbers.length > 1 ? {width:55,marginTop:5} : {}} onClick={handleEmailsAdd}>Add</Button>
</div>
                </Form.Group>
                <Form.Group className="mb-1" controlId="number">
                   
                   <Form.Label>Number:</Form.Label>
                   {allNumbers.map((singleNumber,index) =>(
           <div key={index} className="d-flex">
               <Form.Control 
               className={allNumbers.length > 1 ? 'mt-1' : ''}
               type="number"
               placeholder="Enter Number" 
               style={index === 0 ? {} : {marginRight:20}}
                    name="number"
               value={singleNumber.number}
               onChange={(e) => 
                handleNumbersChange(e,index)}
               >
               </Form.Control>
               {allNumbers.length > 1 && index !== 0 && (
               <Button onClick={() => 
                handleNumbersOrContactRemove('numbers',allNumbers,index)} style={allNumbers.length > 1 ? {width:75,alignSelf:'end', marginTop:5} : {}}>Delete</Button>
               )}
             
           </div>

))}
<div className="add-button__wrapper">
<Button style={allNumbers.length > 1 ? {width:55,marginTop:5} : {}} onClick={handleNumbersAdd}>Add</Button>
</div>
           </Form.Group>

                <Button className="mb-3" disabled={!changed || validation } onClick={(c) => handleEdit(c)}  type="submit">Edit</Button>
            </Form>
        </div>
    )
}

export default Edit;


