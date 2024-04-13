import React, { useEffect, useState } from "react";
import axios from "axios";
import "ui-neumorphism/dist/index.css";
import {
  Card,
  CardContent,
  H5,
  Body2,
  CardHeader,
  ProgressCircular,
} from "ui-neumorphism";
import { CardFooter, Col, Container, Row } from "react-bootstrap";

const BASE_URL = "https://api.quran.com/api/v4";

const Layout = () => {
  const [quranData, setQuranData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reciterId, setReciterId] = useState(1);
  const [reciters, setReceiters] = useState([]);

  useEffect(() => {
    const fetchRecitor = async () => {
      const response = await axios.get(`${BASE_URL}/resources/recitations`);
      setReceiters(response?.data?.recitations);
    };

    const fetchData = async () => {
      const response = await axios.get(
        `${BASE_URL}/chapter_recitations/${reciterId}`
      );
      setQuranData(response?.data?.audio_files);
      console.log("🚀 ~ fetchData ~ response?.data:", response?.data);
      setLoading(false);
    };
    fetchRecitor();
    fetchData();
  }, [reciterId]);

  console.log("🚀 ~ Layout ~ reciters:", reciters);

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        {/* <Container> */}
        <Card
          className="d-flex align-items-center justify-content-center"
          style={{ borderRadius: 0, paddingTop: 8 }}
        >
          <Container style={{ display: "flex", alignItems: "center" }}>
            <Col className="col-4 d-flex align-items-center">
              <h1>AL-Quran</h1>
            </Col>
            <Col className="col-4  d-flex justify-content-evenly">
              {/* <a href="#" style={{ color: "black", textDecoration: "none" }}>
                <h5>Home</h5>
              </a>
              <a href="#" style={{ color: "black", textDecoration: "none" }}>
                <h5>Page</h5>
              </a> */}

              <a
                href=" https://raz-portfolio.netlify.app"
                style={{ color: "gray", textDecoration: "none" }}
                target="blank"
              >
                <h5>About me</h5>
              </a>
            </Col>
            <Col className="col-4  d-flex align-items-center justify-content-end">
              <h2>جامعہ بنوری ٹاؤن کراچی</h2>
            </Col>
          </Container>
        </Card>
        {/* </Container> */}
      </div>
      {/* Show Recitors */}
      <div style={{ paddingTop: "100px" }}>
        <Container>
          <div style={{ marginTop: 10, paddingBottom: 10 }}>
            <div class="mb-3">
              <H5>Select Recitor</H5>
              <select
                class="form-select form-select-lg"
                name=""
                id=""
                onChange={(e) => setReciterId(e.target.value)}
              >
                {reciters.map((item) => (
                  <option value={item.id} selected key={item.id}>
                    {item.reciter_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Container>
        <Container>
          <Row className="d-flex align-items-center justify-contents-center g-4 mt-5 ">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ProgressCircular
                  indeterminate
                  size={64}
                  width={8}
                  color="var(--primary)"
                />
                <H5>Please wait...</H5>
              </div>
            ) : (
              quranData.map((item, index) => (
                <Col
                  className="col-12 col-md-4 col-lg-4"
                  key={item?.chapter_id}
                >
                  <Card
                    style={{
                      borderWidth: 1,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <CardHeader>
                      <H5>Surah #{index + 1}</H5>
                    </CardHeader>
                    <CardContent style={{ marginTop: 10 }}>
                      <Body2>
                        <div
                          style={{
                            borderWidth: 1,
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          <audio
                            src={item?.audio_url}
                            controls
                            style={{ width: "80%", height: 40 }}
                          />
                        </div>
                      </Body2>
                    </CardContent>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
        <Card
          style={{
            backgroundColor: "#e4ebf5",
            color: "black",
            padding: "20px",
            textAlign: "center",
            marginTop: "20px",
            alignItems: "center",

            left: 0,
            bottom: 0,
            width: "100%",
          }}
        >
          <p>
            @ 2024 WebsiteName: <b> "Al-Quran"</b>
          </p>
          <h3>Designed by "Raza ullah"❤️</h3>
        </Card>
      </div>
    </>
  );
};

export default Layout;
