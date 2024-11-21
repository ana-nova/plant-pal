import { Player } from "@lottiefiles/react-lottie-player";

const drizzleAnimation = "/animation/drizzle.json";
const fogAnimation = "/animation/fog.json";
const heavyRainAnimation = "/animation/heavyrain.json";
const ligthSnowAnimation = "/animation/ligntsnow.json";
const mostlyClearAnimation = "/animation/mostlyclear.json";
const overcastAnimation = "/animation/overcast.json";
const rainAnimation = "/animation/rain.json";
const snowAnimation = "/animation/snow.json";
const sunnyAnimation = "/animation/sunny.json";
const thunderAnimation = "/animation/thunderrain.json";
const thunderstormAnimation = "/animation/thunderstorm.json";

const iconMapping = {
  0: (
    <Player
      autoplay
      loop
      src={sunnyAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  1: (
    <Player
      autoplay
      loop
      src={mostlyClearAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  2: (
    <Player
      autoplay
      loop
      src={mostlyClearAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  3: (
    <Player
      autoplay
      loop
      src={overcastAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  45: (
    <Player
      autoplay
      loop
      src={fogAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  51: (
    <Player
      autoplay
      loop
      src={drizzleAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  53: (
    <Player
      autoplay
      loop
      src={drizzleAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  55: (
    <Player
      autoplay
      loop
      src={drizzleAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  56: (
    <Player
      autoplay
      loop
      src={drizzleAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  57: (
    <Player
      autoplay
      loop
      src={drizzleAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  61: (
    <Player
      autoplay
      loop
      src={rainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  63: (
    <Player
      autoplay
      loop
      src={rainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  65: (
    <Player
      autoplay
      loop
      src={heavyRainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  66: (
    <Player
      autoplay
      loop
      src={rainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  67: (
    <Player
      autoplay
      loop
      src={heavyRainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  71: (
    <Player
      autoplay
      loop
      src={ligthSnowAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  73: (
    <Player
      autoplay
      loop
      src={snowAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  75: (
    <Player
      autoplay
      loop
      src={snowAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  77: (
    <Player
      autoplay
      loop
      src={snowAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  80: (
    <Player
      autoplay
      loop
      src={rainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  81: (
    <Player
      autoplay
      loop
      src={rainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  82: (
    <Player
      autoplay
      loop
      src={heavyRainAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  85: (
    <Player
      autoplay
      loop
      src={ligthSnowAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  86: (
    <Player
      autoplay
      loop
      src={snowAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  95: (
    <Player
      autoplay
      loop
      src={thunderstormAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  96: (
    <Player
      autoplay
      loop
      src={thunderAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
  99: (
    <Player
      autoplay
      loop
      src={thunderAnimation}
      aria-hidden="true"
      style={{ height: "100px", width: "100px" }}
    />
  ),
};

export default function WeatherIcon({ weatherData }) {
  const icon = iconMapping[weatherData] || null;

  return icon ? <div>{icon}</div> : null;
}
