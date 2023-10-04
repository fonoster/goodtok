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
export const shadowRootContent = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<style>
  .video {
    width: 400px;
    height: 225px;
    margin: 0;
    bottom: 0;
    contain: content;
    border-radius: 10px;
  }

  .video #goodtok-video {
    height: auto;
    width: 400px;
    bottom: 40px;
  }

  .wrapper {
    z-index: 1000;
    background-color: rgba(51, 51, 51, 0.5);
    display: none;
    border-radius: 10px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 0px;
  }

  .wrapper.shown {
    opacity: 1;
  }

  .button-container {
    position: absolute;
    width: 100%;
    bottom: 10px; 
    text-align: center;
    display: flex;
    justify-content: center; 
    align-items: center;
  }

  .wrapper button {
    background-color: rgba(51, 51, 51, 0.5);
    border: none;
    color: white !important;
    padding: 10px 12px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 0 5px; 
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  .wrapper #goodtok-phone {
    background-color: rgba(255, 0, 0, .7);
    transform: rotate(135deg);
  }

  .wrapper button:hover {
    background-color: rgba(85, 85, 85, 0.5);
    color: white;
  }

  .wrapper.shown #toggle-btn {
    display: none;
  }

  #toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background-color: #053204;
    border-radius: 10px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #CCEFE1;
    transition: transform 0.3s ease-in-out;
  }

  #toggle-btn:hover {
    transform: scale(1.1);
  }

  #chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: #ffffff;
    padding: 0;
    z-index: 1000;
    display: none;
    border-radius: 10px;
    border: 2px solid #CCEFE1;
  }

  #chat-widget #chat-widget-image {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px 10px 0 0;
  }

  .chat-content {
    padding: 10px;
    height: calc(100% - 10px - 10px - 10px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .chat-link {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    text-decoration: none;
    color: #053204;
    width: 100%;
    justify-content: flex-start;
  }

  .chat-link:last-child {
    margin-bottom: 0;
  }

  .chat-link i {
    margin-right: 10px;
    font-size: 20px;
    min-width: 20px;
    text-align: center;
  }

  .chat-link:hover {
    text-decoration: underline;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  .close-widget-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 10px;
    cursor: pointer;
    color: rgba(0, 0, 0, .5);
  }
</style>

<div class="wrapper">
  <div class="video">
    <video id="goodtok-video">
      <p>Your browser doesn't support HTML5 video.</p>
    </video>
    <div class="button-container">
      <button id="goodtok-microphone"></button>
      <button id="goodtok-phone"></button>
      <button id="goodtok-camera"></button>
    </div>
  </div>
  <audio style="display: none" id="goodtok-audio" controls>
    <p>Your browser doesn't support HTML5 audio.</p>
  </audio>
</div>

<div id="chat-widget">
  <button class="close-widget-btn" title="Close Widget"></button>
  <img id="chat-widget-image" src="https://raw.githubusercontent.com/psanders/goodtok/main/assets/meet.jpeg">
  <div class="chat-content">
    <a href="https://cal.com/ref=tbt" class="chat-link" target="_blank">
      <i id="goodtok-calendar-icon"></i>
      Schedule a later meet
    </a>
    <a id="goodtok-meet-now" href="javascript:void(0);" class="chat-link">
      <i id="goodtok-meet-now-icon"></i>
      Meet now
    </a>
  </div>
</div>

<button id="toggle-btn">Toggle</button>`;
