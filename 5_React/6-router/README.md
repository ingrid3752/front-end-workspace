# 라우팅

- 경로를 의미하는 Route와 진행을 뜻하는 ing가 합쳐진 단어
- 경로를 지정하는 과정

## 페이지 라우팅

- 요청에 따라 적절한 페이지를 반환하는 과정
- 구현은 웹 페이지를 어디서 만드느냐에 따라 서버 사이드 렌더링과 클라이언트 사이드 렌더링 두 가지로 구분한다.
- 리액트는 브라우저에서 페이지를 만드는 '클라이언트 사이드 렌더링'

### 서버 사이드 렌더링 (JSP)

1. 웹 브라우저에서 URL로 서비스를 요청한다.
2. 웹 서버는 요청 URL에서 경로를 확인하고 페이지를 생성해 반환한다.
3. 웹 브라우저는 웹 서버에서 반환된 페이지를 보여준다. (페이지가 아예 교체되기 때문에 브라우저가 깜빡이면서 새로고침이 발생한다.)

- 이 방식은 웹 브라우저에 표시할 페이지를 웹 서버에서 만들어 전달한다.
- 검색 엔진을 최적화하고, 처음 접속할 때 속도가 빠르다.
- 수많은 요청이 동시에 이루어질 때 서버가 부하가 걸릴 위험이 높다.
- 페이지를 이동할 때마다 브라우저는 서버가 제공하는 페이지를 기다려야 하기 때문에 속도가 느려진다.

### 클라이언트 사이드 렌더링 (React)

1. 웹 브라우저에서 URL로 서비스를 요청한다.
2. 웹 서버는 요청 URL 경로 따지지 않고 페이지 전체 틀 역할을 하는 index페이지와 자바스크립트 애플리케이션을 함께 반환한다.
3. 웹 브라우저는 index 페이지를 보여주고, 자바스크립트 애플리케이션을 실행한다. 그리고 경로에 맞는 애니메이션을 보여준다.

- 사용자가 보는 페이지를 웹 서버가 아닌 브라우저가 완성한다.
- 처음 접속할 때는 서버 사이드 렌더링 보다 속도가 느리지만, 페이지를 이동할 때는 브라우저에서 페이지를 직접 교체하므로 속도가 빠르다.
