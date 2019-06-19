import React from "react";

import VBox from "../component/VBox";
import HBox from "../component/HBox";
import LCRBox from "../component/LCRBox";
import UICard from "../component/UICard";
import RecordItem from "../component/RecordItem";

export default function Main() {
  return (
    <div>
      <VBox gap={20}>
        <UICard title="สรุปบัญชีรายรับรายจ่าย">
          <VBox>
            <HBox>
              <div>รายรับ</div>
              <div style={{ textAlign: "right" }}>1000 บาท</div>
            </HBox>
            <HBox>
              <div>รายจ่าย</div>
              <div style={{ textAlign: "right" }}>800 บาท</div>
            </HBox>
            <HBox>
              <div>คงเหลือ</div>
              <div style={{ textAlign: "right" }}>200 บาท</div>
            </HBox>
          </VBox>
        </UICard>

        <UICard
          title={
            <>
              วันนี้&nbsp;
              <span style={{ fontSize: "12pt" }}>18 มิถุนายน 2562</span>
            </>
          }
        >
          <RecordItem category="dsadassa" note="dsaasdasd" />

          <hr />
        </UICard>
      </VBox>
    </div>
  );
}
