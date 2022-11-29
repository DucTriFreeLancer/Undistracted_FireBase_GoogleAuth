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
    ['redditSettings', 'generalSettings'],
    ({ redditSettings, generalSettings }) => {
      const fromTime = generalSettings.disableDuringHours.value.fromTime;
      const toTime = generalSettings.disableDuringHours.value.toTime;
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

      let all = true;
      Object.keys(redditSettings).forEach((key)=>{
        if(key !="blockSite" && !redditSettings[key].value){
          all = false;
        }
      })
      // Dark background
      if(all){
        css += `
        html {
          filter:  brightness(0) saturate(100%);
        }
        svg[aria-label="Loading..."]{
          display: none !important;
        }
        `;
      }

      // Hide Feed
      if (redditSettings.feed.value) {
        //stop video
        document.querySelectorAll('video').forEach(vid => vid.pause());
        css += `
        .ListingLayout-outerContainer div[class="wBtTDilkW_rtT2k5x3eie"] {
            display: none !important;
        }
        .ListingLayout-outerContainer div[data-testid="post-container"] {
            display: none !important;
        }
      `;
      }
      // Hide Chats
      if (redditSettings.chat.value) {
        css += `
        .ListingLayout-outerContainer div[class="YfUlQeQY0xbmCv-So3isP"] {
            display: none !important;
        }
      `;
      }

      // Hide Front Page
      if (redditSettings.rightSideBar.value) {
        css += `
      .ListingLayout-outerContainer div[data-testid="frontpage-sidebar"] {
        display: none !important;
      }

      `;
      }

      // Hide Popular
      if (redditSettings.createPost.value) {
        css += `
        div[class="_2jJNpBqXMbbyOiGCElTYxZ"]:has(input[name="createPost"]) {
            display: none !important;
        }
      `;
      }

      // Hide All
      if (redditSettings.topNavigation.value) {
        css += `
        header {
        display: none !important;
      }
      `;
      }

      // Hide r/SubReddit
      if (redditSettings.subReddit.value) {
        css += `
        .ListingLayout-outerContainer span[class="_2L5G9B5yaoqW3IegiYN-FL"],
        .ListingLayout-outerContainer div[class="MSTY2ZpsdupobywLEfx9u "] {
          display: none !important;
        }
        .ListingLayout-outerContainer div[data-testid="subreddit-sidebar"] {
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
