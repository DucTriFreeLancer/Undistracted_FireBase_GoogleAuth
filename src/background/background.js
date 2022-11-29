import {} from './firebase_config.js'

// Avoid circular
const fallbackUrl = 'https://www.google.com';
var myTimer;

const allSettings = {
  facebookSettings: {
    blockSite: {
      value: false,
      description: 'Block Facebook',
      tooltip: 'Block all access to Facebook domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"primary"
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
      color:"primary"

    },
    topNavigation: {
      value: false,
      description: 'Hide Top Navigation',
      tooltip: 'Hides Top Navigation',
      order: 2,
      type: 'switch',
      color:"primary"
    },
    shortcut: {
      value: false,
      description: 'Hide Shortcuts',
      tooltip: 'Hides Shortcuts',
      order: 3,
      type: 'switch',
      color:"primary"
    },
    leftnavigation: {
      value: false,
      description: 'Hide Left Navigation',
      tooltip: 'Hides left navigation',
      order: 4,
      type: 'switch',
      color:"primary"
    },
    chatSidebar: {
      value: false,
      description: 'Hide Chat Sidebar',
      tooltip: 'Hides Chat sidebar on the right side',
      order: 5,
      type: 'switch',
      color:"primary"
    }
  },
  youtubeSettings: {
    blockSite: {
      value: false,
      description: 'Block YouTube',
      tooltip: 'Block all access to YouTube domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"danger"
    },
    recommendations: {
      value: false,
      description: 'Hide Recommendations',
      tooltip: "Hides all videos recommended by YouTube's algorithm",
      order: 1,
      type: 'switch',
      color:"danger"
    },
    redirectToSubscriptions: {
      value: false,
      description: 'Force Redirect To My Subscriptions',
      tooltip: "Always redirect YouTube's homepage to my subscriptions feed",
      order: 6,
      type: 'switch',
      color:"danger"
    },
    videoInfo: {
      value: false,
      description: 'Hide Video Info',
      tooltip: 'Hides video info',
      order: 4,
      type: 'switch',
      color:"danger"
    },
    sidebar: {
      value: false,
      description: 'Hide Sidebar',
      tooltip: 'Hides sidebar with shortcuts to other YouTube pages',
      order: 2,
      type: 'switch',
      color:"danger"
    },
    comments: {
      value: false,
      description: 'Hide Comments',
      tooltip: 'Hides comments section from videos',
      order: 5,
      type: 'switch',
      color:"danger"
    },
    thumbnail: {
      value: 0,
      description: 'Blur/ Hide Thumbnails',
      tooltip: 'Blurs/Hides Video Thumbnail',
      order: 7,
      type: 'switch-multi',
      color:"danger"
    },
    upNext: {
      value: false,
      description: 'Hide Up Next Suggestions',
      tooltip: 'Hide suggested videos after and during the video',
      order: 3,
      type: 'switch',
      color:"danger"
    },
  },
  tiktokSettings: {
    blockSite: {
      value: false,
      description: 'Block Tiktok',
      tooltip: 'Block all access to Tiktok domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"dark"
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
      color:"dark"

    },
    suggestedAccount: {
      value: false,
      description: 'Hide Suggested Accounts',
      tooltip: 'Hide Suggested Accounts',
      order: 2,
      type: 'switch',
      color:"dark"
    },
    followingAccount: {
      value: false,
      description: 'Hide Following Accounts',
      tooltip: 'Hide Following Accounts',
      order: 3,
      type: 'switch',
      color:"dark"
    },
    discover: {
      value: false,
      description: 'Hide Discover',
      tooltip: 'Hide Discover',
      order: 4,
      type: 'switch',
      color:"dark"
    },
    leftNavigation: {
      value: false,
      description: 'Hide Left Navigation',
      tooltip: 'Hide Left Navigation',
      order: 5,
      type: 'switch',
      color:"dark"
    },
    footer: {
      value: false,
      description: 'Hide Footer',
      tooltip: 'Hide Footer',
      order: 6,
      type: 'switch',
      color:"dark"
    },
    topNavigation: {
      value: false,
      description: 'Hide Top Navigation',
      tooltip: 'Hides Search',
      order: 7,
      type: 'switch',
      color:"dark"
    },
  },
  instagramSettings: {
    blockSite: {
      value: false,
      description: 'Block Instagram',
      tooltip: 'Block all access to Instagram domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"warning"
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
      color:"warning"
    },
    suggestedAccount: {
      value: false,
      description: 'Hide Suggested Accounts',
      tooltip: 'Hide Suggested Accounts',
      order: 2,
      type: 'switch',
      color:"warning"
    },
    stories: {
      value: false,
      description: 'Hide Stories',
      tooltip: 'Hide Stories',
      order: 3,
      type: 'switch',
      color:"warning"
    },
    more: {
      value: false,
      description: 'Hide More',
      tooltip: 'Hides more',
      order: 4,
      type: 'switch',
      color:"warning"
    },
    sidebar: {
      value: false,
      description: 'Hide Left Navigation',
      tooltip: 'Hide Left Navigation',
      order: 5,
      type: 'switch',
      color:"warning"
    },
  },
  twitterSettings: {
    blockSite: {
      value: false,
      description: 'Block Twitter',
      tooltip: 'Block all access to Twitter domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"primary"

    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides homepage feed',
      order: 1,
      type: 'switch',
      color:"primary"

    },
    rightNavigation: {
      value: false,
      description: 'Hide Right Navigation',
      tooltip: 'Hide Right navigation',
      order: 2,
      type: 'switch',
      color:"primary"

    },
    leftNavigation: {
      value: false,
      description: 'Hide Left Navigation',
      tooltip: 'Hides Left navigation',
      order: 3,
      type: 'switch',
      color:"primary"

    },
    tweet: {
      value: false,
      description: 'Hide Tweet Button',
      tooltip: 'Hides Tweet Button',
      order: 4,
      type: 'switch',
      color:"primary"

    },
    profile: {
      value: false,
      description: 'Hide Profile',
      tooltip: 'Hide Profile',
      order: 5,
      type: 'switch',
      color:"primary"
    },
    search: {
      value: false,
      description: 'Hide Search',
      tooltip: 'Hides Search',
      order: 6,
      type: 'switch',
      color:"primary"

    }
  },
  redditSettings: {
    blockSite: {
      value: false,
      description: 'Block Reddit',
      tooltip: 'Block all access to Reddit domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"danger"

    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hide Feed',
      order: 1,
      type: 'switch',
      color:"danger"

      // enabled: false
    },
    chat: {
      value: false,
      description: 'Hide Chats',
      tooltip: 'Hide Chats',
      order: 2,
      type: 'switch',
      color:"danger"

      // enabled: false
    },
    rightSideBar: {
      value: false,
      description: 'Hide Right Sidebar',
      tooltip: 'Hide right side bare',
      order: 3,
      type: 'switch',
      color:"danger"
    },
    createPost: {
      value: false,
      description: 'Hide Create Post',
      tooltip: 'Hide Section to create a post',
      type: 'switch',
      order: 4,
      color:"danger"

    },
    topNavigation: {
      value: false,
      description: 'Hide Top Navigation',
      tooltip: 'Hides Top Navigation',
      type: 'switch',
      order: 5,
      color:"danger"

    },
    subReddit: {
      value: false,
      description: 'Hide r/Subreddit Info',
      tooltip: 'Hide r/Subreddit Info',
      type: 'switch',
      order: 6,
      color:"danger"

    },
  },
  netflixSettings: {
    blockSite: {
      value: false,
      description: 'Block Netflix',
      tooltip: 'Block all access to Netflix domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"danger"

    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides Feed',
      order: 1,
      type: 'switch',
      color:"danger"

    },
    myList: {
      value: false,
      description: 'Hide My List',
      tooltip: 'Hides My List',
      order: 2,
      type: 'switch',
      color:"danger"

    },
    continueWatching: {
      value: false,
      description: 'Hide Continue Watching',
      tooltip: 'Hide Continue Watching',
      order: 3,
      type: 'switch',
      color:"danger"

    },
    navigation: {
      value: false,
      description: 'Hide Navigation',
      tooltip: 'Hides Navigation',
      type: 'switch',
      order: 4,
      color:"danger"

    },
    profile: {
      value: false,
      description: 'Hide Profile',
      tooltip: 'Hide Profile',
      type: 'switch',
      order: 5,
      color:"danger"

    },
    search: {
      value: false,
      description: 'Hide Search',
      tooltip: 'Hide Search',
      type: 'switch',
      order: 6,
      color:"danger"
    }
  },
  generalSettings: {
    disableFilters: {
      value: false,
      description: 'Pause All Filters',
      tooltip:
        'Disables all filters temporarily. Your filter settings will remain intact',
      type: 'switch',
      order: 1,
      color:"primary"
    },
    disableFiltersTemporary: {
      value: { active: false, endTimestamp: '' },
      description: 'Pause For 5 Minutes',
      tooltip:
        'Pauses all filters for 5 minutes and then resumes automatically',
      type: 'switch-with-meta',
      order: 2,
      color:"primary"

    },
    disableDuringHours: {
      value: { active: false, fromTime: '3:45', toTime: '16:30' },
      description: 'Pause During',
      tooltip: '',
      type: 'switch-with-time-period',
      order: 3,
      color:"primary"

    },
    customSitesToBlock: {
      value: { active: false, customURLList: [] },
      description: 'Block Custom List',
      tooltip: '',
      type: 'text-list',
      order: 4,
      color:"primary"

    },
    customRedirectURL: {
      value: 'www.google.com',
      description: 'Redirect Blocked Websites To:',
      tooltip:
        'Enter link to a site where you wants to be redirected to if blocked',
      type: 'text',
      order: 5,
      color:"primary"

    },
    communicateToDev: {
      tooltip: 'Help the developer improve this extension',
      buttonList: [
        {
          title: 'Leave Rating',
          action: 'redirect',
          icon: 'comments',
          iconColor: '#01b1f1',
          to:
            "https://chrome.google.com/webstore/detail/"+chrome.runtime.id+'/reviews',
        },
        {
          title: 'Suggest Feature / Report Bug',
          action: 'mail',
          icon: 'flag',
          iconColor: '#52c41a',
          to:
            'hanskang@hotmail.ca?subject=Suggest Feature Or Report Bug&body=Description: ',
        }
      ],
      type: 'button-list',
      order: 6,
      enabled: true
    },
    donate: {
      value: false,
      description: '',
      tooltip: 'Support the development',
      type: 'image',
      link:
        '<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 15px 7px 10px !important;line-height: 35px !important;height:51px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#5F7FFF !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 15px 7px 10px !important;font-size: 22px !important;letter-spacing: 0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:\'Cookie\', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://paypal.me/hanskang1?country.x=CA&locale.x=en_US"><img src="https://res.cloudinary.com/dxmi9d3vj/image/upload/v1594642510/book_dfhgvh.svg" alt="Buy me a book"><span style="margin-left:5px;font-size:28px !important;">Buy me a book</span></a>',
      order: 7,
      enabled: true
    },
  },
};

