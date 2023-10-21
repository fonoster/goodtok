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

type VideoProps = {
  isCustomerVideoMuted?: boolean;
  isOpen?: boolean;
  onClosed?: () => void;
};

export const Video = forwardRef((props: VideoProps, ref) => {
  const [isCustomerVideoMuted, setIsCustomerVideoMuted] = useState(false);
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
