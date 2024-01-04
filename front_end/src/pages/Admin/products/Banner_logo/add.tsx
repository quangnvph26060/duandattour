import { Button, Input } from 'antd'
import React from 'react'
import { Form } from 'antd'
import { useNavigate } from 'react-router-dom';

const Add_Banner = () => {

    const navigate = useNavigate();

    function onFinish(values: any): void {
        throw new Error('Function not implemented.')
    }

    return (
        <div>
            <div className="container">
                <header className="mb-4">
                    <h2 className="font-bold text-2xl">Thêm Banner & Logo mới</h2>
                </header>
                <form
                    className="tour-form"
                    style={{ maxWidth: 600 }}
                    onSubmit={onFinish}
                    autoComplete="off"
                >
                    <div className='flex gap-5'> 
                        <div>
                            <label htmlFor="hinh" className=''>Upload Image Banner</label>
                            <input
                                type="file"
                                id="hinh"
                                name="hinh"
                                required
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <label htmlFor="hinh" className=''>Upload Image Logo</label>
                            <input
                                type="file"
                                id="hinh"
                                name="hinh"
                                required
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className='py-4 flex gap-3'>
                        <button type="submit" className='px-5 py-2 bg-blue-500 rounded-md hover:bg-white border border-blue-400' >
                            {/* {loading ? 'Loading...' : 'Thêm'} */}Thêm
                        </button>
                        <button
                            type="button"
                            className="ml-2 px-5 py-2 bg-red-500 rounded-md hover:bg-white border border-red-500"
                            onClick={() => navigate('/admin/banner_logo')}
                        >
                            Quay lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add_Banner