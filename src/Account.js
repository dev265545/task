import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { MdPhotoAlbum } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../src/Context/AuthContext";
import { db, storage } from "./firebase";

const Account = () => {
  const navigate = useNavigate();
  const { user, current } = UserAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = doc(db, "users", user?.uid);
    await updateDoc(docRef, {});

    const imageRef = ref(storage, `users/${docRef.id}/user_img`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", docRef.id), {
          user_img: downloadURL,
        });
      });
    }
    console.log("success");

    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div className=" h-screen bg-hero-pattern bg-cover">
      <h1 className="text-center text-2xl font-bold pt-12 ">Your Profile</h1>
      <div className="grid grid-rows-2 ">
        <div className="flex justify-center ">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <img
              className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={current?.user_img}
              alt=""
            />
            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {user?.displayName}
              </h5>
              <p className="text-gray-700 text-base mb-4">{user?.email}</p>
              <p className="text-gray-600 text-xs">{}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-10">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              Change Profile Picture{" "}
            </h5>
            <p className="text-gray-700 text-base mb-4"> Choose a picture</p>
            <div
              className="p-3  "
              onClick={() => filePickerRef.current.click()}
            >
              <MdPhotoAlbum classNameName="text-[#1d9bf0] h-[20px] w-[20px]" />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </div>
            <button
              onClick={() => {
                sendPost();
              }}
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          type="button"
          className=" inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Back to Chat
        </button>
      </div>
    </div>
  );
};

export default Account;
