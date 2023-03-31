import { useEffect, useState } from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Reservation = () => {
  const [reservation, setReservation] = useState(null);
  const localId = window.localStorage.getItem("reservationId");

  useEffect(() => {
    fetch(`/api/get-reservation/${localId}`)
      .then((res) => res.json())
      .then((data) => {
        setReservation(data.data);
      });
  }, []);

  if (!reservation) {
    return <h1>Loading.....</h1>;
  }

  return (
    <>
      <Wrapper>
        <div>
          <h2>Your flight is confirmed</h2>
          <p>Reservation id: {reservation._id}</p>
          <p>First Name: {reservation.firstName}</p>
          <p>Last Name: {reservation.lastName}</p>
          <p>Email: {reservation.email}</p>
          <p>Flight: {reservation.flight}</p>
          <p>Seat: {reservation.seat}</p>
        </div>
        <img src={tombstone} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  h2 {
    color: red;
    padding: 5px;
    border-bottom: 1px solid red;
  }
  div {
    border: 2px solid red;
    text-align: center;
    padding: 20px;
    margin: 10px;
  }
  p {
    margin: 10px;
    padding: 10px;
    font-size: 20px;
  }
  img {
    width: 100px;
  }
`;

const Loading = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Reservation;
