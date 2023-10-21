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
import { formatTime } from "./formatTime";
import { handlePiP } from "./handlePiP";
import { CircleMicrophoneMutedIcon } from "../icons/CircleMicrophoneMutedIcon";
import { CircleCameraMutedIcon } from "../icons/CircleCameraMutedIcon";

type VideoProps = {
  isCustomerCameraMuted?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onHangup?: () => void;
  onCameraMuted?: (muted: boolean) => void;
  onMicrophoneMuted?: (muted: boolean) => void;
};

export const Video = forwardRef((props: VideoProps, ref) => {
  const [isCustomerCameraMuted, setIsCustomeCameraMuted] = useState(false);
  const [isCustomerMicrophoneMuted, setIsCustomerMicrophoneMuted] =
    useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const staffVideoRef = React.createRef<HTMLVideoElement>();
  const customerVideoRef = React.createRef<HTMLVideoElement>();

  // Expose refs to parent
  useImperativeHandle(ref, () => ({
    staffVideo: staffVideoRef.current,
    customerVideo: customerVideoRef.current
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <GoodtokVideo>
      <Header>
        <HeaderContainer>
          {isCustomerCameraMuted ? <MutedCameraIcon /> : <CameraIcon />}
          <p>{formatTime(secondsElapsed)}</p>
          <div onClick={props.onClose}>
            <CloseIcon />
          </div>
        </HeaderContainer>
      </Header>
      <VideoContainer>
        <StaffVideo ref={staffVideoRef} className="goodtok-video__staff" />
        {isCustomerCameraMuted && (
          <MutedOverlay>
            <MutedCameraIcon />
          </MutedOverlay>
        )}
        <CustomerVideo
          ref={customerVideoRef}
          className="goodtok-video__customer"
        />
        <Controls>
          <ButtonCircleWrapper
            onClick={() => {
              setIsCustomerMicrophoneMuted(!isCustomerMicrophoneMuted);
              props.onMicrophoneMuted(isCustomerMicrophoneMuted);
            }}
          >
            {isCustomerMicrophoneMuted ? (
              <CircleMicrophoneMutedIcon />
            ) : (
              <CircleMicrophoneIcon />
            )}
          </ButtonCircleWrapper>
          <ButtonCircleWrapper
            onClick={() => {
              setIsCustomeCameraMuted(!isCustomerCameraMuted);
              props.onCameraMuted(isCustomerCameraMuted);
            }}
          >
            {isCustomerCameraMuted ? (
              <CircleCameraMutedIcon />
            ) : (
              <CircleCameraIcon />
            )}
          </ButtonCircleWrapper>
          <ButtonCircleWrapper onClick={() => handlePiP(staffVideoRef)}>
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
