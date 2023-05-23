import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function VideoPlayer() {
  const [videoFrames, setVideoFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Make an HTTP request using axios to retrieve the processed video URL from the backend
    axios.get('/api/upload_video_endpoint')
      .then(response => {
        const responseData = response.data;
        setVideoFrames(`data:video/mp4;base64,${responseData.video_url}`); // Assuming the backend returns the video URL in the 'videoUrl' field
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Start playing the video frames when the modal is opened
    if (modalIsOpen) {
      const interval = setInterval(() => {
        setFrameIndex(prevIndex => (prevIndex + 1) % videoFrames.length);
      }, 100); // Adjust the interval as needed (e.g., 100ms for 10 frames per second)

      return () => {
        clearInterval(interval);
      };
    }
  }, [modalIsOpen, videoFrames]);
  return (
    <div>
      <button onClick={openModal}>Open Video</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
      >
        {videoFrames.length > 0 ? (
          <img src={`data:image/jpeg;base64,${videoFrames[frameIndex]}`} alt="Video Frame" />
        ) : (
          <p>No video frames available.</p>
        )}
      </Modal>
    </div>
  );
}

export default VideoPlayer;
