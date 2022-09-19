import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
    'REGISTER',
    async (brandInfo) => {
        try{
            const response = await axios.post('/company/create/');
            return response;
        } catch (err) {
            console.log(err.response);
            return err.response.status;
        }
    }
)