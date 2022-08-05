/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from "../src/Context/AuthContext";
import Message from "./Message";
import { db, storage } from "../src/firebase";
import { onSnapshot, collection, query } from "@firebase/firestore";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
  orderBy,
} from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import {
  MdClose,
  MdInvertColors,
  MdPerson,
  MdPhotoAlbum,
} from "react-icons/md";
import Modal from "./Modal";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Home = ({ pattern }) => {
  const { user, logOut, current } = UserAuth();

  const navigate = useNavigate();

  const [input, setInput] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user === null || undefined) {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.uid !== undefined) {
      onSnapshot(
        query(
          collection(db, "users", user?.uid, "posts"),
          orderBy("timestamp")
        ),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      );
    }
  }, [user]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    const docRef = await addDoc(collection(db, "users", user?.uid, "posts"), {
      user_id: user.uid,
      username: user.displayName,
      userImg: user.photoURL,
      email: user.email,
      msg: input,
      timestamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", user?.uid, "posts", docRef.id), {
      id: docRef.id,
    });
    const imageRef = ref(
      storage,
      `users/${user?.uid}/posts/${docRef.id}/image`
    );

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", user?.uid, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);

    setInput("");

    setSelectedFile(null);
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

  const backgroundClass = "h-screen bg-" + current?.background;
  const background = current?.background;
  const bubble = current?.bubble;
  const text_color = current?.text;

  const [modalOpen, setModalOpen] = useState(false);

  const handleOnclose = () => {
    setModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={backgroundClass}>
      <div className=" flex flex-row-reverse">
        {user?.displayName ? (
          <div className=" ">
            <button className="p-1 " onClick={handleSignOut}>
              <img
                className="rounded-md w-12 "
                src={current?.user_img}
                alt="user_img"
              />
            </button>
          </div>
        ) : (
          <Link to="/signin">
            <div className=" ">
              <button className=" block p-2  rounded-full bg-black text-white ">
                Sign in
              </button>
            </div>
          </Link>
        )}
        <div className="flex-1" onClick={() => setModalOpen(!modalOpen)}>
          {" "}
          <MdInvertColors className=" w-10 h-10   " />
          {modalOpen && (
            <Modal
              onClose={handleOnclose}
              theme={background}
              text_color={text_color}
              bubble={bubble}
              user_id={current.id}
            />
          )}
        </div>
        <div className="flex-1" onClick={() => navigate("/account")}>
          {" "}
          <MdPerson className=" w-10 h-10   " />
        </div>
      </div>

      <div className="flex-1 p:2 sm:p-6  justify-end flex flex-col h-screen">
        <div className="overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch ">
          <ScrollToBottom>
            <div id="messages" className="flex flex-col items-start gap-1 ">
              <div className="chat-message p-1">
                <div className="flex items-end justify-end ">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-start">
                    <div>
                      <span className="px-4 py-2  font-medium rounded-lg inline-block rounded-br-none bg-gray-200 text-gray-800">
                        Hi! there 👋
                      </span>
                    </div>
                    <div>
                      <span className="px-4 py-2  font-medium rounded-lg inline-block rounded-br-none bg-gray-200 text-gray-800">
                        I am Wysa an AI bot built by therapist
                      </span>
                    </div>
                    <div>
                      <span className="px-4 py-2  font-medium rounded-lg inline-block rounded-br-none bg-gray-200 text-gray-800">
                        I am here to understand your concerns and connect you
                        with the best resource available to support you.
                      </span>
                    </div>
                    <div>
                      <span className="px-4 py-2  font-medium rounded-lg inline-block rounded-br-none bg-gray-200 text-gray-800">
                        Can I help ?
                      </span>
                    </div>
                  </div>
                  {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2"> */}
                </div>
              </div>
            </div>
            <div id="messages" className="flex flex-col items-end gap-1  ">
              {posts.map((post) => (
                <Message
                  key={post.id}
                  id={post.id}
                  msg={post.data()}
                  user_id={user?.uid}
                  text_color={text_color}
                  bubble={bubble}
                />
              ))}
            </div>
          </ScrollToBottom>
        </div>

        <div className=" border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <MdClose className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}

          <div className="  sticky  flex">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <MdPhotoAlbum className="text-[#1d9bf0] h-10 w-10" />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </div>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              value={input}
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />

            <div className="absolute right-0 items-center inset-y-0 sm:flex">
              <button
                disabled={!input && !selectedFile}
                onClick={sendPost}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
