import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SignUp() {
  return (
        <div>
            <h1 style={styles.h1}>Sign Up</h1>
            <form style={styles.formContainer}>
                <TextField id="outlined-basic" label="Username" variant="outlined" />
                <br/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' />
                <br/>
                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type='password' />
                <br/>
                <Button variant="contained">Sign Up</Button>
            </form>
        </div>
  );
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
};

export default SignUp;