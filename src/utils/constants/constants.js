export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_API_KEY,
  },
};
export const IMG_DEFAULT_URL = "https://image.tmdb.org/t/p/w500";
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "Hindi", name: "Hindi" },
  { identifier: "Spanish", name: "Spanish" },
];
export const gptQueryStart =
  "Act as a Movie Recommendation system and suggest some movies for the query : ";
export const gptQueryEnd =
  ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Reuslt : Jawan,Pathan,Sholay,Don,Dhamal";
