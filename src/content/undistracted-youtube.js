'use strict';
/* global chrome */
chrome.runtime.onMessage.addListener(function(message) {
  runContentScript();
});

runContentScript();

function runContentScript() {
  var css = '';
  const currentTime =
    new Date()
      .getHours()
      .toString()
      .padStart(2, '0') +
    ':' +
    new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0');

  chrome.storage.sync.get(
    ['youtubeSettings', 'generalSettings'],
    ({ youtubeSettings, generalSettings }) => {
      const fromTime = generalSettings.disableDuringHours.value.fromTime;
      const toTime = generalSettings.disableDuringHours.value.toTime;
      
      if (!document.getElementById('undistracted-script')) {
        var script = document.createElement('script');
        script.setAttribute('id', 'undistracted-script');
        script.src = chrome.runtime.getURL('script.js');
        script.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(script);
      }

      // Remove existing and add new
      var existingStyle = document.getElementById('undistracted-style');
      if (existingStyle) {
        existingStyle.remove();
      }

      if (
        generalSettings.disableFilters.value ||
        generalSettings.disableFiltersTemporary.value.active ||
        (generalSettings.disableDuringHours.value.active &&
          (fromTime < toTime
            ? fromTime <= currentTime && currentTime < toTime
            : (fromTime <= currentTime && currentTime <= '23:59') ||
              ('00:00' <= currentTime && currentTime < toTime)))
      ) {
        return;
      }

      // Hide Recommendations
      if (youtubeSettings.recommendations.value) {
        //stop video
        document.querySelectorAll('video').forEach(vid => vid.pause());
        css += `
        [page-subtype="home"] #primary {
        display: none !important;
      }

      /* Mobile view */
      body.isHomePage ytm-section-list-renderer>lazy-list {
        display: none !important;
      }
      `;
      }

      // Hide Sidebar
      if (youtubeSettings.sidebar.value) {
        css += `
        ytd-guide-renderer {
        display: none !important;
      }
      `;
      }

      // Hide video info
      if (youtubeSettings.videoInfo.value) {
        css += `
      ytd-watch-metadata {
        display: none !important;
      }
      `;
      }

      // Hide Comments
      if (youtubeSettings.comments.value) {
        css += `
      ytd-comments, ytm-comment-section-renderer {
        display: none !important;
      }
      `;
      }

      // Hide Thumbnail
      switch (youtubeSettings.thumbnail.value) {
        case '0':
          break;

        case '1':
          css += `
            #thumbnail img, .ytp-videowall-still-image {
              filter: blur(100px);
            }
            `;
          break;

        case '2':
          css += `
              ytd-thumbnail, ytd-playlist-thumbnail, #thumbnail, #thumbnail-container, .shelf-skeleton .thumbnail, .ytp-videowall-still-image {
                display: none !important;
              }
              .metadata.ytd-compact-video-renderer {
                padding-right: 0 !important;
              }
              .shelf-skeleton .video-skeleton {
                margin-right: 4px;
              }
              `;
          break;

        default:
          break;
      }

      // Hide Up Next Suggestions
      if (youtubeSettings.upNext.value) {
        css += `
      .ytp-endscreen-content, ytd-watch-next-secondary-results-renderer, [data-content-type="related"], .ytp-ce-element.ytp-ce-video, .ytp-ce-element.ytp-ce-playlist {
        display: none !important;
      }
      `;
      }

      var style = document.createElement('style');
      style.setAttribute('id', 'undistracted-style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }
  );
}
