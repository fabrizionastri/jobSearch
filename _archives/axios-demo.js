import axios from 'axios'

const url = 'http://localhost:3000/jobs'

const fetchJobs1 = () => {
  axios.get(url).then((response) => {
    console.log('fetchJobs1:', response.data[0]);
  }
  ).catch((error) => {
    console.log(error);
  }
  );
}

const fetchJobs2 = async () => {
  try {
    const response = await axios.get(url)
    console.log('fetchJobs2:', response.data[0]);
  } catch (error) {
    console.log(error);
  }
}

// async-await is just syntactic sugar for promises
const fetchJobs3 = async () => {
  const response = await axios.get(url)
  console.log('fetchJobs3:', response.data[0]);
}


fetchJobs1()
fetchJobs2()
fetchJobs3()
