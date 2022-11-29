export const relatedDomains = {
    facebook: ['facebook.com', 'fb.com'],
    youtube: ['youtube.com', 'youtu.be'],
    tiktok: ['tiktok.com'],
    instagram: ['instagram.com'],
    twitter: [
      'twitter.com',
      'twimg.com',
      'twttr.net',
      'twttr.com',
      'abs.twimg.com',
    ],
    reddit: ['reddit.com', 'old.reddit.com'],
    netflix: ['netflix.com'],
    linkedin: ['linkedin.com'],
};
export function isValidHttpUrl(textval) {
  var urlregex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
  return urlregex.test(textval);
}