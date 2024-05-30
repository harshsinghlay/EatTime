import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbCameraPlus } from 'react-icons/tb';
import { FaUserLarge } from "../../assets/icons/icons";

function ProfileImageUpload({ name, register, onChange, control }) {
  const [preview, setPreview] = useState(null);
  // const [error, setError] = useState("")

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // if (file.size < 500 * 1024) {
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange(file)
    // setError("")
    // } else {
    // setError("Maximum File Size 500kb")
    // }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className="relative inline-block">

        <div {...getRootProps()} className="cursor-pointer">
          {/*======= Image =======*/}
          <div>
            {preview ? (
              <div className="w-24 h-24 rounded-full  border-[1px] border-gray-500 overflow-hidden ">
                <img className='w-full h-full' src={preview} alt="" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100  text-7xl overflow-hidden relative">
                <FaUserLarge className='absolute bottom-0 text-gray-300' />
              </div>
            )}
          </div>
          {/*======= Input =======*/}
          <div>
            <label id={name} className="absolute bottom-0 end-0 block rounded-full ring-2 ring-white text-3xl sm:text-2xl bg-white cursor-pointer text-gray-600 active:text-black">
              <TbCameraPlus />
            </label>
            <input className='hidden' type='file' control={control} {...register(name, { required: "Profile Pic is Required" })} {...getInputProps()} />
          </div>
        </div>
      </div>

      {/* {error && (
        <p className="text-red-600 text-xs text-center">{error}</p>
      )} */}
    </div>
  );
}

export default ProfileImageUpload;
