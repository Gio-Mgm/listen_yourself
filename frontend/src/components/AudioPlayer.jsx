import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({emotion}) => {
    console.log("emotion : " + emotion)
    return <div style={{display: "flex", justifyContent: "center"}}>
        <ReactAudioPlayer
        src={`/music/${emotion}.mp3`}
        autoPlay
        controls
        />
    </div>
}

export default AudioPlayer