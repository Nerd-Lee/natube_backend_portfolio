/* 라이브러리 영역 */

const express = require("express");
const cors = require("cors");
const app = express();
const models = require("../models");
const port = process.env.PORT || 8080;
const mediaRouter = require("../routes/mediaRouter");
const usersRouter = require("../routes/usersRouter");
const uploadsRouter = require("../routes/uploadsRouter");

/* express를 이용해서, 받는 파일과 보내는 파일을 json 형식으로 만들고
cors 라이브러리로, cors ( Cross-Origin-Resource-Sharing : 교차 출처 리소스 공유 ) 를 해결하고
express에서 제공하는 router로, 해당 Url로 서버에 요청하면, 각각 js파일로 넘어가서 get,post를 요청하게 함. */

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use("/videos", express.static("videos"));
app.use("/thumbnails", express.static("thumbnails"));
app.use("/profileImages", express.static("profileImages"));
app.use("/api/media", mediaRouter);
app.use("/api/users", usersRouter);
app.use("/api/uploads", uploadsRouter);

app.listen(port, () => {
  console.log("서버 돌아가는 중...");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
});
