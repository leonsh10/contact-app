import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import sdk from "../sdk";
function Add(){
    
    let con = {
        id:'',
        name:'',
        lastName:'',
        address:'',
        country:'',
        city:'',
        emails:[],
        numbers:[],
    }

    const [allEmails, setAllEmails] = useState([{ email: "" }]);
    const [allNumbers, setAllNumbers] = useState([{ number: "" }]);
    const handleEmailsAdd = () => {
        setAllEmails([...allEmails, {email : ""}])
    }
    const handleNumbersAdd = () => {
        setAllNumbers([...allNumbers, {number : ""}])
    }

    const handleEmailsChange = (e,index) =>{
        const {name, value} = e.target
        const list = [...allEmails];
        list[index][name] = value;
        setAllEmails(list)
    }

    const handleNumbersOrContactRemove = (type,fields,index) => {
        const list = [...fields];
        list.splice(index,1);
        type === 'numbers' ? setAllNumbers(list) : setAllEmails(list)
    }
  

    const handleNumbersChange = (e,index) =>{
        const {name, value} = e.target
        const list = [...allNumbers];
        list[index][name] = value;
        setAllNumbers(list)
    }

    const [tempContact,setTempContact] = useState();

    const [validation,setValidation] = useState(false);

    
    useEffect(()=>{
        setTempContact(con);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if(tempContact && (!tempContact.name.trim().length || !tempContact.lastName.trim().length || !tempContact.address.trim().length)){
            setValidation(true)
        }
        else{
            setValidation(false)
        }
    }, [tempContact])

    let history = useNavigate();

    const handleSubmit = (c) =>{
        c.preventDefault();
        tempContact.emails = allEmails
        tempContact.numbers= allNumbers
        sdk.createContact(tempContact)
        history("/");
    }

    return(
        <div className='edit-contact__form'>
            <h3>Register new contact</h3>
             <Form className="mt-3">
                <Form.Group className="mb-1" controlId="formName">
                <Form.Label>*Name:</Form.Label>
                    <Form.Control type="text"                    
                        placeholder="Enter Name"
                        required
                        onChange={(c)=>{
                        setTempContact({
                            ...tempContact,
                            name:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formLastName">
                <Form.Label>*Last Name:</Form.Label>
                    <Form.Control
                     type="text"
                       placeholder="Enter Last Name"
                        required
                        onChange={(c)=>{
                            setTempContact({
                                ...tempContact,
                                lastName:c.target.value
                            })
                         }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formAddress">
                <Form.Label>*Address:</Form.Label>
                    <Form.Control type="text"
                      placeholder="Enter Address"
                       required
                       onChange={(c)=>{
                            
                            setTempContact({
                            ...tempContact,
                            address:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formCity">
                <Form.Label>City:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter City" 
                    required 
                    onChange={(c)=>{
                            
                            setTempContact({
                            ...tempContact,
                            city:c.target.value
                        })
                     }}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formCountry">
                <Form.Label>Country:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Country" 
                    required 
                    onChange={(c)=>{
                            
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
                    required 
                    name="email"
                    value={singleEmail.email}
                    onChange={(e) => handleEmailsChange(e,index)}
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
                    required 
                    name="number"
                    value={singleNumber.number}
                    onChange={(e) => handleNumbersChange(e,index)}
                    >
                    </Form.Control>
                    {allNumbers.length > 1 && index !== 0 && (
                    <Button onClick={() => handleNumbersOrContactRemove('numbers',allNumbers,index)} style={allNumbers.length > 1 ? {width:75,alignSelf:'end', marginTop:5} : {}}>Delete</Button>
                    )}
                  
                </div>

))}
<div className="add-button__wrapper">
<Button style={allNumbers.length > 1 ? {width:55,marginTop:5} : {}} onClick={handleNumbersAdd}>Add</Button>
</div>
                </Form.Group>

                <Button disabled={validation} className="mb-3" onClick={(c) => handleSubmit(c)}  type="submit">Save</Button>
            </Form>
        </div>
    )
}

export default Add;