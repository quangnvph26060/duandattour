import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ipost } from "../interface/post";
import { useGetpostByIdQuery, useGetpostQuery } from "../api/post";
import { data } from "autoprefixer";
import "../style.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const News = () => {
    const { idpost } = useParams<{ idpost: string }>();

    const { data: tourdata } = useGetpostQuery();
    const tourArray = tourdata?.data || [];
    const dataSource = tourArray.map(({ id,
        ten_post,
        image,
        mo_ta,
        ngay_dang, }: Ipost) => ({
            key: id,
            ten_post,
            image,
            mo_ta,
            ngay_dang,
        }));
    console.log(tourArray);

    const { data: postData } = useGetpostByIdQuery(idpost);
    const navigate = useNavigate();


    const [post, setPost] = useState<Ipost | null>(null);
    useEffect(() => {
        if (postData?.data) {
            const { id, ten_post, mo_ta, ngay_dang }: Ipost = postData.data;
            const modifiedData = {
                key: id,
                ten_post,
                mo_ta,
                ngay_dang,
                expand: false, // Initially set expand to false for all rows
            };
            setPost(modifiedData);
        }
    }, [postData]);

    return (
        <div>

            <div className='w-post flex gap-1'>
                {postData && (
                    <div className="w-lef w-4/5 ">
                        <h2 className='px-3 font-semibold text-4xl'>{postData.ten_post}</h2>
                        <p>Tin tức du lịch : {postData.ngay_dang}</p>
                        <div dangerouslySetInnerHTML={{ __html: postData.mo_ta }} ></div>
                    </div>
                )}

                <div className="w-right w-1/5">
                    <b>Tin mới</b> <br />
                    {tourArray.map(item => (
                        <b> * {item.ten_post}</b>
                    ))}
                </div>

            </div>


            {/* footer */}
            <footer className='text-center py-5'>

            </footer>
        </div>
    );
};

export default News;
