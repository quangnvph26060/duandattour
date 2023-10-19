import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetImagesByIdQuery, useEditImagesMutation } from '../../../../api/ImagesApi';
import { Iimages } from '../../../../interface/images';

const Admin_ImageEdit: React.FC = () => {
  const { idimage } = useParams<{ idimage: string }>();
  const { data: ImageData } = useGetImagesByIdQuery(idimage || "");
  const Image = ImageData || {};
  const [updateImage] = useEditImagesMutation();
  
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  useEffect(() => {
    if (Image.data && Image.data.image_path) {
      setSelectedImage(null);
    }
  }, [Image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file);
  };

  const onFinish = (values: Iimages) => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('hinh', selectedImage);
      formData.append('id', idimage);

      updateImage(formData)
        .unwrap()
        .then(() => {
          navigate('/admin/tour/image');
        });
    } else {
      updateImage({ ...values, id: idimage })
        .unwrap()
        .then(() => {
          navigate('/admin/tour/image');
        });
    }
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Chỉnh sửa ảnh tour</h2>
      </header>

      {/* Hiển thị hình ảnh */}
      {Image.data && Image.data.image_path && (
        <img src={`http://localhost:8000/storage/${Image.data.image_path}`} alt="Hình ảnh" />
      )}

      <form
        className="tour-form"
        style={{ maxWidth: 600 }}
        onSubmit={onFinish}
        autoComplete="off"
        
      >
        <div>
          <label htmlFor="hinh">Upload Image</label>
          <input
            type="file"
           
            name="hinh"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <button type="submit">
            Cập nhật
          </button>
          <button
            type="button"
            className="ml-2"
            onClick={() => navigate('/admin/tour/image')}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin_ImageEdit;