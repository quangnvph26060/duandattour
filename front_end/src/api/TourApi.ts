import { Itourdetail } from '../interface/Itourdetail';
import { ITour } from '../interface/tour';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TourApi = createApi({
    reducerPath: 'Tour',
    tagTypes: ['Tour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getTour: builder.query<ITour[], void>({
            query: () => `/tour`,
            providesTags: ['Tour']
        }),
        addTour:builder.mutation<ITour,ITour>({
            query:(Tour)=>({
                url:'/tour',
                method: "POST",
                body:Tour
        }),
        invalidatesTags: ['Tour']
        }),
        editTour:builder.mutation<ITour,ITour>({
            query:(Tour)=>({
                url:`/tour/${Tour.id}`,
                method: "PUT",
                body:Tour
        }),
        invalidatesTags: ['Tour']
        }),
        removeTour:builder.mutation<ITour,ITour>({
            query:(id)=>({
                url:`/tour/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getTourById: builder.query<ITour, number >({
            query: (id) => `/tour/${id}` ,
            providesTags: ['Tour']
        }),
        getdetailTourById: builder.query<Itourdetail, number >({
            query: (id) => `/tour/show/${id}` ,
            providesTags: ['Tour']
        }),
       

    })
});

export const {
    useGetTourQuery,
    useAddTourMutation,
    useEditTourMutation,
    useGetTourByIdQuery,
    useRemoveTourMutation,
    useGetdetailTourByIdQuery

} = TourApi;
export const tourRedeucer = TourApi.reducer;
export default TourApi;