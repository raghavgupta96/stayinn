import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { Field } from 'redux-form';
import TextInput from '../../../app/common/TextInput';

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
            <Field
                name="confirm password"
                type="confirm password"
                component={TextInput}
                placeholder="Password"
            />
        </Segment>
       </Form>
    </div>
  )
}

export default RegisterForm;
