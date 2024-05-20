import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { getPostingStatus } from "../Data/PostingStatus";

const DisplayPersonData = () => {
  const [personName, setPersonName] = useState("");
  const [personSerial, setPersonSerial] = useState("");
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postingStatus = await getPostingStatus();
        const name = `${postingStatus.person.firstName} ${postingStatus.person.lastName}`;
        const serial = CR.Script.personSerial;
        const accounts = postingStatus.account.map((account) => {
          return {
            accountNumber: account.accountNumber,
            shares: account.share.map((share) => ({
              id: share.id,
              description: share.description,
            })),
            loans: account.loan?.map((loan) => ({
              id: loan.id,
              description: loan.description,
            })) || [],
          };
        });

        setPersonName(name);
        setPersonSerial(serial);
        setAccountData(accounts);
      } catch (error) {
        console.error("Error fetching posting status:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Member Name: {personName}</h1>
          <h3>Person Serial: {personSerial}</h3>
        </Col>
      </Row>
      <Row>
        {accountData.map((account, index) => (
          <Col key={index}>
            <Card className="m-3" bg="light">
              <Card.Body>
                <Card.Title>Account #{account.accountNumber}</Card.Title>
                {account.shares.length > 0 && (
                  <Card.Text><strong>Shares</strong></Card.Text>
                )}
                <ListGroup variant="flush">
                  {account.shares.map((share, idx) => (
                    <ListGroup.Item key={idx}>
                      S {share.id} - {share.description}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {account.loans.length > 0 && (
                  <Card.Text className="mt-3"><strong>Loans</strong></Card.Text>
                )}
                <ListGroup variant="flush">
                  {account.loans.map((loan, idx) => (
                    <ListGroup.Item key={idx}>
                      L {loan.id} - {loan.description}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DisplayPersonData;
