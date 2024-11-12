var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open(
  "GET",
  "https://developer-lostark.game.onstove.com/armories/characters/coolguy/profiles",
  true
);
xmlHttpRequest.setRequestHeader("accept", "application/json");
xmlHttpRequest.setRequestHeader(
  "authorization",
  "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMTU1OTgifQ.Ai7vAQlZV9zjcMrdgt80XrgrcHVf9PxSHZx3u7txMOlD06NeFo5MgnPCfEw_mfeUzyZB2Dv86Mo_5YKP_bgwD_By2Z7veJ2WgpPC8dKYjZ_YegeCdU1BM4mDDfp2OtuSsvgcshMz2wabsd7uDbW76O5TYY1U7JLNytTlMB7YgWW4TzeewFH0VlY-G-qVd6SodAAAdLU5U_jhnBWeiALronSA5g0HFdPP_iQ8DWs7LbuGHgibpWjzkioPCYOjazK9zWkvv2-qhHYuJKenTNC1r1Ahzy0Yi2CVpBEc_qJ1VNW-oYaV8V3NLeVr-adIUk4h_5f9eMQpoc3IEkUR0C8Zzw"
);
xmlHttpRequest.onreadystatechange = () => {
  if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
    // 응답 데이터 처리
    var response = JSON.parse(xmlHttpRequest.responseText);

    // HTML 요소에 응답 데이터 추가
    var output = document.getElementById("output");
    output.innerHTML = `<pre>${JSON.stringify(response, null, 2)}</pre>`;
  }
};
xmlHttpRequest.send();
