# **공간109**

![LogoTransBlack](https://user-images.githubusercontent.com/97648026/194471136-dd995b68-0364-459d-ac72-df6edf16504d.png)

# 리드미작성

# 공간109

---

## 🍀서비스 소개

---

- 게시판 형태의 정적인 NFT판매 플랫폼은 지쳤다! 이젠 3D다
- 오프라인 전시회를 방문한듯한 현실같은 디자인
- 내가 직접 움직이며 다양한 NFT전시물들을 관람할수있다
- 이 모든걸 즐길 수 있는 3D전시회 플랫폼으로 어서오셔~

## 🍀팀원소개

---

- FE
    - 박재현:  3D 모델링 / 3D 랜더링 / 3D 조회 갤러리
    - 이원우:  3D 모델링 / 3D 랜더링 / 3D 갤러리 편집
    - 이윤경: web3 / 2D 페이지
    - 황상윤: web3 / 2D 페이지 / Ipfs
- BE
    - 임웅균: node express, 컨트랙트
    - 주혜령: node express, 컨트랙트

## 🍀기술스텍

---

- FE
    - React 18.2.0
    - React-three/fiber 8.7.3
    - React-three/drei 9.29.1
    - TypeScript 4.8.3
    - Three.js 0.1444.0
    - Web3.js 1.7.5
    - Ipfs 0.64.0
- BE
    - Node 16.15.0
    - Node Express 4.16.1
    - Solidity 0.8.10
    - Truffle 5.5.28
    - Ganache 7.4.0

## 🍀아키텍처

---

![https://media.discordapp.net/attachments/1011164237369966598/1028593506316464148/ERD.png?width=840&height=545](https://media.discordapp.net/attachments/1011164237369966598/1028593506316464148/ERD.png?width=840&height=545)

![https://user-images.githubusercontent.com/90893428/194745604-afbccc7f-ef54-4527-89ee-07b65c718bea.png](https://user-images.githubusercontent.com/90893428/194745604-afbccc7f-ef54-4527-89ee-07b65c718bea.png)

## 🍀기능소개

---

### 📄메인페이지

- 홈페이지 소개
- 갤러리 페이지로 이동가능
    
    ![https://user-images.githubusercontent.com/97648026/194745872-9705fe8e-13c5-453b-81a9-1fd6b169e149.gif](https://user-images.githubusercontent.com/97648026/194745872-9705fe8e-13c5-453b-81a9-1fd6b169e149.gif)
    

### 📄로그인페이지

- 메타마스크를 이용하여 로그인
    
    ![https://user-images.githubusercontent.com/97648026/194746606-79632524-89d9-410e-aabb-38436312f3b9.gif](https://user-images.githubusercontent.com/97648026/194746606-79632524-89d9-410e-aabb-38436312f3b9.gif)
    
- 처음 방문하는 유저는 본인의 닉네임을 등록하여 회원가입
    
    ![https://user-images.githubusercontent.com/97648026/194746603-0dcbb0a0-7739-49db-97ca-78588152a47b.gif](https://user-images.githubusercontent.com/97648026/194746603-0dcbb0a0-7739-49db-97ca-78588152a47b.gif)
    

### 📄월간테마 페이지

- 월간 테마에 맞는 갤러리들을 랜덤으로 추천
    
    ![https://user-images.githubusercontent.com/97648026/194745329-d60fccbe-e37f-4295-b6c1-b3a673400d61.gif](https://user-images.githubusercontent.com/97648026/194745329-d60fccbe-e37f-4295-b6c1-b3a673400d61.gif)
    

### 📄갤러리 페이지

- 다른 유저들의 갤러리를 확인 가능
- 테마 필터 버튼과 검색 바를 이용하여 필터링
- 갤러리 썸네일 버튼을 클릭하여 갤러리의 상세 정보 확인
- 입장하기 버튼 클릭 시 3D 공간으로 입장
    
    ![https://media.discordapp.net/attachments/1011164237369966598/1028590753603137596/a403b226073c1385.gif?width=840&height=414](https://media.discordapp.net/attachments/1011164237369966598/1028590753603137596/a403b226073c1385.gif?width=840&height=414)
    

### 📄내 NFT 페이지

- 내 NFT  목록
    - 본인이 가지고 있는 NFT 확인
    - 판매 중인 NFT 보기를 클릭하여 판매 중인 NFT만 필터링 가능
    - 판매된 NFT가 존재할 경우 내 NFT 페이지에서 판매 알림 확인
        
        ![https://user-images.githubusercontent.com/97648026/194745331-d87c8967-7199-4ae6-b10b-a6a90058be4e.gif](https://user-images.githubusercontent.com/97648026/194745331-d87c8967-7199-4ae6-b10b-a6a90058be4e.gif)
        
        ![https://media.discordapp.net/attachments/1011164237369966598/1028590427022041109/2f04b4c4b2f517b3.gif?width=840&height=414](https://media.discordapp.net/attachments/1011164237369966598/1028590427022041109/2f04b4c4b2f517b3.gif?width=840&height=414)
        
- NFT 디테일 모달
    - NFT를 클릭하여 상세 정보 확인 가능
    - 본인의 NFT를 SSF 토큰으로 판매 신청 가능
        
        ![https://media.discordapp.net/attachments/1011164237369966598/1028600355161899089/26c517184d8c714b.gif?width=939&height=459](https://media.discordapp.net/attachments/1011164237369966598/1028600355161899089/26c517184d8c714b.gif?width=939&height=459)
        
- NFT 생성하기
    - 본인의 디지털 작품을 NFT로 민팅 가능
        
        ![https://user-images.githubusercontent.com/97648026/194745328-38109454-f519-48ec-9b07-948f09452d0b.gif](https://user-images.githubusercontent.com/97648026/194745328-38109454-f519-48ec-9b07-948f09452d0b.gif)
        

### 📄프로필 페이지

- 본인의 갤러리 정보를 수정가능 (공개여부, 갤러리테마, 제목, 설명, 썸네일)
- 썸네일 이미지 수정 시 이미지 크롭 가능
- `갤러리 비우기` 버튼으로 3D 갤러리 내 걸린 모든 액자 초기화
- `입장하기` 버튼 클릭 시 본인의 3D 갤러리로 이동
- `갤러리 편집하기` 버튼 클릭 시 본인의 3D 갤러리 편집 페이지로 이동
    
    ![https://media.discordapp.net/attachments/1011164237369966598/1028592683410784276/429c280a45ed1236.gif?width=840&height=411](https://media.discordapp.net/attachments/1011164237369966598/1028592683410784276/429c280a45ed1236.gif?width=840&height=411)
    

### 📄3D 갤러리 편집페이지

- wasd로 상하좌우 이동, e로 시점 고정, 마우스로 액자 선택, space bar로 점프
- 판매를 위한 NFT와 단순 소유중인 NFT 모두 전시 가능
- 액자 크기, 위치, 회전 조정
    - 크기
        
        ![https://user-images.githubusercontent.com/97648026/194747502-7caf1a0d-b7e8-45a4-8366-8b99648c86e9.gif](https://user-images.githubusercontent.com/97648026/194747502-7caf1a0d-b7e8-45a4-8366-8b99648c86e9.gif)
        
    - 위치
        
        ![https://user-images.githubusercontent.com/97648026/194747501-945b3502-9065-463d-a91d-a7dcba0e1362.gif](https://user-images.githubusercontent.com/97648026/194747501-945b3502-9065-463d-a91d-a7dcba0e1362.gif)
        
    - 회전
        
        ![https://user-images.githubusercontent.com/97648026/194747504-c3d53d81-8fe5-4f6e-8c02-09386648a87d.gif](https://user-images.githubusercontent.com/97648026/194747504-c3d53d81-8fe5-4f6e-8c02-09386648a87d.gif)
        
- 액자에 민팅한 NFT 이미지, PNG, GIF 전시
- NFT 작품 추가, 삭제, 수정 / 기존 그림이 이미 전시 되어있거나 중복 전시인 경우, 선택 가능
    
    ![https://media.discordapp.net/attachments/1011164237369966598/1028595135996510208/2f3f8857bfaa9eba.gif?width=939&height=459](https://media.discordapp.net/attachments/1011164237369966598/1028595135996510208/2f3f8857bfaa9eba.gif?width=939&height=459)
    
- 방명록 작성 / 조회 / 초기화 기능
    
    ![https://media.discordapp.net/attachments/1011164237369966598/1028595092363169792/f13035a80feda8ea.gif?width=939&height=459](https://media.discordapp.net/attachments/1011164237369966598/1028595092363169792/f13035a80feda8ea.gif?width=939&height=459)
    
- wasd로 상하좌우 이동, e로 시점 고정, 마우스로 액자 선택, space bar로 점프

### 📄3D 갤러리 페이지

- 전시한 액자 관람 / 전시하지 않은 액자는 보이지 않음
- 판매 중인 NFT 작품 구매 기능
    
    ![https://media.discordapp.net/attachments/1011164237369966598/1028590113615265802/ed4db0cf7ae06126.gif?width=840&height=414](https://media.discordapp.net/attachments/1011164237369966598/1028590113615265802/ed4db0cf7ae06126.gif?width=840&height=414)
    
- 방명록 조회 / 작성
    
    ![https://media.discordapp.net/attachments/1011164237369966598/1028593602668019772/8b8bb191909e7b34.gif?width=939&height=459](https://media.discordapp.net/attachments/1011164237369966598/1028593602668019772/8b8bb191909e7b34.gif?width=939&height=459)
    

## 🍀회고

자세한 회고는 [KPT 회고](https://www.notion.so/KPT-7461e6d978af4e3384ac0e0dd5ef8088) 

---

- **박재현**
    - 3D 파트를 진행하면서, 제가 사용했던 3DMAX 기술이 도움이 될 줄은 몰랐습니다. 이런 부분에 기여 할 수 있었다는 게 다행이었습니다.
    한편으로는, 코드적인 부분에서 다른 파트보다 진행이 많이 느려 팀원들에게 미안하기도 했습니다. 카메라 전환 구현 시도 하였지만 실패한 부분이 많이 아쉬웠습니다.
- **임웅균**
    - 처음 해보는 기술들에 대한 막연한 두려움들이 있었지만, 공부하다보니 내가 생각한것만큼 무지막지한 친구들은 아니라는걸 느꼈다. 다만 그 두려움때문에 처음부터 체계적으로 서비스구현을 하지 못해 마지막에 고생했다는 것이 많이 아쉬웠다. 하지만 어려운 기술들을 배우고 또 실사용하면서 노력하면 못만들건 없다는 자신감을 얻었다. 마지막으로 항상 최선을 다하고 열심이었던 팀원들과의 프로젝트가 가장 좋은경험이었던것같다. 진짜 밥한번먹읍시다!!
- **이원우**
    - Three.js를 공부하면서 모든 파트가 도전이었던 것 같습니다. 레퍼런스를 찾기 힘든 물리 엔진을 다각형에 적용하는 방법부터, 팝업 Modal을 띄우는 것 까지 어떤 방식으로 구성해야 하는지 배웠고, 3D는 생각보다 자원을 많이 소모하므로 웹 렌더링 성능 최적화를 위해서 lighthouse나 bundle analyzer을 사용해 최대한 효율을 높히기 위해서 노력했습니다. 다들 노력해서 NFT 메타버스 서비스를 만들어봤다는 것에 상당히 자랑스러웠습니다!
- **이윤경**
    - 처음으로 블록체인을 접해보았기 때문에, 블록체인과 스마트 컨트랙트에 관하여 잘 이해하지 못했을 때 기획했던 부분들이 실제로 이후에는 불가능했다는 것을 깨닫고 고쳐나가는 시간이 많이 생겼습니다. 그러한 시간들이 아쉽기도 하지만, 덕분에 프로젝트를 시작할 경우 고려해야 할 부분들에 대하여 깨달은 것도 많은 것 같습니다. 마지막까지 같이 노력하고 프로젝트를 진행한 팀원들께 감사합니다!! 수고하셨습니다!
- **주혜령**
    - 서버를 구축해보며 CI/CD 경험을 하고 생소했던 블록체인, NFT, 스마트 컨트랙트에 대해 공부하고 활용해 볼 수 있어서 좋았습니다. 또한, 새로운 기술을 활용하는데에 있어 부담감이 있었는데 직접 부딪혀 보니 공부하면 할 수록 이해할 수 있는 부분들이 많아져 생소한 기술을 사용하는데에도 자신감을 얻을 수 있었습니다.
- **황상윤**
    - 새로운 기술들에 도전해 볼 수 있는 기회였어서 성장하는데 도움이 많이 됐고, 생각보다는 할만해서 다음에 새로운 것을 도전할 때도 자신감 있게 할 수 있을 것 같다. 그리고 분기 처리와 리엑트 라우터에 대한 이해를 높일 수 있는 기회가 되어서 도움이 많이 됐다.
