import Redis from "ioredis";

const redis = new  Redis(process.env.REDIS_URL);

export default async function handler(_req, res) {
  const rawScores = await redis.zrevrange("scores", 0, 10, "WITHSCORES");
  const scores = [];

  for (let i = 0; i < rawScores.length; i += 2) {
    scores.push({
      name: rawScores[i],
      score: parseInt(rawScores[i + 1], 10),

    });
  }

  // console.log(rawScores);

  // const scores = [
  //   { name: "Patty", score: 7 },
  //   { name: "Leigh", score: 5 },
  //   { name: "Ebert", score: 2 },
  // ];

  res.status(200).json(scores);
}
