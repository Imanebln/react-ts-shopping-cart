import { fontSize } from "@mui/system";
import ParticlesBg from "particles-bg";
import React, { lazy, Suspense } from "react";
import { Button, Container } from "react-bootstrap";
import { ProductCarousel } from "../components/ProductCarousel";
const Store = lazy(() => import("./Store"));

export function Home() {
  let id = Math.round(Math.random() * 10 + 1);
  console.log(id);

  return (
    <>
      <ParticlesBg type="circle" bg={true} />
      <Container className="d-flex justify-content-center align-items-center flex-direction-column">
        <h1
          style={{
            marginTop: "200px",
            fontSize: "60px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
            color: "black",
            opacity: "0.6",
          }}
        >
          Welcome to Gym Room Supplier
        </h1>
        {/* <img className="w-100" src="images/bg3.jpg" alt="" /> */}
      </Container>
    </>
  );
}