function setLaunchPages(reason, previousVersion = '') {
  // chrome.runtime.setUninstallURL('https://undistracted.typeform.com/to/yx84Z6');
  // if (reason === 'install') {
  //   chrome.tabs.create({ url: 'https://www.undistracted.app/installed' });
  // } else if (reason === 'update') {
  //   if (chrome.runtime.getManifest().version === '1.6') {
  //     chrome.tabs.create({ url: 'https://www.undistracted.app/updated' });
  //   }
  // }
}

function loadStorageToLocal(cbOnLoad) {
  chrome.storage.sync.get(
    [
      'youtubeSettings',
      'facebookSettings',
      'instagramSettings',
      'tiktokSettings',
      'redditSettings',
      'twitterSettings',
      'netflixSettings',
      'generalSettings'
    ],
    (storageData) => {
      if (storageData.twitterSettings) {
        Object.keys(storageData.twitterSettings).forEach((filterKey) => {
          allSettings.twitterSettings[filterKey].value =
            storageData.twitterSettings[filterKey].value;
        });
      }
      if (storageData.youtubeSettings) {
        Object.keys(storageData.youtubeSettings).forEach((filterKey) => {
          allSettings.youtubeSettings[filterKey].value =
            storageData.youtubeSettings[filterKey].value;
        });
      }
      if (storageData.facebookSettings) {
        Object.keys(storageData.facebookSettings).forEach((filterKey) => {
          allSettings.facebookSettings[filterKey].value =
            storageData.facebookSettings[filterKey].value;
        });
      }
      if (storageData.redditSettings) {
        Object.keys(storageData.redditSettings).forEach((filterKey) => {
          allSettings.redditSettings[filterKey].value =
            storageData.redditSettings[filterKey].value;
        });
      }
      if (storageData.netflixSettings) {
        Object.keys(storageData.netflixSettings).forEach((filterKey) => {
          allSettings.netflixSettings[filterKey].value =
            storageData.netflixSettings[filterKey].value;
        });
      }
      if (storageData.tiktokSettings) {
        Object.keys(storageData.tiktokSettings).forEach((filterKey) => {
          allSettings.tiktokSettings[filterKey].value =
            storageData.tiktokSettings[filterKey].value;
        });
      }
      if (storageData.instagramSettings) {
        Object.keys(storageData.instagramSettings).forEach((filterKey) => {
          allSettings.instagramSettings[filterKey].value =
            storageData.instagramSettings[filterKey].value;
        });
      }
      if (storageData.generalSettings) {
        Object.keys(storageData.generalSettings).forEach((filterKey) => {
          if (
            filterKey === 'customSitesToBlock' &&
            Array.isArray(allSettings.generalSettings.customSitesToBlock.value)
          ) {
            allSettings.generalSettings.customSitesToBlock.value = {
              active: false,
              customURLList: [],
            };
          } else {
            allSettings.generalSettings[filterKey].value =
              storageData.generalSettings[filterKey].value;
          }
        });
      }
      cbOnLoad && cbOnLoad();
    }
  );
}

