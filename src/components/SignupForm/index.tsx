import {FC} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import TextField from '../FormComponents/TextField';
import API from '../../utils/axios';

const SignupForm: FC = () => {
  return <Formik
      initialValues={{
        username: '',
        email: '',
        password: ''  
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Nazwa użytkownika jest wymagana').min(6, "Musi mieć minimum 6 znaków"),
        email: Yup.string().email("Niepoprawny adres e-mail").required('Adres e-mail jest wymagany'),
        password: Yup.string().required("Hasło jest wymagane").min(6, "Musi mieć minimum 6 znaków")
      })}
      onSubmit={async (values) => {
        // register user to db
        try {
          const res = await API.post('/auth/local/signup', {...values});
          console.log(res)
        } catch(exc) {
          console.log(exc.response)
        }
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <TextField label="Nazwa użytkownika" name="username" type="text" />
            <TextField label="Adres e-mail" name="email" type="text" />
            <TextField label="Hasło" name="password" type="password" />
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting} >Zarejestruj konto</button>
          </Form>
        )
      }
    </Formik>
}

export default SignupForm;