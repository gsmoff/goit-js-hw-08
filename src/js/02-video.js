import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = "videoplayer-current-time";
const saveData = localStorage.getItem(STORAGE_KEY);


const onPlay = function (data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
    console.log('viewing time:' +data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

function playAgain() {
    if (saveData !== null) {
        const parsedData = JSON.parse(saveData);
        player.setCurrentTime(parsedData)
    };
};
playAgain();
