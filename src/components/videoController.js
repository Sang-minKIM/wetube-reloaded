import Video from "../models/Video";

/* callback 
Video.find({}, (error, document) => {
  return res.render("home", { pageTitle: "home" });
});
*/
// Promise
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createAt: "descending" });
  return res.render("home", { pageTitle: "home", videos });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload new video" });
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatTags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload video",
      errorMessage: error._message,
    });
  }
};
export const watch = async (req, res) => {
  const id = req.params.id;
  // const {id} = req.params
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "not found" });
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "not found" });
  }
  const { title, description, hashtags } = req.body;
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatTags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};