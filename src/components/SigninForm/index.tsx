import {FC} from 'react';
import { Formik, useField, FieldHookConfig } from 'formik';
import * as Yup from 'yup'
import {
  StyledButton,
  StyledDivider,
  StyledError,
  StyledForm,
  StyledGroup,
  StyledH1,
  StyledImg,
  StyledInput,
  StyledProviders
} from './styled';

import Facebook from '../../assets/fb-logo.png';
import Github from '../../assets/github-logo.png';
import Google from '../../assets/google-logo.png';
import { useAuth } from '../../store/auth';


type FieldProps = FieldHookConfig<string> & {label: string}

const TextField = ({label, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
   return (
     <StyledGroup>
       <StyledInput error={!!(meta.touched && meta.error)} placeholder={label} {...field} {...props} />
       {meta.touched && meta.error ? (
         <StyledError error={!!(meta.touched && meta.error)}>{meta.error}</StyledError>
       ) : null}
     </StyledGroup>
   );
}

const SigninForm: FC = () => {
  // eslint-disable-next-line
  const {signinUsingLocal, signinUsingGithub, signinUsingGoogle, signinUsingFacebook} = useAuth();

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
        await new Promise((r) => setTimeout(r, 2000));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, }) => (
          <StyledForm noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <StyledH1>Zaloguj się</StyledH1>
            <TextField label="Adres e-mail" name="email" type="text" />
            <TextField label="Hasło" name="password" type="password" />
            <StyledButton disabled={ isSubmitting || !isValid} type="submit">Zaloguj się</StyledButton>
            <StyledDivider>lub kontynuuj z</StyledDivider>
            <StyledProviders>
              <StyledImg src={Google} alt="Google_Logo" onClick={signinUsingGoogle} />
              <StyledImg src={Github} alt="Github_Logo" onClick={signinUsingGithub} />
              <StyledImg src={Facebook} alt="Facebook_Logo" onClick={signinUsingFacebook} />
            </StyledProviders>
          </StyledForm>
        )
      }
    </Formik>
}

export default SigninForm;