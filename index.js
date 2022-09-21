
const api = "AIzaSyD4q9eTGU1pkesnxaao0t33d9GPsnYMEIE";

const displayHomevid = async () => {
  try {
    const homeapi = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=32&regionCode=IN&key=${api}`
    );
    const data = await homeapi.json();
    console.log(data.items);
    trendVideos(data.items);
  } catch (err) {
    console.log("Err: ", err);
  }
};

displayHomevid();


let trendVideos = (data) => {
  let box = document.querySelector("#trend");
  let showVid = document.querySelector("#disvideo");
  showVid.style.display = "none";

  data.map(
    ({
      id,
      snippet: { title },
      snippet: { channelTitle },
      statistics: { viewCount },
    }) => {
      let div = document.createElement("div");
      div.setAttribute("class", "videodiv");

      let frame = document.createElement("iframe");
      frame.src = `https://www.youtube.com/embed/${id}`;
      frame.style.border = "0px";
      frame.width = "253px";
      frame.height = "142px";
      frame.allow = "fullscreen";

      let name = document.createElement("h5");
      name.setAttribute("id", "titlename");
      name.innerText = title;

      let channel = document.createElement("p");
      channel.innerText = channelTitle;
      channel.style.marginTop = "-15px";

      let view = document.createElement("p");
      view.style.marginTop = "-15px";
      if (viewCount <= 999999) {
        let n = (viewCount / 1000).toFixed();
        view.innerText = `${n}K views`;
      } else if (viewCount <= 100000000) {
        let num = (viewCount / 1000000).toFixed(1);
        view.innerText = `${num}M views`;
      }

      div.append(frame, name, channel, view);
      box.append(div);
    }
  );
};


const searchvid = async () => {
  try {
    const q = document.querySelector("#searchBox").value;
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${q}&key=${api}`
    );
    const data = await res.json();
    display(data.items);
    console.log(data.items);
  } catch (err) {
    console.log("errr :", err);
  }
};

const display = (videos) => {
  let showVid = document.querySelector("#disvideo");
  let trend = document.querySelector("#trend");
  trend.style.display = "none";
  showVid.style.display = "block";

  showVid.innerHTML = null;
  console.log("Inside Display");

  videos.map(
    ({
      id: { videoId },
      snippet: {
        title,
        channelTitle,
        description,
        thumbnails: {
          high: { url },
        },
      },
    }) => {
      let box = document.createElement("div");
      box.setAttribute("id", "result");
      box.addEventListener("click", function () {});

      let viddiv = document.createElement("div");

      let iframe = document.createElement("img");
      iframe.setAttribute("id", "iframe");
      iframe.src = url;
      iframe.height = "100%";
      iframe.width = "100%";
      iframe.onclick = () => {
        PlayVideo(videodesc);
      };
      let videodesc = {
        videoId,
        title,
        channelTitle,
        description,
      };

      viddiv.append(iframe);

      let detdiv = document.createElement("div");
      let titlename = document.createElement("h3");
      titlename.innerText = title;
      titlename.style.marginTop = "0px";
      let chanName = document.createElement("p");
      chanName.innerText = channelTitle;
      let desc = document.createElement("p");
      desc.innerText = description;

      detdiv.append(titlename, chanName, desc);
      box.append(viddiv, detdiv);
      showVid.append(box);
    }
  );
};



function PlayVideo(x) {
  window.location.href = "playvideo.html";
  localStorage.setItem("youtubeVideo", JSON.stringify(x));
}


function alertfun() {
  console.log("Inside Alertfun Fucntion");
  alert(
    "This Feature is still be to added..\nWebsite Is Under Construction.\nUse Search Option To Watch Any Youtube Video"
  );
}