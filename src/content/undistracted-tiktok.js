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
    ['tiktokSettings', 'generalSettings'],
    ({ tiktokSettings, generalSettings }) => {
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
      Object.keys(tiktokSettings).forEach((key)=>{
        if(key !="blockSite" && !tiktokSettings[key].value){
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
      if (tiktokSettings.feed.value) {
        //stop video
        document.querySelectorAll('video').forEach(vid => vid.pause());
        css += `
        div[class*='-DivBodyContainer'] div[class^='tiktok-'][class*='-DivMainContainer'] div[data-e2e="recommend-list-item-container"] {
            display: none !important;
        }
      `;
      }
      // Hide Suggested accounts
      if (tiktokSettings.suggestedAccount.value) {
        css += `
        div[class^='tiktok-'][class*='-DivUserContainer']:has(p[data-e2e="suggest-accounts"])  {
            display: none !important;
        }
      `;
      }

      // Hide following Account
      if (tiktokSettings.followingAccount.value) {
        css += `
        div[class^='tiktok-'][class*='-DivUserContainer']:has(p[data-e2e="following-accounts"])  {
            display: none !important;
        }
      `;
      }

      // Hide discover
      if (tiktokSettings.discover.value) {
        css += `
        div[class^='tiktok-'][class*='-DivDiscoverContainer']:has(p[data-e2e="nav-discover-title"])  {
          display: none !important;
        }
      `;
      }
      
      // Hide left navigation
      if (tiktokSettings.leftNavigation.value) {
        css += `
        div[class*='-DivHeaderWrapperMain'] a[data-e2e="tiktok-logo"] {
            display: none !important;
        }
        div[class*='-DivWrapper'] div[class^='tiktok-'][class*='-DivMainNavContainer']  {
            display: none !important;
        }
      `;
      }
      
      // Hide top navigation
      if (tiktokSettings.topNavigation.value) {
        css += `
        div[class*='-DivHeaderCenterContainer'] div[class^='tiktok-'][class*='-DivSearchFormContainer'] {
            display: none !important;
        }
        div[class*='-DivHeaderRightContainer'] {
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