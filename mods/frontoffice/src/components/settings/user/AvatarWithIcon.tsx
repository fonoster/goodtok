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
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type AvatarWithOverlayIconProps = {
  src: string;
  alt: string;
  onClick: () => void;
};

function AvatarWithOverlayIcon({
  src,
  alt,
  onClick
}: AvatarWithOverlayIconProps) {
  const avatarSize = 96;

  return (
    <Box
      position="relative"
      display="inline-block"
      onClick={onClick} // Set the onClick prop to the Box
      sx={{
        cursor: "pointer" // Add the hand cursor style
      }}
    >
      <Avatar
        src={src}
        alt={alt}
        sx={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: "50%"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: "30%",
          opacity: 0.5,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CameraAltIcon sx={{ color: "#999694", fontSize: avatarSize * 0.25 }} />
      </Box>
    </Box>
  );
}

export default AvatarWithOverlayIcon;
