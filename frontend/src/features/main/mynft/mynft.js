
import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import { nftContract, web3 } from "../../../common/web3/web3Config"
import { useState } from "react"

// tokenId 번호 -> tokenId에 따른 블록 정보 불러오기
function MyNft() {

    const [brandNm, setbrandNm] = useState("");
    const [productNo, setproductNo] = useState("");
    const [serialNo, setserialNo] = useState("");
    const [mfd, setmfd] = useState("");
    const [madeIn, setmadeIn] = useState("");

    // nft 토큰 배열 만들어서 데이터 넣음
    const [tokenNum, settokenNum] = useState();
    const [nftToken, setnftToken] = useState([]);

    
    // 지갑 주소 받기
    const [tokenlength, settokenlength] = useState("");

    // 현재 지갑 주소 
    const currnet_wallet = window.localStorage.getItem('wallet');
    console.log(currnet_wallet);

    // 지갑 주소에 존재하는 tokenId 받기 및 배열 길이 받기
    const tokenId_array1 = nftContract.methods.getOwnedTokens(currnet_wallet).call()
    const tokenId_array = nftContract.methods.getOwnedTokens(currnet_wallet).call()
        // .then((res) => settokenlength(res.length));
        .then((res) => settokenlength(res.length));
    console.log(tokenId_array1);
    console.log(tokenlength);

    console.log()

    // for(let i=0; i < tokenlength; i++){
    //     const ArrTokenId = nftContract.methods.getOwnedTokens(currnet_wallet).call()
    //         .then((res) => settokenNum(res.result[0]))
    //     console.log(tokenNum);
    // }


    

    return(
        <div>
            <NavBar/>
            <div style={{height:500}}>

            </div>
            <Footer/>
        </div>
    )
}

export default MyNft;