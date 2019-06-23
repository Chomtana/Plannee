import React, { Component } from 'react';
//import { Container, Divider } from 'semantic-ui-react'
import FormField from '../component/ui/formField';
import { validate } from '../component/ui/mics';
import Link from './../router/Link';
class Login_page extends Component {

    state = {
        formError:false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:''
            }
        }

    }

    updateForm(element){
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }


    submitForm(event){
        event.preventDefault();
        //do sth if email and pass is valid
        // may be I will use firbase for db naja
        
        
    }

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{margin:'100px'}}>

                    <form onSubmit={(event)=> this.submitForm(event)}>

                        <h2>Please Login</h2>

                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element)=> this.updateForm(element)}
                        />

                        <FormField
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element)=> this.updateForm(element)}
                        />
                            { this.state.formError ? 
                                <div className="error_label">Something is wrong, try again.</div>
                                :null
                            }
                        <Link to={[]}><button>Log in</button></Link>
                    </form>

                </div>     
            </div>
        );
    }
}


export default Login_page;