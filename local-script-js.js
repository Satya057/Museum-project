// Initialize images and setup custom controls
window.onload = function() {
  // Set background image
  document.body.style.backgroundImage = `url('${config.background}')`;
  
  // Set thumbnail images
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`thumb${i}-img`).src = config.thumbnails[i-1];
  }
  
  // Set exit icons
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`exit-icon-${i}`).src = config.exitIcon;
  }
  
  // Set video sources and setup custom controls
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`video-source-${i}`).src = config.videos[i-1];
    setupCustomControls(i);
  }
};

// Setup custom video controls
function setupCustomControls(videoNumber) {
  const video = document.getElementById(`video-player-${videoNumber}`);
  const playPauseBtn = document.querySelector(`#video-container-${videoNumber} .play-pause-btn`);
  const progressBar = document.querySelector(`#video-container-${videoNumber} .progress-bar`);
  const progress = document.querySelector(`#video-container-${videoNumber} .progress`);
  const timeDisplay = document.querySelector(`#video-container-${videoNumber} .time-display`);
  
  // Play/pause button
  playPauseBtn.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      video.pause();
      playPauseBtn.textContent = 'Play';
    }
  });
  
  // Click on video to play/pause
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      video.pause();
      playPauseBtn.textContent = 'Play';
    }
  });
  
  // Update progress bar
  video.addEventListener('timeupdate', function() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
    
    // Update time display
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });
  
  // Click on progress bar to seek
  progressBar.addEventListener('click', function(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });
  
  // Reset when video ends
  video.addEventListener('ended', function() {
    playPauseBtn.textContent = 'Play';
    progress.style.width = '0%';
    
    // Return to main menu when video ends
    closeVideo(videoNumber);
  });
}

// Play video function
function playVideo(videoNumber) {
  const videoContainer = document.getElementById(`video-container-${videoNumber}`);
  const videoPlayer = document.getElementById(`video-player-${videoNumber}`);
  const playPauseBtn = document.querySelector(`#video-container-${videoNumber} .play-pause-btn`);
  
  // Show the video container
  videoContainer.style.display = "flex";
  
  // Load and play the video automatically
  videoPlayer.load();
  videoPlayer.play();
  playPauseBtn.textContent = 'Pause';
}

// Close video function
function closeVideo(videoNumber) {
  const videoContainer = document.getElementById(`video-container-${videoNumber}`);
  const videoPlayer = document.getElementById(`video-player-${videoNumber}`);
  
  // Pause the video
  videoPlayer.pause();
  
  // Hide the video container
  videoContainer.style.display = "none";
}