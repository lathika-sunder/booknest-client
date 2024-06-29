import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Link, Paper } from '@mui/material';
import './LoginComp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import{ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const LoginComp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://booknest-server-blue.vercel.app/api/v1/booknest/user/loginUser', { email, password })
            .then((response) => {
                const { token, role } = response.data;
                localStorage.setItem('token', token)
                localStorage.setItem('role', role)
                if (role == "admin") {
                    navigate('/home/admin')
                }
                else if (role == "user") {
                    navigate('/home/user')
                }
                console.log('Login Successful');
                console.log(`Role: ${role}`);

            })
            .catch((error) => {
                const statusCode=error.response.status
                if(statusCode==404)
                    toast.error('Login Failed, Invalid Password')
                console.error('Login Failed:', error.response.data.message);

            });
    };

    return (
        <div className="login-form">
        <ToastContainer/>
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                {/* <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
                <Typography variant="h5" gutterBottom>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '1rem' }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ marginTop: '0.5rem' }}>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </Container>
        </div>
    );
};

export default LoginComp;
