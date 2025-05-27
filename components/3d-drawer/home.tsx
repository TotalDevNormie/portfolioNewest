"use client"
import css from "./home.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import projects from "../../data/projects.json"

const personalProjects = projects.filter((project) => project.type === "Personal projects")
const schoolProjects = projects.filter((project) => project.type === "School projects")

const Home = () => {
  // Keeping these values as per the last request (280, 350)
  // If you wanted the lower axis, ensure you revert to the previous code version's rotateX and initial rotationX
  const rotateX = [280, 350] // Reverted to previous values as per your last provided code
  const rotateY = 360
  const rangeX = rotateX[1] - rotateX[0]

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [previousTouch, setPreviousTouch] = useState(null)
  const [rotationX, setRotationX] = useState(340) // Adjusted initial to be within default range
  const [rotationY, setRotationY] = useState(30)
  const heightRef = useRef(null)

  const [selectedId, setSelectedId] = useState(null)
  const [isFileOpened, setIsFileOpened] = useState(false)
  const [isFileClosing, setIsFileClosing] = useState(false)

  const [dragging, setDragging] = useState(false)
  const [fileHovered, setFileHovered] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const animationFrameId = useRef(null)
  const lastFrameTime = useRef(0)

  useEffect(() => {
    if (dragging) {
      setTimeoutId(
        setTimeout(() => {
          setDragging(false)
        }, 5000),
      )
    }
    return () => {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }, [dragging])

  useEffect(() => {
    if (fileHovered) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    } else {
      setTimeoutId(
        setTimeout(() => {
          setDragging(false)
        }, 5000),
      )
    }
  }, [fileHovered])

  useEffect(() => {
    const animate = (currentTime) => {
      if (!lastFrameTime.current) lastFrameTime.current = currentTime
      const deltaTime = currentTime - lastFrameTime.current
      lastFrameTime.current = currentTime

      if (!dragging && !isFileOpened && !fileHovered) {
        setRotationY((prev) => prev - 0.015 * deltaTime)

        // Adjust targetRotationX to be within the [280, 350] range, e.g., 340
        const targetRotationX = 340

        setRotationX((prev) => {
          let newRotationX = prev
          if (prev < targetRotationX) {
            newRotationX = prev + 0.003 * deltaTime
            if (newRotationX > targetRotationX) newRotationX = targetRotationX
          } else if (prev > targetRotationX) {
            newRotationX = prev - 0.003 * deltaTime
            if (newRotationX < targetRotationX) newRotationX = targetRotationX
          }
          return newRotationX
        })
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [dragging, isFileOpened, fileHovered])

  const mouseMove = (e) => {
    if (isMouseDown) {
      setDragging(true)
      const height = heightRef ? heightRef.current.clientHeight : window.innerHeight
      if (e.type === "touchmove") {
        const touch = e.touches[0]

        if (previousTouch) {
          e.movementX = touch.pageX - previousTouch.pageX
          e.movementY = touch.pageY - previousTouch.pageY
        }
        setPreviousTouch(touch)
      }

      if (!("movementX" in e) || !("movementY" in e)) return

      const movementX = e.movementX / innerWidth
      const movementY = e.movementY / height
      var possibleX = rotationX + movementY * -2.5 * rangeX // Reduced sensitivity for smoother control

      if (possibleX <= rotateX[0]) possibleX = rotateX[0]
      if (possibleX >= rotateX[1]) possibleX = rotateX[1]
      setRotationX(possibleX)
      setRotationY((prev) => prev + movementX * rotateY * 0.8) // Reduced sensitivity
    }
  }

  const onFileClick = (id) => {
    setSelectedId(id)
    setIsFileOpened(true)
  }

  // New function to handle file closing
  const closeFile = () => {
    setIsFileClosing(true)
    setTimeout(() => {
      setIsFileClosing(false)
      setIsFileOpened(false)
      setSelectedId(null)
    }, 300) // Reduced timeout for snappier feel
  }

  // Calculate gradient stop percentage based on rotationX
  const getGradientPercentage = () => {
    // Normalize rotationX within its range [rotateX[0], rotateX[1]] to a 0-1 scale
    const normalizedRotationX = (rotationX - rotateX[0]) / (rotateX[1] - rotateX[0])

    const minPercentage = 0
    const maxPercentage = 30
    const percentage = minPercentage + normalizedRotationX * (maxPercentage - minPercentage)

    return `${percentage}%`
  }

  return (
    <>
      <div
        className={`${css.drawerWrapper} ${css.popIn}`}
        onMouseMove={mouseMove}
        onTouchMove={mouseMove}
        onMouseDown={() => {
          setIsMouseDown(true)
          setDragging(true)
          lastFrameTime.current = 0
        }}
        onTouchStart={() => {
          setIsMouseDown(true)
          setDragging(true)
          lastFrameTime.current = 0
        }}
        onMouseUp={() => setIsMouseDown(false)}
        onTouchEnd={() => {
          setIsMouseDown(false)
          setPreviousTouch(null)
        }}
        onTouchCancel={() => {
          setIsMouseDown(false)
          setPreviousTouch(null)
        }}
        ref={heightRef}
      >
        <div
          className={css.drawerContainer}
          title="click on files to get more info!"
          style={{
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          }}
        >
          <DrawerBox
            text="School Projects"
            fileOnEnter={() => setFileHovered(true)}
            fileOnLeave={() => setFileHovered(false)}
            onFileClick={onFileClick}
            isFileOpened={isFileOpened}
            selectedId={selectedId}
            data={schoolProjects}
          />
          <DrawerBox
            text="Personal Projects"
            fileOnEnter={() => setFileHovered(true)}
            fileOnLeave={() => setFileHovered(false)}
            onFileClick={onFileClick}
            isFileOpened={isFileOpened}
            selectedId={selectedId}
            data={personalProjects}
          />
          <div className={`${css.drawerTop}`}>
            <div className={`${css.topTop} ${css.wall}`}></div>
            <div className={`${css.leftTop} ${css.wall}`}></div>
            <div className={`${css.rightTop} ${css.wall}`}></div>
            <div className={`${css.frontTop} ${css.wall}`}></div>
            <div className={`${css.backTop} ${css.wall}`}></div>
          </div>
          <div className={`${css.drawerWall} ${css.left}`}></div>
          <div className={`${css.drawerWall} ${css.right}`}></div>
          <div className={`${css.drawerWall} ${css.front}`}>
            <div className={`${css.frontLeft}`}></div>
            <div className={`${css.frontRight}`}></div>
            <div className={`${css.frontTop}`}></div>
            <div className={`${css.frontBottom}`}></div>
          </div>
          <div className={`${css.drawerWall} ${css.back}`}></div>
        </div>
      </div>
      {isFileOpened && (
        <div className={`${css.fileOpen} ${isFileClosing ? css.closing : ""}`}>
          {/* Clickable background to close */}
          <div className={css.background} onClick={closeFile}></div>

          <div className={`${css.fileContents} ${isFileClosing ? css.closing : ""}`}>
            {/* Header with title and close button */}
            <div className={css.fileContentsHeader}>
              <h2 className={css.projectTitle}>{projects[selectedId - 1].name}</h2>
              <button className={css.closeButton} onClick={closeFile} aria-label="Close project">
                ×
              </button>
            </div>

            {/* Scrollable content */}
            <div className={css.fileContentsBody}>
              <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>{projects[selectedId - 1].description}</p>

              <div>
                <h3 style={{ marginBottom: "0.75rem", color: "#374151", fontSize: "1.125rem", fontWeight: "600" }}>
                  Technologies Used
                </h3>
                <div className={css.projectMeta}>
                  {projects[selectedId - 1].technologies.map((tech, index) => (
                    <span key={index} className={css.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {projects[selectedId - 1].link && (
                <div style={{ margin: "1.5rem 0" }}>
                  <h3 style={{ marginBottom: "0.5rem", color: "#374151", fontSize: "1.125rem", fontWeight: "600" }}>
                    Project Link
                  </h3>
                  <a href={projects[selectedId - 1].link} target="_blank" rel="noreferrer" className={css.projectLink}>
                    View on GitHub →
                  </a>
                </div>
              )}

              <div>
                <h3 style={{ marginBottom: "1rem", color: "#374151", fontSize: "1.125rem", fontWeight: "600" }}>
                  Project Gallery
                </h3>
                <div className={css.projectImages}>
                  {projects[selectedId - 1].images.map((src, index) => (
                    <img
                      key={index}
                      src={src || "/placeholder.svg?height=400&width=600"}
                      alt={`${projects[selectedId - 1].name} screenshot ${index + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const DrawerBox = ({ text, fileOnEnter, fileOnLeave, data, onFileClick, isFileOpened, selectedId }) => {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)
  const toggle = (e) => {
    if (e.target.dataset.file) return
    if (opened) {
      setClosing(true)
      setOpened(false)
    } else {
      setClosing(false)
      setOpened(true)
    }
  }
  return (
    <div className={css.boxWrapper}>
      <div className={`${css.drawerBox} ${opened ? css.opened : ""} ${closing ? css.closed : ""}`} onClick={toggle}>
        <div className={`${css.wallBox} ${css.leftBox}`}></div>
        <div className={`${css.wallBox} ${css.rightBox}`}></div>
        <div className={`${css.wallBox} ${css.frontBox}`}>
          <div className={`${css.frontFront}`}>
            <div className={`${css.handleFront}`}></div>
            <div className={`${css.handleLeft}`}></div>
            <div className={`${css.handleRight}`} onClick={toggle}></div>
            <div className={`${css.handleTop}`} onClick={toggle}></div>
            <div className={`${css.sign}`}>
              <p>{text}</p>
            </div>
          </div>
          <div className={`${css.leftFront}`}></div>
          <div className={`${css.rightFront}`}></div>
          <div className={`${css.topFront}`}></div>
        </div>
        <div className={`${css.wallBox} ${css.backBox}`}></div>
        <div className={`${css.wallBox} ${css.bottomBox}`}>
          {data.map((project) => (
            <File
              key={project.id}
              fileHover={[fileOnEnter, fileOnLeave]}
              data={project}
              onFileClick={onFileClick}
              isFileOpened={isFileOpened}
              selectedId={selectedId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const File = ({ fileHover, data, onFileClick, isFileOpened, selectedId }) => {
  const [clicked, setClicked] = useState(null)
  const fileClick = () => {
    if (clicked) {
      setClicked(false)
      fileHover[1]()
    } else {
      setClicked(true)
      fileHover[0]()
    }
    onFileClick(data.id)
  }

  useEffect(() => {
    if (selectedId === data.id && !isFileOpened) {
      setClicked(false)
    }
  }, [isFileOpened, selectedId, data.id])

  // Add this new useEffect to handle the animation reset
  useEffect(() => {
    if (!isFileOpened && clicked === true) {
      // Small delay to ensure the file modal is fully closed before starting land animation
      const timer = setTimeout(() => {
        setClicked(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isFileOpened, clicked])

  return (
    <div
      className={`${css.folder}`}
      onMouseEnter={() => fileHover[0]()}
      onMouseLeave={() => fileHover[1]()}
      onClick={fileClick}
      data-file="true"
    >
      <div className={`${css.folderBack}`} data-file="true"></div>
      <div className={`${css.folderFront}`} data-file="true"></div>
      <div className={`${css.fileWrapper}`} data-file="true">
        <div
          className={`${css.file} ${clicked === true ? css.clicked : clicked === false ? css.notClicked : ""}`}
          data-file="true"
        >
          <p style={{ fontSize: "0.7em" }} data-file="true">
            {data.name}
          </p>
          <img data-file="true" src={data.images[0] || "/placeholder.svg"} alt={data.name} />
        </div>
      </div>
    </div>
  )
}

export default Home
