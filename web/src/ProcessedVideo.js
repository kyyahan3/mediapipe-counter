import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd';

const ProcessedVideo = ({ enabled = false }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(enabled);

  useEffect(() => {
    const fetchProcessedVideo = async () => {
      try {
        const response = await fetch('/api/video/');
        const blob = response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProcessedVideo(); // Fetch the processed video when the component mounts
  }, []);

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setVideoUrl(''); // Reset the video URL
  };

  return (
    <Modal
      visible={modalVisible}
      onCancel={closeModal}
      footer={null}
      width={800}
      destroyOnClose={true}
    >
      {videoUrl ? (
        <video controls width="100%">
          <source src={videoUrl} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </Modal>
  );
};

export default ProcessedVideo;
