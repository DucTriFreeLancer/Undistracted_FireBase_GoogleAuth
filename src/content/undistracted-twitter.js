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
    ['twitterSettings', 'generalSettings'],
    ({ twitterSettings, generalSettings }) => {
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
      Object.keys(twitterSettings).forEach((key)=>{
        if(key !="blockSite" && !twitterSettings[key].value){
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

      // Hide Timeline - Opacity instead of Display to avoid re-trigger of layout drawing and hence slowdown
      if (twitterSettings.feed.value) {
        //stop video
        document.querySelectorAll('video').forEach(vid => vid.pause());
        css += `
        [role='main']#timeline .stream-container,[role='main'] [aria-label="Home timeline"] {
          visibility: hidden !important;
        }
        `;
      }

      // Hide Right Navigatiom
      if (twitterSettings.rightNavigation.value) {
        css += `
      .wtf-module, [aria-label="Who to follow"],[aria-label="Footer"] {
        display: none !important;
      }
      [aria-label="Timeline: Trending now"] {
        display: none !important;
      }
      `;
      }

      // Hide Left Navigation
      if (twitterSettings.leftNavigation.value) {
        css += `
      header[role="banner"] [aria-label="Primary"] {
        display: none !important;
      }
      `;
      }

      // Hide Search
      if (twitterSettings.search.value) {
        css += `
      [aria-label="Search Twitter"] {
        display: none !important;
      }
      `;
      }

      // Hide Tweet Button
      if (twitterSettings.tweet.value) {
        css += `
      a[aria-label="Tweet"] {
        display: none !important;
      }
      `;
      }
      // Hide profile
      if (twitterSettings.profile.value) {
        css += `
      [aria-label="Account menu"] {
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
