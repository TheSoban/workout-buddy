import {FC} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { useAuth } from '../../../store/auth';
import TextField from '../FormComponents/TextField';

const SigninForm: FC = () => {
  const {signinUsingLocal} = useAuth();

  return <Formik
      initialValues={{
        email: '',
        password: ''  
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Niepoprawny adres e-mail").required('Adres e-mail jest wymagany'),
        password: Yup.string().required("Hasło jest wymagane")
      })}
      onSubmit={async (values) => {
        signinUsingLocal(values)
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <TextField label="Adres e-mail" name="email" type="text" />
            <TextField label="Hasło" name="password" type="text" />
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting} >Zaloguj się</button>
          </Form>
        )
      }
    </Formik>
}

export default SigninForm;