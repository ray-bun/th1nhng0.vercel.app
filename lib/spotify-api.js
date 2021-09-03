import axios from "axios";
//run this to get code
//https://accounts.spotify.com/en/authorize?response_type=code&client_id=552b6da4c16e4120825c73fe414582bf&scope=user-read-playback-state user-read-currently-playing user-read-email user-read-recently-played user-read-playback-position user-read-private user-top-read&redirect_uri=https://th1nhng0.vercel.app/
const my_refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const Authorization =
  "Basic NTUyYjZkYTRjMTZlNDEyMDgyNWM3M2ZlNDE0NTgyYmY6YjUwZWIxMWUwYzZjNDQ4ZWJhYmEyYTM5NTViNmRiY2M=";
let access_token = "";
const instance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (access_token != "") config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          let rs = await refresh_token();
          const { access_token: rs_access_token } = rs.data;
          access_token = rs_access_token;
          instance.defaults.headers.common["Authorization"] = `Bearer ${rs_access_token}`;
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

function refresh_token() {
  return axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      refresh_token: my_refresh_token,
      grant_type: "refresh_token",
    }),
    { headers: { Authorization, "content-type": "application/x-www-form-urlencoded" } }
  );
}

export function getMe() {
  return new Promise((resolve, reject) => {
    instance
      .get("/me")
      .then((data) => resolve(data.data))
      .catch((e) => reject(e));
  });
}
export function getCurrentPlaying() {
  return new Promise((resolve, reject) => {
    instance
      .get("/me/player")
      .then((data) => resolve(data.data))
      .catch((e) => reject(e));
  });
}
export function getTrackFeatures(id) {
  return new Promise((resolve, reject) => {
    instance
      .get("/audio-features/" + id)
      .then((data) => resolve(data.data))
      .catch((e) => reject(e));
  });
}
export function getTop(type, time_range = "long_term") {
  return new Promise((resolve, reject) => {
    instance
      .get("/me/top/" + type + `?time_range=${time_range}&limit=50&offset=0`)
      .then((data) => resolve(data.data))
      .catch((e) => reject(e));
  });
}