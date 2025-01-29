# OIDC Test Client

## Keycloak 서버 설정

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
```

### Keycloak 관리 콘솔 접속
- http://localhost:8080 접속
- Administration Console 클릭
- Username: admin, Password: admin

### Realm 생성
- Create Realm
- Realm name: test-realm

### Client 생성
- Client Type: OpenID Connect
- Client ID: test-client
- Name: Test Client
- Client authentication: On
- Authorization: On
- Authentication flow:
    - Standard flow: on (OpenID Connect 표준 인증 흐름)
    - Implicit flow: off
    - Direct access grants: on
    - Service accounts roles: on (option)
- Valid redirect URIs:
    - http://localhost:8000/callback
    - http://localhost:8000/
- Web origins: http://localhost:8000
- Capability config
    - client authentication: on
    - OAuth 2.0 Device Authorization Grant: off
    - OIDC CIBA Grant: off

Client Credentials 확인
- Client > test-client > Credentials > Client Secret 값 메모

### 테스트 사용자 생성
User > Add User
- Username: testuser
- Email: testuser@example.com
- First Name: Test
- Last Name: User
- Create

테스트 사용자 비밀번호 설정
- Credentials
- Set password
- Temporary: off

## 테스트 클라이언트 애플리케이션
### env 작성

```
PORT=8000
ISSUER_BASE_URL=http://localhost:8080/realms/test-realm
CLIENT_ID=test-client
CLIENT_SECRET=<your_client_secret>
BASE_URL=http://localhost:8000
SECRET=some-long-random-string
```

```bash
npm i
node app.js
```

## 추가 학습
- Keycloak 설정 살펴보기
    - Role 생성 및 할당
    - Client Scope 설정
    - Protocol Mapper 설정
    - Authentication Flow 설정
- 토큰 관련 설정
    - 토큰 만료 시간 설정
    - Refresh 토큰 사용
    - 토큰 서명 알고리즘 설정

### 테스트
- 다양한 Scope 설정 및 테스트
- 토큰 갱신 프로세스 구현
- 사용자 속성 추가 및 토큰에 포함
- Role 기반 접근 제어 구현
- 다중 클라이언트 설정 및 테스트
