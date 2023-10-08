/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
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
import { useEffect } from "react";
import { initVideoWidget } from "./widget";

export default function Video() {
  useEffect(() => {
    initVideoWidget(document);
  }, []);

  return (
    <div className="video-container">
      <video id="goodtok-video" width="100%" className="video-area">
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
      <div className="controls">
        <button id="goodtok-call">Call</button>
        <button id="goodtok-mute-audio">Mute Audio</button>
        <button id="goodtok-mute-video">Mute Camera</button>
      </div>

      <audio className="audio-container" id="goodtok-audio" controls>
        <p>Your browser doesn't support HTML5 audio.</p>
      </audio>

      <style jsx="true">{`
        .audio-container {
          display: none;
        }

        .video-container {
          width: 100%;
          height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .video-area {
          width: 100%;
          height: 50vh;
          background-color: #1f1f1f;
          position: relative;
        }

        .controls {
          margin-top: 10px;
          gap: 30px;
          display: flex;
        }

        .control-btn:hover {
          background-color: #ffffff20;
        }

        .clip-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

{
  /* 
  <div class="video">

  </div>


*/
}
