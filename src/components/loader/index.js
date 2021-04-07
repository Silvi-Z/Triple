import React, { useRef } from "react"
import logo from "../../images/loader/logo.svg"
import loading from "../../images/loader/loading.svg"

const Loader = () => {
  let i = 0
  let txt = "beyond"
  let speed = 200
  let second = "the numbers"
  const textRef = useRef()

  // function typeWriter() {
  //   if (i < txt.length) {
  //     document.getElementById("text").innerHTML += txt.charAt(i)
  //     i++
  //     setTimeout(typeWriter, speed)
  //   } else {
  //     document.querySelector(".loadImg").classList.add("loadImgWidth")
  //     console.log(document.querySelector(".loadImg img").offsetWidth)
  //
  //     setTimeout(all, 2500)
  //   }
  // }
  //
  // typeWriter()
  //
  // function all() {
  //   if (i < second.length) {
  //     document.getElementById("second").innerHTML += second.charAt(i)
  //     i++
  //     setTimeout(typeWriter, speed)
  //   }
  // }

  return (
    <section className={'loader'}>
      <div id="logo">
        <img src={logo} alt="" />
      </div>
      <div className="loading">
        <div id="text" />
        <div className="loadImg">
          <img src={loading} alt="" />
        </div>
        <div id="second" />
      </div>
    </section>
  )
}

export default Loader
