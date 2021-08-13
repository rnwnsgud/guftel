import React from "react";

import "../App.css";
// function importAll(r) {
//   let images = {};
//   r.keys().forEach((item, index) => {
//     //map함수 경고떠서 forEach씀
//     images[item.replace("../", "")] = r(item); // ../를 없애는거니깐 0.JPG이런식이어야 img[0]=item 배열에 담김
//   });
//   return images;
// }

// const images = importAll(require.context("../img", false, /.JPG/)); //img 디렉토리에서 요청이 .JPG로 끝나는 파일이 있는 컨텍스트

//이미지 불러올 때, 액박으로 나와서 require쓰고 .default붙임(require만 쓰면 객체가 return되어서)
function Ani() {
  return (
    <div className="container" style={{ position: "relative", padding: "" }}>
      <div className="item">
        <img
          src={require("../img/DemonSlayer.JPG").default}
          alt="귀멸의 칼날"
          className="img"
          align="bottom"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/SakuraJang.JPG").default}
          alt="사쿠라장의 애완그녀"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/CheongChun.JPG").default}
          alt="청춘 돼지는 바니걸 선배의 꿈을 꾸지 않는다"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Sakamoto.JPG").default}
          alt="사카모토입니다만?"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Saiki.JPG").default}
          alt="사이키 쿠스오의 재난"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/DeathNote.JPG").default}
          alt="데스노트"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Kakegurui.JPG").default}
          alt="카케구루이"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Anohana.JPG").default}
          alt="그날 본 꽃의 이름은 우리는 아직 모른다"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/SwordArtOnline.JPG").default}
          alt="소드 아트 온라인"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Saekano.JPG").default}
          alt="시원찮은 그녀를 위한 육성방법"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/VioletEvergarden.JPG").default}
          alt="바이올렛 에버가든"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/RedoOfHealer.jpg").default}
          alt="회복술사의 재시작"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/JujutsuKaisen.jpg").default}
          alt="주술회전"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/AttackOnTitan.jpg").default}
          alt="진격의 거인"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Moojick.jpg").default}
          alt="무직전생"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Toradora.JPG").default}
          alt="토라도라"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/ThePromisedNeverland.jpg").default}
          alt="약속의 네버랜드"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Sagura.jpg").default}
          alt="4월은 너의 거짓말"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Takagi.jpg").default}
          alt="장난을 잘 치는 타카기양"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/JeonSaengSl.jpg").default}
          alt="전생했더니 슬라임이었던 건에 대하여"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Konosba.JPG").default}
          alt="이 멋진 세계에 축복을"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/GoblinSlayer.jpg").default}
          alt="고블린 슬레이어"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/TheHiddenDungeonOnlyIcanEnter.jpg").default}
          alt="나만 들어가는 숨겨진 던전"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Hyouka.jpg").default}
          alt="빙과"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/SevenSin.jpg").default}
          alt="일곱 개의 대죄"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/AngelsOfDeath.jpg").default}
          alt="살육의 천사"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Budokan.jpg").default}
          alt="최애가 부도칸에 가 준다면 난 죽어도 좋아"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/GurrenLagann.jpg").default}
          alt="천원돌파 그렌라간"
          className="img"
        />
      </div>
      <div className="item">
        <img
          src={require("../img/Nojaki.jpg").default}
          alt="월간순정 노자키군"
          className="img"
        />
      </div>
    </div>
  );
}

export default Ani;
