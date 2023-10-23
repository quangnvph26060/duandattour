import { Iimages } from '../interface/images';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ImagesApi = createApi({
    reducerPath: 'Images',
    tagTypes: ['Images'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getImages: builder.query<Iimages[], void>({
            query: () => `/images/images`,
            providesTags: ['Images']
        }),
        addImages:builder.mutation<Iimages,Iimages>({
            query:(Tour)=>({
                url:'/images',
                method: "POST",
                body:Tour
        }),
        invalidatesTags: ['Images']
        }),
        editImages:builder.mutation<Iimages,Iimages>({
            query:(Tour)=>({
                url:`/images/${Tour.id}`,
                method: "PUT",
                body:Tour
        }),
        invalidatesTags: ['Images']
        }),
        removeImages:builder.mutation<Iimages,Iimages>({
            query:(id)=>({
                url:`/images/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getImagesById: builder.query<Iimages, number >({
            query: (id) => `/images/${id}` ,
            providesTags: ['Images']
        }),
       

    })
});

export const {
    useGetImagesQuery,
    useAddImagesMutation,
    useEditImagesMutation,
    useGetImagesByIdQuery,
    useRemoveImagesMutation,

} = ImagesApi;
export const imagesRedeucer = ImagesApi.reducer;
export default ImagesApi;