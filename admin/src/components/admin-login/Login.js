import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
  return (
    <div className="form-container black-bg">
      <div className="form-wrapper white-bg p-3">
          <h2 className="medium-text">Admin</h2>
        <Form>
          <FormGroup>
            <Label for="exampleEmail" hidden>
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
            />
          </FormGroup>{' '}
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
            />
          </FormGroup>{' '}
          <Button className="black-bg">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
