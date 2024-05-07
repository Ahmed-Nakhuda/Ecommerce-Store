import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

function Login() {
    return (
        <div>
            <h1 style={styles.h1}>Login</h1>
            <form style={styles.formContainer}>
                <TextField style={styles.textField} id="outlined-basic" label="Username" variant="outlined" />
                <br/>
                <TextField style={styles.textField} id="outlined-basic" label="Password" variant="outlined" type='password' />
                <br/>
                <Button variant="contained">Login</Button>
            </form>
            <p style={styles.p}>Not a Member? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

const styles = {
    h1: {
        textAlign: 'center',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    p: {
        textAlign: 'center',
    },
};

export default Login;

