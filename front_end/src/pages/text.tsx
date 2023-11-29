import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Test() {
    function calculateNumberOfDays(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const timeDifference = Math.abs(endDate - startDate);
        const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return numberOfDays;
    }

    const [tourdiemden, setTour] = useState([]);
    const { diem_den } = useParams<{ diem_den: any }>();
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den=${diem_den}`)
            .then((response) => {
                console.log(response.data.tourdiemden);
                setTour(response.data.tourdiemden);
            })
        if (diem_den === undefined) {
            axios
                .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den`)
                .then((response) => {
                    console.log('123jhgkjg', response.data.tourdiemden);
                    setTour(response.data.tourdiemden);
                })
        }
        console.log(`Tham số diem_den đã thay đổi thành: ${diem_den}`);
        // Cập nhật nội dung tương ứng với tham số mới
    }, [diem_den]);

    const [filteredTours, setFilteredTours] = useState([]);
    const [selectedDayRange, setSelectedDayRange] = useState(null);

    const handleButtonClick = (dayRange) => {
        // Đặt phạm vi ngày đã chọn
        setSelectedDayRange(dayRange);

        // Lọc các chuyến tham quan dựa trên phạm vi ngày đã chọn
        const filteredTours = tourdiemden.filter((tour) => {
            const numberOfDays = calculateNumberOfDays(tour.lich_khoi_hanh, tour.ngay_ket_thuc);

            if (dayRange === '1-3' && numberOfDays >= 1 && numberOfDays <= 3) {
                return true;
            } else if (dayRange === '4-7' && numberOfDays >= 4 && numberOfDays <= 7) {
                return true;
            } else if (dayRange === '8-14' && numberOfDays >= 8 && numberOfDays <= 14) {
                return true;
            } else if (dayRange === '14+' && numberOfDays > 14) {
                return true;
            }

            return false;
        });


        // Đặt các chuyến tham quan đã lọc
        setFilteredTours(filteredTours);
    };


    const [selectedNumberOfPeople, setSelectedNumberOfPeople] = useState(null);
    const filterToursByNumberOfPeople = (tour, selectedNumberOfPeople) => {
        if (!selectedNumberOfPeople) {
            return true; // No number of people selected, so the tour should be included
        }

        if (selectedNumberOfPeople === 1 && tour.soluong === 1) {
            return true;
        } else if (selectedNumberOfPeople === 2 && tour.soluong === 2) {
            return true;
        } else if (selectedNumberOfPeople === '3-5' && tour.soluong >= 3 && tour.soluong <= 5) {
            return true;
        } else if (selectedNumberOfPeople === 999 && tour.soluong > 5) {
            return true;
        }

        return false;
    };

    const handleNumberOfPeopleClick = (numberOfPeople) => {
        // Đặt số lượng người đã chọn
        console.log(numberOfPeople)
        setSelectedNumberOfPeople(numberOfPeople);

        // Lọc các chuyến tham quan dựa trên số lượng người đã chọn
        const filteredTours = tourdiemden.filter((tour) =>
            filterToursByNumberOfPeople(tour, numberOfPeople)
        );

        // Đặt các chuyến tham quan đã lọc
        setFilteredTours(filteredTours);
    };


    //lọc ra những tour có cả ngày và người được trọn
    // const filterToursByDayRangeAndNumberOfPeople = (tour, selectedDayRange, selectedNumberOfPeople) => {
    //     // Add your existing day range and number of people filtering logic here

    //     // Check if there is a selected day range
    //     const hasSelectedDayRange =
    //         selectedDayRange && filterToursByDayRange(tour, selectedDayRange);

    //     // Check if there is a selected number of people
    //     const hasSelectedNumberOfPeople =
    //         selectedNumberOfPeople && filterToursByNumberOfPeople(tour, selectedNumberOfPeople);

    //     // Return true if at least one condition is satisfied
    //     return hasSelectedDayRange || hasSelectedNumberOfPeople;
    // };



    return (
        <div>
            <p className='px-3 text-lg font-medium pt-1'>Số ngày</p>
            <div className='flex gap-2 py-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleButtonClick('1-3')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>1 đến 3 ngày</button>
                </div>
                <div className=''>
                    <button onClick={() => handleButtonClick('4-7')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>4 đến 7 ngày</button>
                </div>
            </div>
            <div className='flex gap-2 py-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleButtonClick('8-14')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>8 đến 14 ngày</button>
                </div>
                <div className=''>
                    <button onClick={() => handleButtonClick('14+')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>trên 14 ngày</button>
                </div>
            </div>
            <p className='px-3 text-lg font-medium py-1'>Ngày đi</p>
            <div className='text-center'>
                <input className='pl-7 pr-12 w-56 h-10 rounded-lg' type="date" name="date" id="" />
            </div>
            <p className='px-3 text-lg font-medium py-1'>Số người</p>
            <div className='flex gap-2 py-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick(1)} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>1 người</button>
                </div>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick(2)} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>2 người</button>
                </div>
            </div>
            <div className='flex gap-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick('3-5')} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>3 - 5 người</button>
                </div>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick(999)} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>5+ người</button>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-7 container mx-auto'>
                {(selectedDayRange || selectedNumberOfPeople
                    ? filteredTours
                    : tourdiemden
                ).map((items) => (
                    <div key={items.id}>
                        {/* ... (your existing code) */}
                        <div className='py-4 bg-neutral-100 rounded-lg'>
                            {/* ... (your existing code) */}
                            <p className='font-bold py-2 px-1'>Số lượng: {items.soluong} </p>
                            <p className="px-1">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                            {/* ... (your existing code) */}
                        </div>
                        <button
                            onClick={() => addToCart(items)}
                            className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2'
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Test;
