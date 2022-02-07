import React, { useEffect, useState } from 'react';
import {
    Center, Container, Input, Table, Thead, Tbody, Tr, Th, Td, Button
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as ReactRouterLink } from 'react-router-dom';

const HomePage = () => {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getContacts();
    }, [])

    const getContacts = () => {
        axios.get('/get-contacts')
            .then(res => {
                // console.log(res);
                setData(res.data.contacts);
            })
            .catch((e) => console.log(e.message))
    }

    const filterData = () => {
        if (!searchQuery)
            return data;

        return data.filter((contact) => {
            return (
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        })
    }

    const filteredData = filterData();

    const handleDelete = (id) => {

        const newContacts = data.filter(contact => contact._id !== id);
        setData(newContacts);

        axios.delete('/delete-contact/', { data: { id } })
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Container maxW={'container.xl'}>
            <Center mt={10}>
                <Input
                    variant='filled'
                    placeholder='Search Contacts'
                    width={"70%"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Center>
            <Button as={ReactRouterLink} to={`/add-contact`} my={5}>Add Contact</Button>
            <Table variant='simple' size='lg'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Mobile Number</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredData.map((contact) => (
                        <Tr key={contact._id}>
                            <Td>{contact.name}</Td>
                            <Td>{contact.email}</Td>
                            <Td>{contact.mobileNumber}</Td>
                            <Td><Button as={ReactRouterLink} to={`/update-contact/${contact._id}`}><i className="fa-solid fa-pen-to-square"></i></Button></Td>
                            <Td><Button onClick={() => handleDelete(contact._id)}><i className="fa-solid fa-trash"></i></Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
};

export default HomePage;
