import React from 'react';
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={3}> Login </Link>
        </NextLink>
        <NextLink href="/register">
          <Link> Register </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          variant="link"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box bg="tomato" p={4} ml="auto" color="white">
        {body}
      </Box>
    </Flex>
  );
};
export default NavBar;
