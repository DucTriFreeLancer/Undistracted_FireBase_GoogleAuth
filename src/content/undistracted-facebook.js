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
    ['facebookSettings', 'generalSettings'],
    ({ facebookSettings, generalSettings }) => {
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

      // Hide Feed
      if (facebookSettings.feed.value) {
        //stop video
        document.querySelectorAll('video').forEach(vid => vid.pause());
        css += `
      .home .newsFeedComposer #contentArea, #m_newsfeed_stream, #MComposer, #MStoriesTray, [role="main"], [data-pagelet="Stories"] {
        display: none !important;
      }
      `;
      }

      // Hide Navigation at the top
      if (facebookSettings.topNavigation.value) {
        css += `
        [aria-label="Facebook"][role="navigation"]{
          display: none !important;
        }
      `;
      }
      
      // Hide shortcut
      if (facebookSettings.shortcut.value) {
        css += `
        [role="navigation"] div[class="x1iyjqo2"]>div:nth-of-type(2){
          display: none !important;
        }
      `;
      }

       // Hide Left Navigation
       if (facebookSettings.leftnavigation.value) {
        css += `
        [role="navigation"] div[class="x1iyjqo2"]>ul:nth-of-type(1){
          display: none !important;
        }
        [role="navigation"] div[class="x1iyjqo2"]>div:nth-of-type(1){
          display: none !important;
        }
        footer[role="contentinfo"][aria-label="Facebook"]{
          display: none !important;
        }
        `;
      }


      // Hide Chat Sidebar
      if (facebookSettings.chatSidebar.value) {
        css += `
      .fbChatSidebar, #BuddylistPagelet, [data-pagelet="ChatTab"], [aria-label="New Message"], [aria-label="New message"] {
        display: none !important;
      }
      [role="complementary"]{
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