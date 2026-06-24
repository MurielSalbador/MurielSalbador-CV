import React, { useState, useRef } from "react"
import { Modal, IconButton, Box, Typography, Backdrop } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"

const Certificate = ({ ImgSertif, title, date }) => {
  const [open, setOpen] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRotation({ x: ((y / rect.height) - 0.5) * -15, y: ((x / rect.width) - 0.5) * 15 })
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setHovered(false)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ width: "100%" }}>
      {/* Contenedor de imagen con hover - Solo se muestra si hay imagen */}
      {ImgSertif && ImgSertif.trim() !== "" && (
        <Box
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${hovered ? "translateZ(6px)" : "translateZ(0)"}`,
            transition: hovered ? "transform 0.08s linear, box-shadow 0.3s ease" : "transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease",
            "&::after": hovered ? {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: 2,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
              zIndex: 5,
              pointerEvents: "none",
            } : {},
            "& .overlay": { opacity: 0, transition: "opacity 0.3s" },
            "& .hover-content": { transform: "translate(-50%, -60%)", opacity: 0, transition: "all 0.4s ease" },
            ...(hovered && {
              boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
              "& .overlay": { opacity: 1 },
              "& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
              "& .certificate-image": { filter: "contrast(1.05) brightness(1) saturate(1.1)" },
            }),
          }}
        >
          {/* Imagen con filtro inicial */}
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                zIndex: 1,
              },
            }}
          >
            <img
              className="certificate-image"
              src={ImgSertif}
              alt={title || "Certificate"}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
                transition: "filter 0.3s ease",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            />
          </Box>

          {/* Overlay hover */}
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0,
              transition: "all 0.3s ease",
              cursor: "pointer",
              zIndex: 2,
            }}
            onClick={handleOpen}
          >
            <Box
              className="hover-content"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
                opacity: 0,
                transition: "all 0.4s ease",
                textAlign: "center",
                width: "100%",
                color: "white",
              }}
            >
              <FullscreenIcon
                sx={{ fontSize: 40, mb: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                Ver Certificado Completo
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Mostrar título y fecha debajo de la imagen */}
      {(title || date) && (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          {title && (
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          )}
          {date && (
            <Typography variant="caption" sx={{ color: "gray" }}>
              {date}
            </Typography>
          )}
        </Box>
      )}

      {/* Modal con la imagen ampliada - Solo si hay imagen */}
      {ImgSertif && ImgSertif.trim() !== "" && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
            sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(5px)" },
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "auto",
              maxWidth: "90vw",
              maxHeight: "90vh",
              m: 0,
              p: 0,
              outline: "none",
              "&:focus": { outline: "none" },
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
                bgcolor: "rgba(0,0,0,0.6)",
                zIndex: 1,
                padding: 1,
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)", transform: "scale(1.1)" },
              }}
              size="large"
            >
              <CloseIcon sx={{ fontSize: 24 }} />
            </IconButton>

            <img
              src={ImgSertif}
              alt={title || "Certificate Full View"}
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "90vh",
                margin: "0 auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Modal>
      )}
    </Box>
  )
}

export default Certificate