function rootDomain(url) {
  return url
    .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim)[0]
    .split('://')
    .reverse()[0]
    .split('www.')
    .reverse()[0];
}

function safeRedirectOnBlock(tabId, redirectUrl, fallbackUrl, safeCheckUrls) {
  const redirectUrlRootDomain = rootDomain(redirectUrl);
  const safeRedirectUrl = safeCheckUrls.some((i) =>
    redirectUrlRootDomain.includes(i)
  )
    ? fallbackUrl
    : redirectUrl;
  chrome.tabs.update(
    tabId,
    {
      url: safeRedirectUrl,
    },
    () => {
      return;
    }
  );
}

function startTimer() {
  const {
    active,
    endTimestamp,
  } = allSettings.generalSettings.disableFiltersTemporary.value;
  const remainingTime = endTimestamp - Date.now();
  if (!active || remainingTime <= 0) {
    return endTimer();
  }
  if (remainingTime > 0) {
    myTimer = setTimeout(endTimer, remainingTime);
  }
}
function endTimer() {
  allSettings.generalSettings.disableFiltersTemporary.value.endTimestamp = '';
  allSettings.generalSettings.disableFiltersTemporary.value.active = false;
  chrome.storage.sync.set(
    {
      generalSettings: allSettings.generalSettings,
    },
    clearTimeout(myTimer)
  );
}

