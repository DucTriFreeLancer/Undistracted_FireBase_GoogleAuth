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
    ['netflixSettings', 'generalSettings'],
    ({ netflixSettings, generalSettings }) => {
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
      Object.keys(netflixSettings).forEach((key)=>{
        if(key !="blockSite" && !netflixSettings[key].value){
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

      // Hide Recommendations
      if (netflixSettings.feed.value) {
        //stop video
        const billboardVideo = document.querySelector('.billboard video');

        if (billboardVideo) {
          billboardVideo.pause();
        }

        css += `

        .mainView {
          margin-top: 5em;
        }

        span.notifications div {
          display: none;
        }

        .billboard-row, .lolomoRow:not([data-list-context='continueWatching']):not([data-list-context='queue']) {
        display: none !important;
        }
        #member-footer {
        display: none !important;
        }
        `;
      }

      // Hide My List
      if (netflixSettings.myList.value) {
        css += `
        .lolomoRow[data-list-context='queue']  {
            display: none !important;
        }
        `;
      }
      // Hide Continue Watching
      if (netflixSettings.continueWatching.value) {
      css += `
      .lolomoRow[data-list-context='continueWatching']  {
          display: none !important;
      }
      `;
      }

      // Hide Navigation
      if (netflixSettings.navigation.value) {
        css += `
        div[class="pinning-header-container"] .logo  {
          display: none !important;
        }
        div[class="pinning-header-container"] .tabbed-primary-navigation  {
            display: none !important;
        }
        `;
      }

      // Hide profile
      if (netflixSettings.profile.value) {
        css += `
        div[class="pinning-header-container"] .secondary-navigation .nav-element>:not(div.searchBox) {
            display: none !important;
        }
        `;
      }
      // Hide search
      if (netflixSettings.search.value) {
        css += `
        div[class="pinning-header-container"] .secondary-navigation .searchBox {
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
