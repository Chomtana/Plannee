const dataCatagoryName = ["อาหาร และ เครื่องดื่ม", "การเดินทาง", "เครื่องแต่งกาย และ เครื่องประดับ", "ข้าวของเครื่องใช้ในชีวิตประจำวัน", "ความบันเทิง", "อื่นๆ"];
const dataCatagory = [
    ["ข้าว", "ก๋วยเตี๋ยว", "หมู", "ไก่", "กุ้ง", "หมึก", "ปลา", "กั้ง", "ลูกชิ้น", "ไส้กรอก", "ผัก", "ผลไม้", "แตงโม", "ส้ม", "กล้วย", "สปาเกตตี้", "พิซซ่า", "น้ำ", "อาหาร", "ตำ", "แซ่บ", "ส้มตำ", "มะพร้าว", "ชา", "นม", "กิน", "กะเพรา", "ขนม", "ไข่", "กระเพรา", "เบียร์", "เหล้า"],
    ["แท็กซี่", "รถเมล์", "bts", "mrt", "เรือด่วน", "รถไฟ", "เครื่องบิน", "รถตุ๊กๆ", "รถตู้", "รถ", "บีทีเอส", "จักรยาน", "สกู๊ตเตอร์", "มอไซ", "พี่วิน", "ปากซอย", "เดินทาง", "ไป", "ถนน"],
    ["เสื้อ", "กางเกง", "ถุงเท้า", "รองเท้า", "หมวก", "ถุงมือ", "กำไล", "สร้อย", "แหวน", "ตุ้มหู", "ต่างหู", "เชิ้ต", "สูท", "ยีนส์", "แว่นตา", "แว่นตากันแดด"],
    ["ทิชชู่", "ผงซักฟอก", "น้ำยาปรับผ้านุ่ม", "น้ำยาล้างจาน", "บุหรี่", "ครีมกันแดด", "แปรงสีฟัน", "ยาสีฟัน", "ยาสระผม", "ครีมนวดผม", "ยา", "กล่อง", "หม้อ", "ตะกร้า", "ล้อ", "ถุง", "เสื่อ", "หมอน", "มุ้ง", "เตียง", "เครื่อง", "กระทะ", "ตะหลิว", "ตู้", "ผ้า", "ยา"],
    ["ภาพยนตร์", "เพลง", "ซีรีย์", "คอนเสิร์ต", "เกม", "คาราโอเกะ", "ไพ่", "หมากรุก", "มายากล", "นิยาย", "หนังสือ", "คอม", "โน๊ตบุ๊ค", "โทรทัศน์", "ทีวี", "อนิเม", "การ์ตูน", "ไอซ์สเกต", "พูล", "ผับ", "บาร์", "เที่ยวผู้ชาย", "หนัง", "เธอ"]
];
const numberName = { 'ศูนย์': 0, 'เอ็ด': 1, 'หนึ่ง': 1, 'ยี่': 2, 'สอง': 2, 'สาม': 3, 'สี่': 4, 'ห้า': 5, 'หก': 6, 'เจ็ด': 7, 'แปด': 8, 'เก้า': 9 };
const texPlus = { 'สิบ': 1, 'ร้อย': 2, 'พัน': 3, 'หมื่น': 4, 'แสน': 5, 'ล้าน': 6 };
const recive = { 'ได้': -1, 'รับ': -1, 'ขาย': -1 };
const num = /[0-9]/;

function datas(text) {
    var wordcut = require("wordcut");
    wordcut.init();
    var newText = wordcut.cut(text).split("|");
    var dataOut = [];
    var today = new Date();
    var data = {
        typeOfText: '',
        text: '',
        price: 0,
        getOrPay: 1,
        date: today
    }
    newText = newText.filter((value, index, arr) => {
        return value != " "
    })

    function setNewData() {
        data = {
            typeOfText: '',
            text: '',
            price: 0,
            getOrPay: 1,
            date: today
        }
        return data;
    }
    // console.log(newText);
    var i = 0;
    var t = 0;
    while (newText[i] != null) {
        newText[i] = newText[i].trim();
        if (t++ > 100) { break }
        if (num.test(newText[i]) || newText[i] in numberName) {
            var priceThis = 0;
            var inits = i;
            // get price;
            while (num.test(newText[i]) || newText[i] in numberName || newText[i] in texPlus) {
                // console.log(newText[i])
                if (num.test(newText[i])) {
                    var p = parseInt(newText[i].split(',').join(""))
                    if (p > 10) {
                        data.price += p;
                    }
                    else {
                        priceThis = p;
                    }
                }
                else if (newText[i] in numberName) {
                    data.price += priceThis;
                    priceThis = numberName[newText[i]];
                }
                else {
                    priceThis *= 10 ** texPlus[newText[i]];
                }
                i++;
            }
            data.price += priceThis;
            console.log(data.price)

            //add data and reset data;
            if (data.typeOfText == "") { data.typeOfText = "อื่นๆ" }
            dataOut.push(data);
            data = setNewData();
        }
        else {
            //set pay or get
            if (newText[i] in recive && data.getOrPay == 1) {
                data.getOrPay = -1;
            }
            //set type of text
            if (data.typeOfText == "") {
                // console.log('object')
                for (var j = 0; j < dataCatagory.length; j++) {
                    if (dataCatagory[j].includes(newText[i])) {
                        data.typeOfText = dataCatagoryName[j];
                        console.log(dataCatagoryName[j] + ":")
                        break
                    }
                }
            }
            if (newText[i] != "บาท") {
                data.text += newText[i];
            }
            i++;
        }
    }

    return dataOut;
}