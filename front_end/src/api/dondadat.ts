import { Itourdetail } from '../interface/Itourdetail';
import { ITour } from '../interface/tour';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import TourApi from './TourApi';

const TourApidd = createApi({
    reducerPath: 'Tourdd',
    tagTypes: ['Tourdd'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getTourById: builder.query<Itourdetail, number>({
            query: (id) => `user`,
            providesTags: ['Tourdd']
        }),



    })
});

export const {

    useGetTourByIdQuery,


} = TourApidd;
export const tourddRedeucer = TourApidd.reducer;
export default TourApidd;