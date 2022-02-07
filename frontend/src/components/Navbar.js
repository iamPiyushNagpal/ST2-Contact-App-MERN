import {
    Box, Flex, IconButton, Link, Heading
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <Box>
            <Flex bgColor={'gray.100'} p={5} justifyContent={'center'}>
                <Link as={ReactRouterLink} to={"/"}><Heading size="lg">Contact App</Heading></Link>
            </Flex>
        </Box>
    )
}

export default Navbar