loadStorageToLocal(startTimer);

/* Set storage as empty on installing */
chrome.runtime.onInstalled.addListener((details) => {
  /* Launch welcome / install  */
  setLaunchPages(details && details.reason, details && details.previousVersion);

  // TODO One time - change true/false to show/blur/hide
  (() => {
    var updatedYoutubeSettings = allSettings.youtubeSettings;
    if (allSettings.youtubeSettings.thumbnail.value == false) {
      updatedYoutubeSettings.thumbnail.value = '0';
    } else if (allSettings.youtubeSettings.thumbnail.value == true) {
      updatedYoutubeSettings.thumbnail.value = '1';
    } else {
      updatedYoutubeSettings.thumbnail.value =
        allSettings.youtubeSettings.value;
    }
    chrome.storage.sync.set({
      youtubeSettings: updatedYoutubeSettings,
    });
  })();

  /* Get data from local if already there on updates */
  loadStorageToLocal(() => {
    chrome.storage.sync.set({
      twitterSettings: allSettings.twitterSettings,
      youtubeSettings: allSettings.youtubeSettings,
      facebookSettings: allSettings.facebookSettings,
      redditSettings: allSettings.redditSettings,
      netflixSettings: allSettings.netflixSettings,
      tiktokSettings: allSettings.tiktokSettings,
      instagramSettings: allSettings.instagramSettings,
      generalSettings: allSettings.generalSettings,
    });
  });
});

