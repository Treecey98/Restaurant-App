import '../index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Stack, List, ListItem, IconButton, Modal, Box, Button} from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import EditIcon from '@mui/icons-material/Edit';

function User() {

    let navigate = useNavigate();

    let {userId} = useParams();
    
    let [fullname, setName] = useState('')
    let [email, setEmail] = useState('')
    let [address1, setAddress1] = useState('')
    let [address2, setAddress2] = useState('')
    let [postcode, setPostcode] = useState('')
    let [country, setCountry] = useState('')

    let[fullAddress, setFullAddress] = useState({})

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        Axios.get(`https://easy-eats-api.onrender.com/userDetails/${userId}`).then((response) => {
            setName(response.data[0].name)
            setEmail(response.data[0].email)
            setAddress1(response.data[0].address1)
            setAddress2(response.data[0].address2)
            setPostcode(response.data[0].postcode)
            setCountry(response.data[0].country)

            setFullAddress({
                address: `${response.data[0].address1}, ${response.data[0].address2}, ${response.data[0].postcode}, ${response.data[0].country}`
            })
        })
    }, [userId, open]);

    const updateUserDetails = (data) => {
        
        Axios.put(`https://easy-eats-api.onrender.com/updateUserDetails/${userId}`, (data))

        handleClose()
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #0096FF',
        borderRadius:'5px',
        boxShadow: 24,
        p: 4,
    };

    const backButton = () => {
        navigate(`/home/${userId}`)
        sessionStorage.clear()
    }

    return (
        <>
           <div className="arrow-container">
                <p className="left-arrow"></p>
                <button onClick={()=> backButton()} className="back-button">Back</button>
            </div> 


                <div className="user-details-container">
                    <div className="user-profile-title-items">
                        <h1>{fullname}'s Profile</h1>
                        <IconButton disableRipple = "false">
                            <EditIcon 
                                fontSize="medium" 
                                style={{marginTop: 10, color: "#0096FF"}}
                                onClick={handleOpen}
                            />
                            <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <Box sx={style}>

                                    <h3 className="edit-modal-title">Edit your profile</h3>

                                    <FormContainer
                                        defaultValues={
                                            {
                                                fullname: fullname,
                                                email: email,
                                                address1: address1,
                                                address2: address2,  
                                                postcode: postcode,
                                                country: country
                                            }
                                        }

                                        onSuccess={data => updateUserDetails(data)}
                                    >  
                                        <Stack spacing={2}>
                                            <TextFieldElement name="fullname" label="Name"/>
                                            <TextFieldElement name="email" label="Email"/>
                                            <TextFieldElement name="address1" label="First line of address"/>
                                            <TextFieldElement name="address2" label="Town"/>
                                            <TextFieldElement name="postcode" label="Postcode"/>
                                            <TextFieldElement name="country" label="Country"/>

                                            <Button type={'submit'}>
                                                Submit
                                            </Button>

                                        </Stack>
                                    </FormContainer>
                                </Box>
                            </Modal>
                        </IconButton>
                    </div>
                        <List className="user-details">
                            <Stack spacing={3}>
                                <ListItem><span>Name:</span>{fullname}</ListItem>
                                <ListItem><span>Email:</span>{email}</ListItem>
                                <ListItem><span>First line of address:</span>{address1}</ListItem>
                                <ListItem><span>Town:</span>{address2}</ListItem>
                                <ListItem><span>Postcode:</span>{postcode}</ListItem>
                                <ListItem><span>Country:</span>{country}</ListItem>
                                <ListItem><span>Full address:</span>{fullAddress.address}</ListItem>
                            </Stack>
                        </List>
                </div>
            
            
        </>
    )
}

export default User