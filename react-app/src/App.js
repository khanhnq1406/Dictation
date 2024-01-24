import "./App.css";
import YouTube from "react-youtube";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubePlayer, setYoutubePlayer] = useState();
  const submitYoutubeUrl = (event) => {
    event.preventDefault();
    let url = event.target[0].value;
    const startListString = url.indexOf("v=");
    if (startListString >= 0) {
      const endListString =
        url.indexOf("&", startListString) >= 0
          ? url.indexOf("&", startListString)
          : undefined;
      url = url.substring(startListString + 2, endListString);
      setYoutubeUrl(url);
    }
  };
  function onReadyHandle(event) {
    setYoutubePlayer(event.target);
    console.log(event.target);
  }

  async function btnClick() {
    // try {
    //   const response = await axios.get(
    //     `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${youtubeUrl}&key=${API_KEY}`
    //   );
    //   const captionTracks = response.data.items;
    //   if (captionTracks.length > 0) {
    //     const captionTrackId = captionTracks[0].id;
    //     const transcriptResponse = await axios.get(
    //       `https://www.googleapis.com/youtube/v3/captions/${captionTrackId}?tfmt=ttml&key=${API_KEY}`
    //     );
    //     const transcriptContent = transcriptResponse.data;
    //     console.log("Transcript Content:", transcriptContent);
    //   } else {
    //     console.error("No caption tracks found for the video.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching YouTube transcript:", error.message);
    // }
  }

  return (
    <div className="App">
      <form onSubmit={submitYoutubeUrl}>
        <input></input>
        <button>Send</button>
      </form>
      {youtubePlayer != undefined ? (
        <>
          <button
            onClick={(e) => {
              console.log(youtubePlayer.getDuration());
            }}
          >
            Get duration
          </button>
          <button
            onClick={(e) => {
              youtubePlayer.playVideo();
            }}
          >
            Play
          </button>
          <button
            onClick={(e) => {
              youtubePlayer.pauseVideo();
            }}
          >
            Pause
          </button>
          <button
            onClick={(e) => {
              youtubePlayer.seekTo(Number(youtubePlayer.getCurrentTime()) - 10);
            }}
          >
            Prev 10s
          </button>

          <button
            onClick={(e) => {
              youtubePlayer.seekTo(Number(youtubePlayer.getCurrentTime()) + 10);
            }}
          >
            Next 10s
          </button>
        </>
      ) : (
        <></>
      )}

      <button onClick={btnClick}>click</button>
      {youtubeUrl !== "" ? (
        <YouTube
          videoId={youtubeUrl}
          opts={{
            playerVars: {},
          }}
          onReady={onReadyHandle}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
