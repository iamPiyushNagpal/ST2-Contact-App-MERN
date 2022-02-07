import {
    Box, Container, Input, Button, Heading, VStack, FormControl, FormLabel, Text
} from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddContactPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addContactHandler = (e) => {
        e.preventDefault();
        const contact = {
            name, email, mobileNumber
        }

        try {
            axios.post('/add-contact', contact)
                .then(res => {
                    console.log(res.data)
                    setName("");
                    setEmail("");
                    setMobileNumber("");
                    setError("");
                    navigate('/');
                })
                .catch((e) => {
                    setError(e.response.data.message);
                    console.log(e.response.data.message);
                })
        } catch (error) {
            console.log("Some error occured");
        }
    }

    return (
        <Container maxW={'container.sm'}>
            <Box maxW={'450px'} mx='auto'>
                <Heading py={5}>Add New Contact</Heading>
                {error !== "" && <Text color={'red'} my={5}>{error}</Text>}
                <form onSubmit={addContactHandler}>
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
                    >Add Contact</Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddContactPage;
