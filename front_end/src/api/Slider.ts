import { Ibannerlogo } from '../interface/Banner_logo';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ImagesApi = createApi({
    reducerPath: 'images',
    tagTypes: ['Images'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getSliders: builder.query<Ibannerlogo[], void>({
            query: () => `/images/images`,
            providesTags: ['Images']
        }),
        addSliders:builder.mutation<Ibannerlogo,Ibannerlogo>({
            query:(images)=>({
                url:'/images',
                method: "POST",
                body:images
        }),
        invalidatesTags: ['Images']
        }),
        editSliders:builder.mutation<Ibannerlogo,Ibannerlogo>({
            query:(images)=>({
                url:`images/edit/${images.id}`,
                method: "POST",
                body:images
        }),
        invalidatesTags: ['Images']
        }),
        removeSliders:builder.mutation<Ibannerlogo,Ibannerlogo>({
            query:(id)=>({
                url:`/images/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getSlidersById: builder.query<Ibannerlogo, number >({
            query: (id) => `/images/${id}` ,
            providesTags: ['Images']
        }),
       

    })
});

export const {
    useGetSlidersQuery,
    useAddSlidersMutation,
    useEditSlidersMutation,
    useGetSlidersByIdQuery,
    useRemoveSlidersMutation,

} = ImagesApi;
export const imagesRedeucer = ImagesApi.reducer;
export default ImagesApi;