export const shadowRootContent =`
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<style>
  .video {
    width: 400px;
    height: 225px;
    margin: 0;
    bottom: 00px;
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
    rotate: 135deg;
  }

  .wrapper button:hover {
    background-color: rgba(85, 85, 85, 0.5);
    color: white;
  }

  #toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background-color: #053204;
    border-radius: 0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #053204;
    box-shadow: 0 0 10px #CCEFE1;
  }

  .wrapper.shown #toggle-btn {
      display: none;
  }

  svg {
    width: 24px;
    height: 24px;
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
  <script src="/lib/client.js?ref=1"></script>
</div>

<button id="toggle-btn">Toggle</button>`;