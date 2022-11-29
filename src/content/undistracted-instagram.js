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
    ['instagramSettings', 'generalSettings'],
    ({ instagramSettings, generalSettings }) => {
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
      Object.keys(instagramSettings).forEach((key)=>{
        if(key !="blockSite" && !instagramSettings[key].value){
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
      if (instagramSettings.feed.value) {
        //stop video
        document.querySelectorAll('video').forEach(vid => vid.pause());
        css += `
        article._ab6k{
          display: none !important;
        }
        footer[role="contentinfo"]{
          display: none !important;
        }
      `;
      }
      // Hide Suggested accounts
      if (instagramSettings.suggestedAccount.value) {
        css += `
        div[class='_aak6 _aak9'] div[class='_aak3'] {
            display: none !important;
        }
        div[class='_aak6 _aak9'] div[class=' _ab8b'] {
            display: none !important;
        }
        div[class=' _ab6k _ab6m  _aa1x _ackf _ackh'] {
          display: none !important;
      }
      `;
      }

      // Hide Stories
      if (instagramSettings.stories.value) {
        css += `
        div[class='_aac4 _aac5 _aac6'],div[class='x7wzq59 x1dr59a3 x13vifvy'] {
            display: none !important;
        }
      `;
      }

      // Hide Sidebar
      if (instagramSettings.sidebar.value) {
        css += `
        nav[class='_acbh _acbi'] {
            display: none !important;
        }
        div[class='xh8yej3 x1to3lk4 x1n2onr6 x2lah0s'],div[class='x1iyjqo2 xh8yej3'] {
          display: none !important;
        }
      `;
      }

      // Hide More
      if (instagramSettings.more.value) {
        css += `
        div[class='xhuyl8g xl5mz7h'],div[class='xl5mz7h xl5mz7h'] {
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