/* Load settings in script on chrome start */
chrome.runtime.onStartup.addListener(() => {
  loadStorageToLocal();
});

/* Listen to changes in settings and transmit to all open tabs for live update */
chrome.storage.onChanged.addListener(async(changes, namespace) => {
  const [filterCategory, bothChanges] = Object.entries(changes)[0];
  const newSettings = bothChanges.newValue;
  const oldTimerActive =
    allSettings.generalSettings.disableFiltersTemporary.value.active;
  allSettings[filterCategory] = newSettings;

  // Handle disableFiltersTemporary toggle
  if (
    filterCategory === 'generalSettings' &&
    newSettings.disableFiltersTemporary.value.active !== oldTimerActive
  ) {
    if (allSettings.generalSettings.disableFiltersTemporary.value.active) {
      startTimer();
    } else {
      endTimer();
    }
  }
  var tabs = await chrome.tabs.query({});
  await tabs.forEach(async function (tab) {
    try
    {
      await chrome.tabs.sendMessage(tab.id, 'refresh');
    }
    catch(e){
    }
  });
});

// Blocking custom websites
chrome.webNavigation.onBeforeNavigate.addListener(({ frameId, tabId, url }) => {
  if (frameId === 0) {
    const {
      twitterSettings,
      youtubeSettings,
      facebookSettings,
      redditSettings,
      netflixSettings,
      tiktokSettings,
      instagramSettings,
      generalSettings,
    } = allSettings;
    const urlDomain = rootDomain(url);
    const redirectUrl =
      'https://' +
      generalSettings.customRedirectURL.value
        .trim()
        .split('://')
        .reverse()[0];
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
    const fromTime = generalSettings.disableDuringHours.value.fromTime;
    const toTime = generalSettings.disableDuringHours.value.toTime;

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

    if (
      facebookSettings.blockSite.value &&
      relatedDomains.facebook.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.facebook
      );
    } else if (
      youtubeSettings.blockSite.value &&
      relatedDomains.youtube.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.youtube
      );
    } else if (
      youtubeSettings.redirectToSubscriptions.value &&
      relatedDomains.youtube.some((i) => urlDomain.includes(i)) &&
      url.split('.com')[1] == '/' &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        'https://www.youtube.com/feed/subscriptions',
        fallbackUrl,
        ['https://www.youtube.com/feed/subscriptions']
      );
    } else if (
      tiktokSettings.blockSite.value &&
      relatedDomains.tiktok.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.tiktok
      );
    } else if (
      instagramSettings.blockSite.value &&
      relatedDomains.instagram.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.instagram
      );
    } else if (
      twitterSettings.blockSite.value &&
      relatedDomains.twitter.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.twitter
      );
    } else if (
      redditSettings.blockSite.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    } else if (
      netflixSettings.blockSite.value &&
      relatedDomains.netflix.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.netflix
      );
    } else if (generalSettings.customSitesToBlock.value.active) {
      const customURLListDomains = generalSettings.customSitesToBlock.value.customURLList.map(
        (customURL) => rootDomain(customURL)
      );
      if (customURLListDomains.some((i) => urlDomain.includes(i))) {
        safeRedirectOnBlock(
          tabId,
          redirectUrl,
          fallbackUrl,
          customURLListDomains
        );
      }
    }
  }
});
