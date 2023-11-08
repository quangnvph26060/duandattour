

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IQuanlyDattour } from '../interface/qlytdatour';

const QuanlydattoutApi = createApi({
    reducerPath: 'getListBookingTour',
    tagTypes: ['getListBookingTour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin/dattour",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getQuanlydattour: builder.query<IQuanlyDattour[], void>({
            query: () => `/getListBookingTour`,
            providesTags: ['getListBookingTour']
        }),
    

    })
});
export const {
useGetQuanlydattourQuery

} = QuanlydattoutApi;
export const QuanlydattourReducer = QuanlydattoutApi.reducer;
export default QuanlydattoutApi;