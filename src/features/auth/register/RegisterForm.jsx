import React from 'react'
import { Form, Segment } from 'semantic-ui-react';

const RegisterForm = () => {
  return (
    <div>
      <Form size="large">
         <Segment>
            <Field
                name="displayName"
                type="text"
                component={TextInput}
                placeholder="Known As"
            />
            <Field
                name="email"
                type="text"
                component={TextInput}
                placeholder="Email"
            />
            <Field
                name="password"
                type="password"
                component={TextInput}
                placeholder="Password"
            />
        </Segment>
       </Form>
    </div>
  )
}

export default RegisterForm;
