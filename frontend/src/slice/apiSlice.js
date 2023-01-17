import { createApi, fetchBaseQuery } from '@reduxjs/toolkit.query/react';
import { logOut } from './authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders:  (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', 'Token ' + token);
        }
        return headers;
    }
})

// wrapper for baseQuery
const baseQueryWrapper = async (args, api, extraOptions) => {
    let result = await baseQueryWrapper(args, api, extraOptions);

    if (result.error?.originalStatus === 401) {
        console.log('loggin out as the token has expired');
        api.dispatch(logOut());                     
    }
}

export const apiSlice = createApi({
    baseQuery: baseQueryWrapper,
    endpoints: (builder) => ({})
})