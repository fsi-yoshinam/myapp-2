import React, { useRef, useState } from "react";
import Canvas from "./canvas";
import '../App.css'

const ModalButton: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // モーダルの開閉状態を管理するステート
  const [showModal, setShowMOdal] = useState(false);

  const handleClick = () => {
    setShowMOdal(true);
  };

  const closeModal = () =>{
    setShowMOdal(false);
  };

  return(
    <div>
      <button onClick={handleClick}>モーダルを開く</button>

      {showModal && (
        <div className="modal">
          <div style={{position: 'relative'}} className="modal-content">
            <video ref={videoRef} controls muted>
              {/* ↓動画ファイルパス */}
            <source src="sample.mp4" type="video/mp4"/>
            </video>
            <Canvas videoRef={videoRef} />
            <button onClick={closeModal}>モーダルを閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalButton;