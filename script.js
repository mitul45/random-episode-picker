const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

// must be absolute path
const home = '/Users/mitul/Desktop/Series/Seinfeld Complete Box Set';
const VLCPath = '/Applications/VLC.app/Contents/MacOS/VLC';
const fileTypes = ['mkv', 'avi', 'mp4', 'webm', 'vob'];

fs.readdir(home, (err, files) => {
  if (err)
    throw err;

  // filter out files like .DS_store
  const allSeasons = files.filter(file => {
    return file.toLowerCase().indexOf('season') !== -1;
  });

  const seasonIdx = randomInt(allSeasons.length);
  fs.readdir(path.join(home, allSeasons[seasonIdx]), (err, files) => {
    if(err)
      throw err;

    // filter out things like .DS_store, .srt files
    const allEpisodes = files.filter(file => {
      let isMediaFile = false;

      fileTypes.forEach(fileType => {
        if(file.toLowerCase().indexOf('.' + fileType) !== -1)
          isMediaFile = true;
      });
      return isMediaFile;
    });

    const episodeIdx = randomInt(allEpisodes.length);
    const episodePath = path.join(home, allSeasons[seasonIdx], allEpisodes[episodeIdx]).replace(/ /g, '\\ ');

    // run in background
    const cmd = VLCPath + ' ' + episodePath + ' &> /dev/null &';
    exec(cmd);
  });
});

/**
 * Get random integer between 0 - n
 */
function randomInt(n) {
  return Math.floor(Math.random(0, n) * n );
}
