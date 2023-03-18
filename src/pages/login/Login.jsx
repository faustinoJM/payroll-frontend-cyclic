import "./login.scss"
import { useAuth } from "../../context/AuthContext"
import { Form } from "@unform/web"
import getValidateErrors from "../../utils/getValidationErrors"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import React, { useCallback, useRef, useState} from "react"
import Input from "../../components/input/Input"

const Login = () => {
    const formRef = useRef(null);
    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();
  
    const { signIn } = useAuth();
    // const { addToast } = useToast();
  
    const handleSubmit = useCallback(async (data) => {
      // console.log(data)
      formRef.current?.setErrors({});
  
      try {  
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail Obrigatorio').email("Digite um email valido"),
          password: Yup.string().required('Senha Obrigatoria')
        })
        
        await schema.validate(data, {
          abortEarly: false,
        })
  
         await signIn({
          email: data.email,
          password: data.password
        })
  
        navigate('/')
  
      } catch (err) {
        //  console.log({err})
        if(err instanceof Yup.ValidationError) {
          const errors = getValidateErrors(err)
          formRef.current?.setErrors(errors)  
  
          return;
        }
        //add toast msg
         setLoginError(true)
  
        // addToast({
        //   type: "error",
        //   title: "Erro na Autenticacao",
        //   description: "Ocorreu um erro ao fazer login, cheque as Credenciais"
        // })
      } 
    }, [signIn, navigate]) 


    return (
        <div className="login">
            <Form className="formContainer" ref={formRef} onSubmit={handleSubmit} >
                {/* <h1>Payroll system</h1> */}
                <div className="formInput">
                    <Input type="text" name="email" label="Email" loginError={loginError} />
                </div>
                <div className="formInput">
                    <Input type="password" name="password" label="Senha" loginError={loginError} />
                    {loginError && (<div className="error">Email ou Senha incorrecta</div>)}
                </div>
                <button type="submnit">Login</button>
            </Form>
        </div>
    )
}

export default Login