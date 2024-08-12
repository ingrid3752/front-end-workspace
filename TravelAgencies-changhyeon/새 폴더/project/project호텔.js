document
  .getElementById("reservation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const roomType = document.getElementById("room-type").value;

    // 간단한 데이터 유효성 검사
    if (new Date(checkin) >= new Date(checkout)) {
      alert("체크아웃 날짜는 체크인 날짜보다 이후여야 합니다.");
      return;
    }

    const reservation = {
      name,
      email,
      checkin,
      checkout,
      roomType,
    };

    // 예약 정보를 서버로 전송 (여기서는 콘솔에 출력)
    console.log("Reservation:", reservation);

    // 예약 확인 메시지 표시
    document.getElementById(
      "confirmation"
    ).textContent = `${name}님의 예약이 완료되었습니다. 예약 확인 이메일을 ${email}로 발송했습니다.`;
  });
