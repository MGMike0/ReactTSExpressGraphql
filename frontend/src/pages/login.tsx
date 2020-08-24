import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const Login: React.FC<{}> = ({}) => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data.login.user) {
            // login in
            router.push('/');
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button
                isLoading={isSubmitting}
                type="submit"
                variantColor="teal"
              >
                Log In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Login);
