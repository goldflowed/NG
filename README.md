# SSAFY 부울경 2반 특화프로젝트 E206
### NG(NFT Guarantee)
### 팀이름 뭐하지 "흫"
1. 프로젝트 설명
```
통신 운송의 발달로 명품 시장이 확대되고 명품 중고 거래가 활성화 됨으로써 회색시장 문제나 제품의 진위여부가 문제가 되고 있습니다. 이에 저희는 대체불가능한 인증서를 블록체인으로 제공하여 기업/고객, 고객/고객간의 신뢰성을 향상시키기 위해 이 프로젝트를 기획하게 되었습니다.
```

2. 기술스택 및 라이브러리

| name | version | description |
| ---- | ------- | ----------- |
| JAVA | 1.8 | Back-End |
| SpringBoot | 2.4.3 | Back-End |
| Gradle | 7.5+ | Build Tool |
| MySQL | 8.0CE | Database |
| JavaScript |  | Front-End |
| ReactJS || Front-End |
| WEB 3.0 | 1.8.0 | Front-End |
| Ubuntu | 20.04.5 | Server |
| Docker | 20.10.18 | Server |
| IPFS |  | Storage |
| Truffle | 5.5.19+ | Blockchain |
| Solidity | 0.8.0+ | Blockchain |


3. 디렉토리 구조
    * 백엔드
        ```
        └── main
            ├── generated
            ├── java
            │   └── com
            │       └── ssafy
            |           └── ng
            │               ├── NGApplication.java
            │               ├── api  /* REST API 요청관련 컨트롤러, 서비스, 요청/응답 모델 정의*/
            │               │   ├── controller
            │               │   │   ├── AuthController.java
            │               │   │   └── UserController.java
            │               │   ├── request
            |               |   |   └── company
            │               │   │       ├── CompanyPermitReq.java
            │               │   │       └── CompanyPostReq.java
            |               |   |   └── product
            │               │   │       └── ProductPostReq.java
            │               │   ├── response
            │               │   │   ├── CompanyGetRes.java       
            │               │   │   └── ProductGetRes.java
            │               │   └── service
            │               │       ├── CompanyService.java
            │               │       ├── CompanyServiceImpl.java
            │               │       ├── IPFSService.java
            │               │       ├── IPFSServiceImpl.java
            │               │       ├── ProductService.java
            │               │       └── ProductServiceImpl.java
            │               ├── common /* 공용 유틸, 응답 모델, 인증, 예외처리 관련 정의*/
            │               │   ├── customObject
            │               │   │   └── CompanyList.java
            │               │   ├── exception
            │               │   │   └── handler
            │               │   │       └── NotFoundHandler.java
            │               ├── config /* WebMvc 및 JPA, Security, Swagger 등의 추가 플러그인 설정 정의*/
            │               │   ├── IPFSConfig.java
            │               │   ├── SwaggerConfig.java
            │               │   └── WebMvcConfig.java
            │               └── db /* 디비에 저장될 모델 정의 및 쿼리 구현 */
            │                   ├── entity
            │                   │   ├── Company.java
            │                   │   └── Product.java
            │                   └── repository
            │                       ├── CompanyRepository.java
            │                       └── ProductRepository.java
            └── resources
                └── application.properties /* 웹 리소스(서버 host/port, DB host/port), AWS S3 관련 설정 정의 */
        ```

    * 프론트엔드
        ```
        .
        ├─ package-lock.json
        ├─ package.json
        ├─ public
        │  ├─ favicon.ico
        │  ├─ index.html
        │  ├─ logo192.png
        │  ├─ logo512.png
        │  ├─ manifest.json
        │  └─ robots.txt
        └─ src
           ├─ app
           |  ├─ App.css
           |  ├─ App.js
           |  └─ store.js
           ├─ common
           │  ├─ api
           │  │  ├─ http-common.js
           │  │  └─ ipfs.js
           │  ├─ companyroute
           │  │  ├─ CompanyRoute.js
           │  │  └─ IsCompany.js
           │  ├─ footer
           │  │  ├─ Footer.css
           │  │  └─ Footer.js
           │  ├─ navbar
           │  │  ├─ NavBar.css
           │  │  └─ NavBar.js
           │  ├─ web3
           │  │  ├─ abi
           |  |  |  └─ NG.json
           |  |  └─ web3Config.js
           ├─ feature
           │  ├─ admin
           │  |  ├─ approve
           |  |  |  ├─ Approve.js
           |  |  |  ├─ search.js
           |  |  |  ├─ table.js
           |  |  |  └─ tableCss.css
           |  |  ├─ base
           |  |  |  └─ Base.js
           |  |  ├─ deny
           |  |  |  ├─ Deny.js
           |  |  |  ├─ search.js
           |  |  |  ├─ table.js
           |  |  |  └─ tableCss.css
           |  |  ├─ main
           |  |  |  ├─ AdminMain.js
           |  |  |  ├─ search.js
           |  |  |  ├─ table.js
           |  |  |  └─ tableCss.css
           │  |  └─ sidebar
           |  |     ├─ SideBar.css
           |  |     └─ SideBar.js
           |  ├─ company
           |  |  ├─ base
           |  |  |  └─ Base.js
           |  |  ├─ detail
           |  |  |  ├─ detail.css
           |  |  |  ├─ detail.js
           |  |  |  ├─ search.js
           |  |  |  ├─ table.js
           |  |  |  └─ tableCss.css
           |  |  ├─ main
           |  |  |  ├─ page.css
           |  |  |  └─ page.js
           |  |  ├─ product
           |  |  |  ├─ modal.css
           |  |  |  ├─ modal.js
           |  |  |  ├─ modal2.css
           |  |  |  ├─ modal2.js
           |  |  |  ├─ product.css
           |  |  |  └─ product.js        
           |  |  ├─ products
           |  |  |  ├─ products.js
           |  |  |  ├─ search.css
           |  |  |  ├─ search.js
           |  |  |  ├─ table.js
           |  |  |  └─ tableCss.css
           |  |  ├─ register
           |  |  |  ├─ register.css
           |  |  |  └─ register.js
           │  |  └─ sidebar
           |  |     ├─ SideBar.css
           |  |     └─ SideBar.js
           │  ├─ main
           |  |  ├─ aboutus
           |  |  |  ├─ aboutus.css
           |  |  |  └─ aboutus.js
           |  |  ├─ brandregister
           |  |  |  ├─ brandregister.css
           |  |  |  └─ brandregister.js
           |  |  ├─ home
           |  |  |  ├─ home.css
           |  |  |  └─ home.js
           |  |  ├─ mynft
           |  |  |  ├─ detailnft.css
           |  |  |  ├─ detailnft.js
           |  |  |  ├─ modal.css
           |  |  |  ├─ modal.js
           |  |  |  ├─ modal2.css
           |  |  |  ├─ modal2.js
           |  |  |  ├─ mynft.css
           |  |  |  └─ mynft.js
           |  |  ├─ searchnft
           |  |  |  ├─ searchnft.css
           |  |  |  └─ searchnft.js
           |  |  └─ page.js
           |  ├─ App.test.js
           |  ├─ index.css
           |  ├─ index.js
           |  ├─ logo.svg
           |  ├─ reportWebVitals.js
           |  └─ setupTests.js
           └─ assets /* 프로젝트 이미지 및 영상 */
              └─ img
                 ├─ aboutus
                 |   ├─ BGV1.mp4
                 |   ├─ byeongsoo.jpg
                 |   ├─ captain.jpg
                 |   ├─ daeyeong.jpg
                 |   ├─ gwangseok.jpg
                 |   └─ yuri.jpg
                 ├─ 로고2.png
                 ├─ Brand01.png
                 ├─ Brand02.png
                 ├─ Brand03.png
                 ├─ Customer01.png
                 ├─ Customer02.png
                 ├─ Customer03.png
                 ├─ Cycle01.png
                 ├─ Cycle02.png
                 ├─ Cycle03.png
                 ├─ Cycle04.png
                 ├─ footCycle01.png
                 ├─ footCycle02.png
                 ├─ footCycle03.png
                 ├─ footCycle04.png
                 ├─ home1.jpg
                 ├─ logo2.jpg
                 ├─ NG로고.jpg
                 ├─ NGService.png
                 ├─ sample.png
                 └─ ssafy.png
        ```

    * 블록체인
        ```
        ├─ package.json
        ├─ package-lock.json
        ├─ migrations
        |   ├─ 1_initial_migration.js
        |   └─ 2_deploy_contracts.js
        └─ src
            ├─ abis
            |   ├─ Address.json
            |   ├─ Context.json
            |   ├─ ERC20.json
            |   ├─ ERC165.json
            |   ├─ ERC721.json
            |   ├─ ERC721Connector.json
            |   ├─ ERC721Enumerable.json
            |   ├─ ERC721Metadata.json
            |   ├─ IERC20.json
            |   ├─ IERC20Metadata.json
            |   ├─ IERC165.json
            |   ├─ IERC721.json
            |   ├─ IERC721Enumerable.json
            |   ├─ IERC721Metadata.json
            |   ├─ IERC721Receiver.json
            |   ├─ Migrations.json
            |   ├─ NG.json
            |   ├─ Ownable.json
            |   ├─ SsafyToken.json
            |   └─ Strings.json
            └─ contracts
                ├─ access
                |   └─ Ownable.sol
                ├─ tokens
                |   ├─ ERC20
                |   |   ├─ extensions
                |   |   |   └─ IERC20Metadata.sol
                |   |   ├─ ERC20.sol
                |   |   └─ IERC20.sol
                |   └─ ERC721
                |       ├─ extensions
                |       |   ├─ ERC721Enumerable.sol
                |       |   ├─ ERC721Metadata.sol
                |       |   ├─ IERC721Enumerable.sol
                |       |   └─ IERC721Metadata.sol
                |       ├─ ERC721.sol
                |       ├─ ERC721Connector.sol
                |       ├─ IERC721.sol
                |       └─ IERC721Receiver.sol
                ├─ utils
                |   ├─ introspection
                |   |   ├─ ERC165.sol
                |   |   └─ IERC165.sol
                |   ├─ Address.sol
                |   ├─ Context.sol
                |   └─ Strings.sol
                ├─ Migration.sol
                ├─ NG.sol
                └─ SsafyToken.sol
        
 