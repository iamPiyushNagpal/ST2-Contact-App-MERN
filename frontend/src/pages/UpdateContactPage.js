import {
    Box, Container, Input, Button, Heading, VStack, FormControl, FormLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const UpdateContactPage = () => {

    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/get-contact/${id}`,)
            .then(res => {
                setName(res.data.contact.name);
                setEmail(res.data.contact.email);
                setMobileNumber(res.data.contact.mobileNumber);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    const updateContactHandler = (e) => {
        e.preventDefault();
        const contact = {
            id, name, email, mobileNumber
        }

        try {
            axios.put('/update-contact', contact)
                .then(res => {
                    console.log(res.data)
                    setName("");
                    setEmail("");
                    setMobileNumber("");
                    navigate('/');
                })
                .catch((e) => {
                    console.log(e.response.data.message);
                })
        } catch (error) {
            console.log("Some error occured");
        }
    }

    return (
        <Container maxW={'container.sm'} >
            <Box maxW={'450px'} mx='auto'>
                <Heading py={5}>Update Contact</Heading>
                <form onSubmit={updateContactHandler}>
                    <VStack spacing={'2'}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input id='email' type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Mobile Number</FormLabel>
                            <Input id='mobileNumber' type='number'
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </FormControl>
                    </VStack>
                    <Button
                        type='submit' my={4} width={'100%'}
                    >Update Contact</Button>
                </form>
            </Box>
        </Container>
    );
};

export default UpdateContactPage;
