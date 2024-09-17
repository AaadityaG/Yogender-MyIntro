import React, { useState } from 'react';
import { UserRound } from 'lucide-react';
import CustomPhoneInput from './CustomPhoneInput';
import Cropper from 'react-easy-crop';
import ReactModal from 'react-modal';
import getCroppedImg from './getCroppedImg'; // Utility function to get the cropped image
import Button1 from './Button1'; // Utility function to get the cropped image
import "./PersonalDetails.css"

const PersonalDetails = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="lg:text-[24px] md:text-[24px] text-[20px] font-semibold">Personal Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-7 md:gap-7 gap-3 w-full my-2">
        <div className="flex flex-col gap-2 w-full max-w-[360px]">
          <label className="text-[#999999] text-[14px]">Title</label>
          <input
            type="text"
            className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
            placeholder="E.g. Ux Director"
          />
        </div>
        <button
          className="group flex items-center justify-start gap-3 w-full max-w-[360px] my-2"
          onClick={() => document.getElementById('upload-input').click()}
        >
            {croppedImage ? (
              <img src={croppedImage} alt="Cropped" className="lg:w-20 md:w-20 w-14 rounded-full" />
            ) : (
              <span className="rounded-full group-hover:bg-blue-100 p-5 bg-[#dedede]">
              <UserRound fill="#afb1b4" size={25} className="text-[#afb1b4]" />
          </span>
            )}
          <span className="text-[14px] text-primary group-hover:text-black">
            {croppedImage ? 'Replace' : 'Upload Photo'}
          </span>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </button>

        <div className="flex flex-col gap-2 w-full max-w-[360px]">
          <label className="text-[#999999] text-[14px]">Full Name</label>
          <input
            type="text"
            className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
            placeholder="John Doe"
          />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[360px]">
          <label className="text-[#999999] text-[14px]">Email</label>
          <input
            type="text"
            className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray cursor-not-allowed"
            placeholder=""
            disabled
          />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[360px]">
          <label className="text-[#999999] text-[14px]">Location</label>
          <input
            type="text"
            className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[360px]">
          <CustomPhoneInput />
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Image Cropper"
        className="modal"
        overlayClassName="overlay"
      >
        <p className='text-start mb-2'>Position and size of your photo</p>
        <div className="crop-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <Button1 onClick={showCroppedImage} text="Save" className="px-10">
            Save
          </Button1>
        </div>
      </ReactModal>
    </div>
  );
};

export default PersonalDetails;
