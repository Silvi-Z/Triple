import triple from "../api/triple"
const json = () => {
  triple.get('/api/news')
    .then(res =>{
      return res
    })
}

export default json