import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,            // 10 virtual users
  duration: "30s",    // run for 30 seconds
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% requests < 500ms
  },
};

export default function () {
  const res = http.get("http://localhost:3000/users");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has data": (r) => r.body.includes("John Doe"),
  });

  sleep(1); // pacing
}
