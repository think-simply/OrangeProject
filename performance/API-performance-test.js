import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 20,
  iterations: 100,
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  // Make a GET request to the target URL
  http.get('https://test-api.k6.io');
  sleep(5);
}
