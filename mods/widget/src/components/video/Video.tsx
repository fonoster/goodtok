/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { CameraIcon } from "../icons/CameraIcon";
import { MutedCameraIcon } from "../icons/MutedCameraIcon";
import { CircleMicrophoneIcon } from "../icons/CircleMicrophoneIcon";
import { CirclePiPIcon } from "../icons/CirclePiPIcon";
import { CircleCameraIcon } from "../icons/CircleCameraIcon";
// import { CircleShareScreenIcon } from "../icons/CircleShareScreenIcon";
import { CircleHangupIcon } from "../icons/CircleHangupIcon";
import {
  ButtonCircleWrapper,
  Controls,
  CustomerVideo,
  GoodtokVideo,
  Header,
  HeaderContainer,
  MutedOverlay,
  StaffVideo,
  VideoContainer
} from "./styles";

type VideoProps = {
  isCustomerVideoMuted?: boolean;
  isOpen?: boolean;
  onClosed?: () => void;
};

export const Video = forwardRef((props: VideoProps, ref) => {
  const [isCustomerVideoMuted, setIsCustomerVideoMuted] = useState(false);
  const staffVideoRef = React.createRef<HTMLVideoElement>();
  const customerVideoRef = React.createRef<HTMLVideoElement>();

  // Expose refs to parent
  useImperativeHandle(ref, () => ({
    staffVideo: staffVideoRef.current,
    customerVideo: customerVideoRef.current
  }));

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  const handlePiP = async () => {
    try {
      if (staffVideoRef.current) {
        if (document.pictureInPictureElement) {
          // If some video is already in PiP mode, we'll exit from it
          await document.exitPictureInPicture();
        } else {
          // Otherwise, we request PiP for our staff video
          await staffVideoRef.current.requestPictureInPicture();
        }
      }
    } catch (error) {
      console.error("Failed to toggle PiP mode:", error);
    }
  };

  return (
    <GoodtokVideo>
      <Header>
        <HeaderContainer>
          <CameraIcon />
          <p>{formatTime(secondsElapsed)}</p>
          <CloseIcon onClick={props.onClosed} />
        </HeaderContainer>
      </Header>
      <VideoContainer>
        <StaffVideo ref={staffVideoRef} className="goodtok-video__staff" />
        {isCustomerVideoMuted && (
          <MutedOverlay>
            <MutedCameraIcon />
          </MutedOverlay>
        )}
        <CustomerVideo
          ref={customerVideoRef}
          className="goodtok-video__customer"
        />
        <Controls>
          <ButtonCircleWrapper>
            <CircleMicrophoneIcon />
          </ButtonCircleWrapper>
          <ButtonCircleWrapper
            onClick={() => setIsCustomerVideoMuted(!isCustomerVideoMuted)}
          >
            <CircleCameraIcon />
          </ButtonCircleWrapper>
          <ButtonCircleWrapper onClick={handlePiP}>
            <CirclePiPIcon />
          </ButtonCircleWrapper>
          {/* 
          <ButtonCircleWrapper>
            <CircleShareScreenIcon />
          </ButtonCircleWrapper>
          */}
          <ButtonCircleWrapper>
            <CircleHangupIcon />
          </ButtonCircleWrapper>
        </Controls>
      </VideoContainer>
    </GoodtokVideo>
  );
});

export default Video;
